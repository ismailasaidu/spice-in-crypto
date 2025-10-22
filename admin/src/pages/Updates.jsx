import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../lib/init-firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ArrowLeft, Trash2 } from "lucide-react";
import ClipLoader from "react-spinners/ClipLoader";
import Logo from "../Assets/logo.png";

const Updates = () => {
  const navigate = useNavigate();

  const [signals, setSignals] = useState([]);
  const [mentorships, setMentorships] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  const fetchData = async () => {
    setLoading(true);
    try {
      const signalsSnap = await getDocs(collection(db, "Signals"));
      const mentorshipSnap = await getDocs(collection(db, "Mentorship"));

      setSignals(
        signalsSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => a.Order - b.Order)
      );
      setMentorships(
        mentorshipSnap.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .sort((a, b) => a.Order - b.Order)
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update card with order swap logic
  const handleCardUpdate = async (type, updatedItem) => {
    try {
      const collectionRef = collection(db, type);
      const snapshot = await getDocs(collectionRef);
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));

      const updatedOrder = parseInt(updatedItem.Order);

      // Find conflicting item
      const conflict = items.find(
        (i) => i.id !== updatedItem.id && i.Order === updatedOrder
      );

      if (conflict) {
        // Swap orders
        await updateDoc(doc(db, type, conflict.id), {
          Order: updatedItem.originalOrder,
        });
      }

      await updateDoc(doc(db, type, updatedItem.id), {
        Description: updatedItem.Description,
        Price: parseFloat(updatedItem.Price),
        Order: updatedOrder,
        link: updatedItem.link,
      });

      // Update local state immediately
      if (type === "Signals") {
        setSignals((prev) =>
          prev.map((i) =>
            i.id === updatedItem.id
              ? { ...i, ...updatedItem, Order: updatedOrder }
              : i
          )
        );
      } else {
        setMentorships((prev) =>
          prev.map((i) =>
            i.id === updatedItem.id
              ? { ...i, ...updatedItem, Order: updatedOrder }
              : i
          )
        );
      }

      toast.success(`${type} updated successfully`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to update ${type}`);
    }
  };

  // Delete card
  const handleCardDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, type, id));
      if (type === "Signals")
        setSignals((prev) => prev.filter((i) => i.id !== id));
      else setMentorships((prev) => prev.filter((i) => i.id !== id));
      toast.success(`${type} deleted`);
    } catch (err) {
      console.error(err);
      toast.error(`Failed to delete ${type}`);
    }
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "#050C1F" }}
      >
        <ClipLoader size={50} color="#3B82F6" />
      </div>
    );
  }

  // Editable card component
  const EditableCard = ({ item, type, onUpdate, onDelete }) => {
    const [form, setForm] = useState({
      Description: item.Description,
      Price: item.Price,
      Order: item.Order,
      link: item.link || "",
      originalOrder: item.Order,
    });

    return (
      <div className="bg-[#0A1533] p-4 rounded-lg mb-4 shadow hover:shadow-lg transition flex flex-col space-y-2">
        <div className="flex justify-end">
          <button
            onClick={() => onDelete(type, item.id)}
            className="text-red-500 hover:text-red-600"
            title="Delete"
          >
            <Trash2 size={18} />
          </button>
        </div>
        <input
          type="text"
          value={form.Description}
          onChange={(e) => setForm({ ...form, Description: e.target.value })}
          className="w-full p-2 rounded bg-[#050C1F] border border-gray-700 text-gray-200"
          placeholder="Description"
        />
        <input
          type="number"
          value={form.Price}
          onChange={(e) => setForm({ ...form, Price: e.target.value })}
          className="w-full p-2 rounded bg-[#050C1F] border border-gray-700 text-gray-200"
          placeholder="Price"
        />
        <input
          type="number"
          value={form.Order}
          onChange={(e) => setForm({ ...form, Order: e.target.value })}
          className="w-full p-2 rounded bg-[#050C1F] border border-gray-700 text-gray-200"
          placeholder="Order"
        />
        <input
          type="text"
          value={form.link}
          onChange={(e) => setForm({ ...form, link: e.target.value })}
          className="w-full p-2 rounded bg-[#050C1F] border border-gray-700 text-gray-200"
          placeholder="Link (optional)"
        />
        <button
          onClick={() =>
            onUpdate(type, {
              ...form,
              id: item.id,
              originalOrder: item.Order,
            })
          }
          className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
        >
          Update
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#050C1F] text-white px-8 py-10">
      {/* Logo + Dashboard */}
      <div className="flex items-center justify-between mb-12">
        <img
          src={Logo}
          alt="Logo"
          className="w-24 h-24 object-contain animate-pulse"
          style={{ filter: "drop-shadow(0 0 15px #60A5FA)" }}
        />
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-6 py-3 bg-blue-900 rounded-lg hover:bg-blue-800 transition text-lg"
        >
          <ArrowLeft size={20} /> Dashboard
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Signals */}
        <div>
          <h2 className="text-2xl font-bold text-[#60A5FA] flex items-center gap-2 mb-4 justify-start">
            📈 Signals
          </h2>
          {signals.map((s) => (
            <EditableCard
              key={s.id}
              item={s}
              type="Signals"
              onUpdate={handleCardUpdate}
              onDelete={handleCardDelete}
            />
          ))}
        </div>

        {/* Mentorships */}
        <div>
          <h2 className="text-2xl font-bold text-[#34D399] flex items-center gap-2 mb-4 justify-start">
            🎓 Mentorships
          </h2>
          {mentorships.map((m) => (
            <EditableCard
              key={m.id}
              item={m}
              type="Mentorship"
              onUpdate={handleCardUpdate}
              onDelete={handleCardDelete}
            />
          ))}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Updates;
