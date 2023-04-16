//need to make sure all companies (including new ones) have same keys that can be accessed through props
//should start off undisplayed each time computer is reloaded?

import PropTypes from "prop-types";
import "./ServiceProvider.css";
// import {
//   collection,
//   getDocs,
//   addDoc,
//   updateDoc,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import { db } from "../firebaseconfig.js";

function ServiceProvider(props) {
  const companyName = props.data.name;
  const contactEmail = props.data.email;
  const contactNumber = props.data.phone;
  const display = props.data.display;
  const hours = props.data.hours;
  const industry = props.data.industry;
  const ownerName = props.data.owner;
  const specialty = props.data.specialty;
  const id = props.data.id;
  const toggleDisplay = props.toggleDisplay;

  const specialtyDisplay = specialty ? `Specialty: ${specialty}` : "";

  let industryDisplay = ""; //.concat(..d.industry);
  // console.log(industryDisplay.length);
  // console.log("ind", industry);
  if (industry && typeof industry === "object") {
    for (const ind in industry) {
      if (ind == 0) {
        industryDisplay += industry[ind];
      } else {
        industryDisplay += `,  ${industry[ind]}`;
      }
    }
  } else {
    industryDisplay = industry;
  }
  // const ownerInfo = display ? (
  //   <div>
  //     <p>Owner Name: {ownerName}</p>
  //     <p>{specialtyDisplay}</p>
  //     <p>Hours: {hours}</p>
  //     <p>Email: {contactEmail}</p>
  //     <p>Phone: {contactNumber}</p>
  //   </div>
  // ) : (
  //   ""
  // );

  return (
    <div className="ownersNameAndDisplay">
      <p /*onClick={() => toggleDisplay(id, display)}*/>
        {companyName} - {industryDisplay}
      </p>
      {/* <div>{ownerInfo}</div> */}
    </div>
  );
}
ServiceProvider.propTypes = {
  serviceProviderList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      contactEmail: PropTypes.string.isRequired,
      contactNumber: PropTypes.number.isRequired,
      display: PropTypes.bool.isRequired,
      hours: PropTypes.string.isRequired,
      industry: PropTypes.string.isRequired,
      ownerName: PropTypes.string.isRequired,
      specialty: PropTypes.string.isRequired,
    })
  ),
  // toggleDisplay: PropTypes.func.isRequired,
};

export default ServiceProvider;
