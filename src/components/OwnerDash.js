import { Link, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import EditOwner from "./EditOwner";
import useAuth from "../hooks/useAuth";
import { getAuth } from "firebase/auth";
import { storage } from "../firebaseconfig";
import { ref, getDownloadURL, listAll } from "firebase/storage";

function OwnerDash(props) {
  const navigate = useNavigate();
  // const { anyUser } = useAuth();
  // const { OId } = useParams();
  const auth = getAuth();
  const user = auth.currentUser;
  let userId;
  if (user) {
    userId = user.uid;
    console.log("userId: ", userId);
  } else {
    console.warn("User is null or undefined");
  }
  // const OId = o.uid;
  const deleteUser = props.deleteUser;

  console.log("OID", userId);
  const owners = props.owners;
  console.log("owners", owners);
  // const { SPId } = useParams();

  // console.log("SPL", serviceProviders);
  console.log("this is a", userId);
  // console.log("this is a", owner)

  const singleOwner = owners.find((owner) => owner.uid === userId);
  console.log("singleOwner", singleOwner);
  const {
    name,
    email,
    hours,
    industry,
    specialty,
    owner,
    phone /*profileImage*/,
    uid,
  } = singleOwner;
  console.log("actual id", singleOwner.id);

  const imagesListRef = ref(storage, `${uid}/`);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          if (imageUrls.includes(url) === false) {
            setImageUrls((prev) => [...prev, url]);
            console.log("URLS", imageUrls);
          }
        });
      });
    });
  }, []);

  const uniqueImageList = [...new Set(imageUrls)];

  return (
    <div>
      <div>
        <section className="section owner">
          {/* <img src={image} alt={name} /> */}
          <h5>
            {name} - {industry}
          </h5>
          <div>
            <p>Owner Name: {owner}</p>
            <p>{specialty}</p>
            <p>Hours: {hours}</p>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            <div>
              {uniqueImageList.map((url) => {
                return <img alt="userImage" src={url} />;
              })}
            </div>
          </div>
        </section>

        <button
          onClick={() => {
            navigate("/owner/edit");
          }}
        >
          {" "}
          Edit info
        </button>

        <button onClick={() => deleteUser(singleOwner.id, navigate)}>
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default OwnerDash;
