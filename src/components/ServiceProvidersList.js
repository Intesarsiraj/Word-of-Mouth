//PERHAPS THINK ABOUT COMBINING SERVICE PROVIDER INTO THIS ONE?
//If I go straight to this page and not mainpage->here, then the SPs don't load/will be null
//Remove underline from links
import React, { useEffect, useState } from "react";
import ServiceProvider from "./ServiceProvider";
import { useLocation, Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import "./ServiceProvidersList.css"

function ServiceProvidersList(props) {
  const setDisplayOwners = props.setDisplayOwners;
  let { ownersList } = props.ownersList;
  let { displayOwners } = props.displayOwners;
  const [filter, setFilter] = useState("");
  const filterOwners = props.filterOwners;
  console.log("display: ", displayOwners);
  const listElements = displayOwners.map((ind) => (
    <article key={ind.id}>
      <Link to={`/customer/list/${ind.id}`}>
        <ServiceProvider
          serviceProviderList={props.industriesList}
          data={ind}
          toggleDisplay={props.toggleDisplay}
        ></ServiceProvider>
      </Link>
    </article>
  ));
  return (
    <div id="ownersListDisplay">
      <Dropdown
        placeHolder="Filter Industry..."
        options={Dropdown.options}
        onChange={(event) => {
          setFilter(event);
        }}
      />
      <button id="filterButton"
        onClick={() => {
          filterOwners("industry", "array-contains", filter, setDisplayOwners);
        }}
      >
        Filter
      </button>
      <div id="listedOwners">{listElements}</div>
    </div>
  );
}
export default ServiceProvidersList;
