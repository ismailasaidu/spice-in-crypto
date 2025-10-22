import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  updateDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { signOut } from "firebase/auth"; // <-- import signOut
import { db, auth } from "../lib/init-firebase"; // <-- import auth
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClipLoader from "react-spinners/ClipLoader";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  GraduationCap,
  TrendingUp,
  Wallet,
  Send,
  LogOut,
  ArrowRight,
} from "lucide-react";
import Logo from "../Assets/logo.png";
import emailjs from "@emailjs/browser";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({
    totalUsers: 0,
    totalMentorship: 0,
    totalSignals: 0,
    totalRevenue: 0,
  });
  const [chartData, setChartData] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [purchaseDocs, setPurchaseDocs] = useState([]);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailOption, setEmailOption] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [sending, setSending] = useState(false);
  const [rateDocId, setRateDocId] = useState(null);
  const [rateValue, setRateValue] = useState("");
  const [updatingRate, setUpdatingRate] = useState(false);

  const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      try {
        const accountsSnap = await getDocs(collection(db, "Accounts"));
        const accountsArr = accountsSnap.docs.map((d) => ({
          id: d.id,
          ...(d.data() || {}),
        }));
        setAccounts(accountsArr);

        const mentorshipSnap = await getDocs(collection(db, "Mentorship"));
        const signalsSnap = await getDocs(collection(db, "Signals"));
        const purchaseSnap = await getDocs(collection(db, "Purchase"));
        const purchases = purchaseSnap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setPurchaseDocs(purchases);

        const totalRevenueUSD = purchases.reduce((acc, p) => {
          let total = parseFloat(p.totalAmount);
          if (isNaN(total)) total = 0;
          let rate = 1;
          if (p.currency === "NGN") {
            rate = parseFloat(p.exchangeRate);
            if (isNaN(rate) || rate === 0) rate = 1;
          }
          const amtUSD = p.currency === "NGN" ? total / rate : total;
          return acc + amtUSD;
        }, 0);

        const months = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ];
        const chartMap = Array.from({ length: 12 }, (_, i) => ({
          name: months[i],
          revenue: 0,
        }));
        purchases.forEach((p) => {
          let total = parseFloat(p.totalAmount);
          if (isNaN(total)) total = 0;
          let rate = 1;
          if (p.currency === "NGN") {
            rate = parseFloat(p.exchangeRate);
            if (isNaN(rate) || rate === 0) rate = 1;
          }
          const amtUSD = p.currency === "NGN" ? total / rate : total;
          const monthIndex = p.createdAt?.toDate
            ? p.createdAt.toDate().getMonth()
            : new Date().getMonth();
          chartMap[monthIndex].revenue += amtUSD;
        });

        setTotals({
          totalUsers: accountsSnap.size,
          totalMentorship: mentorshipSnap.size,
          totalSignals: signalsSnap.size,
          totalRevenue: totalRevenueUSD,
        });
        setChartData(chartMap);

        const rateSnap = await getDocs(collection(db, "Rate"));
        if (!rateSnap.empty) {
          const rdoc = rateSnap.docs[0];
          setRateDocId(rdoc.id);
          const data = rdoc.data();
          setRateValue(data.value ?? data.rate ?? data.nairaRate ?? "");
        } else {
          setRateDocId(null);
          setRateValue("");
        }
      } catch (err) {
        console.error("fetchAll error", err);
        toast.error("Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const handleUpdateRate = async () => {
    if (!rateValue && rateValue !== 0) {
      toast.error("Enter a valid rate");
      return;
    }
    setUpdatingRate(true);
    try {
      if (rateDocId)
        await updateDoc(doc(db, "Rate", rateDocId), {
          nairaRate: parseFloat(rateValue),
          updatedAt: new Date(),
        });
      else
        await addDoc(collection(db, "Rate"), {
          nairaRate: parseFloat(rateValue),
          updatedAt: new Date(),
        });
      toast.success("Rate updated successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update rate");
    } finally {
      setUpdatingRate(false);
    }
  };

  const handleSendEmail = async () => {
    let recipients = [];
    if (emailOption === "all") recipients = accounts.map((a) => a.email);
    else if (emailOption === "purchased") {
      const purchasedEmails = purchaseDocs.map((p) => p.email);
      recipients = [...new Set(purchasedEmails)];
    } else recipients = selectedUsers;

    if (!emailSubject || !emailBody) {
      toast.warning("Subject and body cannot be empty");
      return;
    }
    if (recipients.length === 0) {
      toast.warning("No recipients selected");
      return;
    }

    setSending(true);
    try {
      for (let email of recipients) {
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          { to_email: email, subject: emailSubject, body: emailBody },
          EMAILJS_PUBLIC_KEY
        );
      }
      toast.success("Emails sent successfully!");
      setEmailSubject("");
      setEmailBody("");
      setShowEmailModal(false);
      setSelectedUsers([]);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send emails");
    } finally {
      setSending(false);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050C1F]">
        <ClipLoader size={50} color="#3B82F6" />
      </div>
    );

  const maxRevenue = Math.max(...chartData.map((d) => d.revenue), 10);
  const yTicks = [];
  for (let i = 0; i <= maxRevenue + 10; i += 10) yTicks.push(i);

  return (
    <div className="min-h-screen bg-[#050C1F] text-white px-8 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <img
            src={Logo}
            alt="Logo"
            className="w-20 h-20 object-contain animate-pulse drop-shadow-[0_0_20px_#3B82F6]"
          />
          <h1 className="text-4xl font-bold text-blue-500">Admin Dashboard</h1>
        </div>
        <div className="flex gap-4">
          {/* Send Email button */}
          <button
            className="bg-[#22C55E] px-5 py-2 rounded-lg flex items-center gap-2"
            onClick={() => setShowEmailModal(true)}
          >
            <Send size={16} /> Send Email
          </button>

          {/* Update Page button */}
          <button
            className="flex items-center gap-2 px-4 py-2 bg-[#0000FF] rounded-lg hover:bg-[#0F1B3A] text-gray-200"
            onClick={() => navigate("/update")} // fixed
          >
            <ArrowRight size={18} /> Update Page
          </button>

          {/* Logout button */}
          <button
            className="bg-[#FF0000] px-5 py-2 rounded-lg flex items-center gap-2"
            onClick={async () => {
              try {
                await signOut(auth); // fixed
                toast.success("Logged out successfully");
                navigate("/login"); // adjust to your login route
              } catch (err) {
                console.error(err);
                toast.error("Logout failed");
              }
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
        <div className="p-6 rounded-xl bg-gradient-to-br from-[#0B1B47] to-[#1E3A8A] shadow-lg">
          <div className="flex justify-between mb-3">
            <h3>Total Users</h3>
            <Users size={32} />
          </div>
          <p className="text-3xl font-bold">{totals.totalUsers}</p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-[#0B2B24] to-[#065F46] shadow-lg">
          <div className="flex justify-between mb-3">
            <h3>Mentorships</h3>
            <GraduationCap size={32} />
          </div>
          <p className="text-3xl font-bold">{totals.totalMentorship}</p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-[#1D1438] to-[#4C1D95] shadow-lg">
          <div className="flex justify-between mb-3">
            <h3>Signals</h3>
            <TrendingUp size={32} />
          </div>
          <p className="text-3xl font-bold">{totals.totalSignals}</p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-[#FFA500] to-[#78350F] shadow-lg">
          <div className="flex justify-between mb-3">
            <h3>Total Revenue</h3>
            <Wallet size={32} />
          </div>
          <p className="text-3xl font-bold">
            ${totals.totalRevenue.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-[#0A1533] p-8 rounded-xl shadow-lg mb-6">
        <h2 className="text-2xl mb-6">Revenue Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1E3A8A" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis
              stroke="#9CA3AF"
              tickFormatter={(val) => `$${val}`}
              ticks={yTicks}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0A1533",
                border: "none",
                color: "#fff",
              }}
              formatter={(val) => `$${val}`}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#34D399"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Update Rate Centered */}
      <div className="flex justify-center mb-6">
        <div className="bg-[#0A1533] p-6 rounded-2xl shadow-xl w-full max-w-sm flex flex-col items-center gap-4">
          <h3 className="text-xl font-semibold text-center text-green-400 mb-2">
            Update Naira Rate
          </h3>
          <div className="flex w-full gap-3">
            <input
              type="number"
              value={rateValue}
              onChange={(e) => setRateValue(e.target.value)}
              placeholder="Enter rate"
              className="flex-1 p-3 rounded-lg bg-[#050C1F] border border-gray-700 focus:outline-none focus:border-green-500 transition"
            />
            <button
              onClick={handleUpdateRate}
              disabled={updatingRate}
              className={`px-5 py-3 rounded-lg font-semibold text-white transition ${
                updatingRate
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {updatingRate ? "Updating..." : "Update"}
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Current Rate: {rateValue || "Not set"}
          </p>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-start pt-20 z-50">
          <div className="bg-[#0A1533] p-6 rounded-xl shadow-lg w-full max-w-2xl">
            <h3 className="mb-4 text-xl font-semibold">Send Email</h3>
            <div className="mb-4">
              <label className="mr-3">Recipients:</label>
              <select
                value={emailOption}
                onChange={(e) => setEmailOption(e.target.value)}
                className="p-2 rounded bg-[#050C1F]"
              >
                <option value="all">All Users</option>
                <option value="purchased">Users Who Purchased</option>
                <option value="selected">Selected Users</option>
              </select>
            </div>

            {emailOption === "selected" && (
              <div className="mb-4 max-h-32 overflow-y-auto border border-gray-600 p-2 rounded">
                {accounts.map((acc) => (
                  <div key={acc.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={acc.email}
                      checked={selectedUsers.includes(acc.email)}
                      onChange={(e) => {
                        const email = e.target.value;
                        setSelectedUsers((prev) =>
                          prev.includes(email)
                            ? prev.filter((x) => x !== email)
                            : [...prev, email]
                        );
                      }}
                    />
                    <span>{acc.email}</span>
                  </div>
                ))}
              </div>
            )}

            <input
              type="text"
              placeholder="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="w-full p-2 mb-3 rounded bg-[#050C1F]"
            />
            <textarea
              placeholder="Body"
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              className="w-full p-2 mb-3 rounded bg-[#050C1F] h-32"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 rounded bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={sending}
                className="px-4 py-2 rounded bg-green-500"
              >
                {sending ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default AdminDashboard;
