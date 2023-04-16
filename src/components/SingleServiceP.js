import { Link, useParams } from "react-router-dom";
// import ServiceProvider from './ServiceProvider';
import ServiceProvidersList from "./ServiceProvidersList";
import useAuth from "../hooks/useAuth";
import { storage } from "../firebaseconfig";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";

const SingleServiceP = (props) => {
  const { anyUser } = useAuth();
  const updateFav = props.updateFav;
  const serviceProviders = props.ownersList;
  const customers = props.customersList;
  const { SPId } = useParams();

  // console.log("SPL", serviceProviders);
  const singleServiceProvider = serviceProviders.find(
    (serviceProvider) => serviceProvider.id === SPId
  );
  console.log("CUSTOMERSSSS", customers);
  const singleCustomer = customers.find(
    (customer) => customer.uid === anyUser.uid
  );
  // console.log("SEE", singleServiceProvider.favOwners);
  // const isFavorite = singleServiceProvider.isFavorite;
  console.log("SINGLE CUST ", singleCustomer);
  const { name, email, hours, industry, owner, phone, specialty, uid } =
    singleServiceProvider;

  const specialtyDisplay = specialty ? `Specialty: ${specialty}` : "";

  // let buttonContent = isFavorite ? "Favorited 💗" : "Favorite 🤍";
  let buttonContent = singleCustomer.favOwners.includes(
    singleServiceProvider.id
  )
    ? "Favorited 💗"
    : "Favorite 🤍";
  // let buttonContent = "";

  // const toggleFav = async () => {
  //   await updateFav(SPId, isFavorite);
  //   buttonContent = isFavorite ? "Favorited 💗" : "Favorite 🤍";
  // };
  const toggleFav = async () => {
    await updateFav(
      singleCustomer.id,
      singleServiceProvider.id,
      singleCustomer.favOwners
    );
    buttonContent = singleCustomer.favOwners.includes(singleServiceProvider.id)
      ? "Favorited 💗"
      : "Favorite 🤍";
  };

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
    <section className="section owner">
      {/* <img src={image} alt={name} /> */}
      <h5>
        {name} - {industry}
      </h5>
      <div>
        <p>Owner Name: {owner}</p>
        <p>{specialtyDisplay}</p>
        <p>Hours: {hours}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <div>
          {uniqueImageList.map((url) => {
            console.log("UNIQUEimageul", uniqueImageList);
            return <img alt="userImage" src={url} />;
          })}
        </div>
        <button
          onClick={() => {
            toggleFav();
          }}
        >
          {buttonContent}
        </button>
      </div>
      <Link to="/customer/list">back to all Service Providers</Link>
    </section>
  );
};

export default SingleServiceP;
