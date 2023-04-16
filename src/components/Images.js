// import "./OwnerForm";
// import { useState } from "react";
// import { useEffect } from "react";
// import { storage } from "../firebaseconfig.js";
// import { getAuth } from "firebase/auth";
// import {
//   ref,
//   uploadBytes,
//   listAll,
//   getDownloadURL,
//   // uploadBytesResumable,
// } from "firebase/storage";
// import { v4 } from "uuid";

// function Images(props) {
//   const auth = getAuth();
//   const user = auth.currentUser;
//   const ownerId = user.uid;

//   const [imageUpload, setImageUpload] = useState("");
//   const [imageList, setImageList] = useState([]);

//   const uniqueKey = v4();
//   const imageListRef = ref(storage, `${ownerId}`);
//   const uploadImage = () => {
//     if (imageUpload == null) return;
//     // const imageRef = ref(storage, `images/${imageUpload.name + uniqueKey}`);
//     const imageRef = ref(storage, `${ownerId}/${imageUpload.name + v4()}`);
//     uploadBytes(imageRef, imageUpload).then((snapshot) => {
//       getDownloadURL(snapshot.ref).then((url) => {
//         setImageList((prev) => [...prev, url]);
//         alert("Image Uploaded");
//       });
//     });
//     // console.log("image: ", imageUpload)
//   };

//   useEffect(() => {
//     listAll(imageListRef).then((response) => {
//       response.items.forEach(() => {
//         getDownloadURL().then((url) => {
//           setImageList((prev) => [...prev, url]);
//         });
//       });
//     });
//   }, []);

//   return (
//     <div>
//       <br />
//       <input
//         type="file"
//         onChange={(event) => {
//           setImageUpload(event.target.files[0]);
//         }}
//       />
//       <button onClick={uploadImage}>Upload image</button>
//       {imageList.map((url) => {
//         return <img key={uniqueKey} alt="userImage" src={url} />;
//       })}
//     </div>
//   );
// }

// export default Images;
