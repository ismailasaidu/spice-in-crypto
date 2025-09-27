// import React from "react";
// import { useState, useEffect } from "react";
// import { addDoc, collection } from "firebase/firestore";
// import { db, storage } from "../../lib/init-firebase";
// import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
// import { Navigate, useNavigate } from "react-router-dom";

// const UpdateProducts = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // const database = db.database();
//     const productsRef = collection(db, "Ebooks");

//     productsRef.on("value", (snapshot) => {
//       const productData = snapshot.val();
//       const productList = Object.keys(productData).map((productId) => ({
//         id: productId,
//         ...productData[productId],
//       }));
//       setProducts(productList);
//     });
//   }, []);

//   return (
//     <div>
//       <h2>Product List</h2>
//       <ul>
//         {products.map((product) => (
//           <li key={product.id}>
//             {product.Description} - {product.Price}
//             <button onClick={() => handleEdit(product.id)}>Edit</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
// const handleEdit = (productId) => {
//   // Navigate to the UpdateProduct component and pass the productId
//   // You can use React Router or your preferred routing mechanism
//   // to navigate to the update page and pass the ID as a parameter.
//   // For this example, let's just print the ID to the console.
//   console.log('Edit product with ID:', productId);
// };


// const UpdateProduct = ({ productId }) => {
//   const [Description, setDescription] = useState("");
//   const [Price, setPrice] = useState("");
//   const [Duration, setDuration] = useState("");

//   useEffect(() => {
//     if (productId) {
//       // const database = db.database();
//       const productRef = database.ref(`Ebooks/${productId}`);

//       // Fetch the product data based on the passed ID
//       productRef.on("value", (snapshot) => {
//         const productData = snapshot.val();
//         setDescription(productData.Description);
//         setPrice(productData.Price);
//       });
//     }
//   }, [productId]);

//   const handleUpdate = () => {
//     // const database = db.database();
//     const productRef = database.ref("products/product_id"); // Replace 'product_id' with the actual ID of the product

//     // Update the product data
//     productRef
//       .update({
//         Description: Description,
//         Duration: Duration,
//         Price: parseFloat(Price),
//       })
//       .then(() => {
//         console.log("Product updated successfully");
//       })
//       .catch((error) => {
//         console.error("Error updating product:", error);
//       });
//   };

//   return (
//     <div>
//       <h2>Update Product</h2>
//       <label>
//         Description:
//         <input
//           type="text"
//           value={Description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Price:
//         <input
//           type="number"
//           value={Price}
//           onChange={(e) => setPrice(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Duration:
//         <input
//           type="number"
//           value={Duration}
//           onChange={(e) => setDuration(e.target.value)}
//         />
//       </label>
//       <br />
//       <button onClick={handleUpdate}>Update Product</button>
//     </div>
//   );
// };

// export default UpdateProducts;
