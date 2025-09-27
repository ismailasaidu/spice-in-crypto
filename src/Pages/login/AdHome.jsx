// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NewProduct from "./NewProduct";

// export const AdHome = () => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState("");

//   

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/login");
//   };

  
//   useEffect(() => {
//     setUser(JSON.parse(localStorage.getItem("user")) || null);
//   }, []);

//   return (
//     <div className="flex items-center   justify-center h-screen text bg-blue " >
//       <header  className=" mt-[1000px]" >
//         {user ? (
//           <>
//             {/* <p>{user.firstName}</p> */}
//             <button onClick={logout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <button>Login</button>
//             <button>Register</button>
//           </>
//         )}
//       </header>
//       <h1>Home</h1>
//       <NewProduct />
//     </div>
   
//   );
// };

// export default AdHome;
