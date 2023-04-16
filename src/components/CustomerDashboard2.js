import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ServiceProvider from "./ServiceProvider.js";
import { getAuth } from "firebase/auth";
import "./CustomerDashboard.css";

const CustomerDashboard = (props) => {
  function generateRandomNumber() {
    return Math.floor(Math.random() * 1000000);
  }
  // const auth = getAuth();
  // const user = auth.currentUser;
  // const userId = user.uid;
  console.log("dashboard2");
  const auth = getAuth();
  const user = auth.currentUser;
  let userId;
  if (user) {
    userId = user.uid;
    console.log("userId: ", userId);
  } else {
    console.warn("User is null or undefined");
  }
  //for each id in favOwners
  //  look for id in list of owners
  //  get each owners data and push into a list
  //  use THAT list inside of
  const { setFavOwners, filterOwners, customers, owners } = props;

  const singleCustomer = customers.find((customer) => customer.uid === userId);

  const [displayFavorites, setDisplayFavorites] = useState(null);

  useEffect(() => {
    if (!singleCustomer) return;

    const favoritesInfos = singleCustomer.favOwners.map((singleId) =>
      owners.find((owner) => owner.id === singleId)
    );
    console.log("favinfo", favoritesInfos);

    const displayFavs = favoritesInfos
      ? favoritesInfos.map((ind) => (
          <article key={generateRandomNumber()}>
            <Link to={`/customer/list/${ind.id}`}>
              <ServiceProvider
                serviceProviderList={props.industriesList}
                data={ind}
                toggleDisplay={props.toggleDisplay}
              />
            </Link>
          </article>
        ))
      : "NOTHING FAVORITED YET";

    setDisplayFavorites(displayFavs);
  }, [singleCustomer, props.industriesList, props.toggleDisplay]);

  useEffect(() => {
    const filterFavs = async () => {
      await filterOwners("isFavorite", "==", true, setFavOwners);
    };
    filterFavs();
  }, []);

  return (
    <div className="custDash">
      <h2 id="dashHeading">Your Favorite Services</h2>
      <h3 id="favDisplay">{displayFavorites}</h3>
    </div>
  );
};

// CustomerDashboard.propTypes = {
//   customers: PropTypes.array.isRequired,
//   industriesList: PropTypes.array.isRequired,
//   toggleDisplay: PropTypes.func.isRequired,
// };

export default CustomerDashboard;
