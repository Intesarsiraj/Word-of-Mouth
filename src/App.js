import "./App.css";
import { db } from "./firebaseconfig.js";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import Home from "./components/Home";
import OwnerForm from "./components/OwnerForm";
import CustomerForm from "./components/CustomerForm";
import OwnerLogin from "./components/OwnerLogin";
import CustomerLogin from "./components/CustomerLogin";
import CustomerDashboard2 from "./components/CustomerDashboard2";
import SingleServiceP from "./components/SingleServiceP";
import ProtectedRoute from "./components/ProtectedRoute";
import OwnerCreateAccount from "./components/OwnerCreateAccount";

import HomeMessages from "./components/Messaging/HomeMessages";
import Error from "./components/Error";
import OwnerDash from "./components/OwnerDash";
import EditOwner from "./components/EditOwner";
import { AuthProvider } from "./context/AuthProvider";
import { ChatContextProvider } from "./components/Messaging/ChatContext";

// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   getAuth,
// } from "firebase/auth";

import ServiceProvidersList from "./components/ServiceProvidersList";

import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  onSnapshot,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { auth } from "./firebaseconfig";
import CustomerCreateAccount from "./components/CustomerCreateAccount";
import SharedLoggedOutLayout from "./components/SharedLoggedOutLayout";
import SharedCustLayout from "./components/SharedCustLayout";
import SharedOwnerLayout from "./components/SharedOwnerLayout";
import useAuth from "./hooks/useAuth";
import ChatContext from "./components/Messaging/ChatContext";
import { getAuth } from "firebase/auth";

function App() {
  const { anyUser } = useAuth();

  const [owner, setOwner] = useState({});
  const [customer, setCustomer] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  // const logout = async () => {
  //   await signOut(auth);
  // };

  const [ownersList, setOwnersList] = useState([]);
  const [displayOwners, setDisplayOwners] = useState([]);
  const [favOwners, setFavOwners] = useState([]);

  const [customersList, setCustomersList] = useState([]);

  const ownersCollectionRef = collection(db, "owners");
  const customersCollectionRef = collection(db, "customers");
  //------------------------------------------------------------------------------
  // useEffect(() => {
  //   console.log(anyUser);
  //   let user = ownersList.find((owner) => owner.uid === anyUser.uid);
  //   if (user == null) {
  //     user = customersList.find((customer) => customer.uid === anyUser.uid);
  //   }
  //   console.log(user);
  // }, []);
  // const [anyUser, setAnyUser] = useState();
  //-------------------------------------------------------------------------
  // const [currentUserUID, setCurrentUserUID] = useState();
  // // const [userDBInfo, setUserDBInfo] = useState();
  // // const [ownersList, setOwnersList] = useState([]);
  // // const [customersList, setCustomersList] = useState([]);
  // // const customersCollectionRef = collection(db, "customers");
  // // const ownersCollectionRef = collection(db, "owners");
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       const uid = user.uid;
  //       console.log(user);
  //       console.log(uid);
  //       setCurrentUser(user);
  //       setCurrentUserUID(uid);
  //       // ...
  //     }
  //     // else {
  //     //   // User is signed out
  //     //   // ...
  //     // }
  //   });
  // }, []);
  // console.log("Info", currentUser, currentUserUID);
  //-------------------------------------------------------------------------
  const auth = getAuth();
  const user = auth.currentUser;
  let userId;
  if (user) {
    userId = user.uid;
    console.log("userId: ", userId);
  } else {
    console.warn("User is null or undefined");
  }
  const testCurrentUser = customersList.find(
    (customer) => customer.uid === userId
  );
  console.log("test current usre: ", testCurrentUser);
  console.log("USERID", userId);
  // // useEffect(()=> {
  // //   if
  // // })

  //--------------------CREATING USERS------------------------------------------
  const createCustomer = async (
    newName,
    newPhone,
    newEmail,
    newHeardFrom,
    newCity,
    uid
  ) => {
    await addDoc(customersCollectionRef, {
      name: newName,
      email: newEmail,
      phone: parseInt(newPhone),
      HeardFrom: newHeardFrom,
      city: newCity,
      uid: uid,
      favOwners: [],
      role: "customer",
    });
  };
  const createOwner = async (
    newCompany,
    newOwner,
    newPhone,
    newIndustry,
    newSpecialty,
    newHours,
    newTag,
    mobile,
    newBio,
    uid,
    imageList,
    imageUpload,
    navigate
    // isFavorite
  ) => {
    await addDoc(ownersCollectionRef, {
      name: newCompany,
      owner: newOwner,
      phone: parseInt(newPhone),
      // email: newEmail,
      industry: newIndustry,
      specialty: newSpecialty,
      hours: newHours,
      tag: newTag,
      mobile: mobile,
      bio: newBio,
      // isFavorite: false,
      uid: uid,
      role: "owner",
    });

    navigate("/owner/dash");
  };
  //------------------------------------------------------------------------
  //--------------------------------FILTER----------------------------------------
  // console.log("OWNERSLIST, ", ownersList);
  const filterOwners = async (filterType, filterWhere, filter, setState) => {
    // setDisplayOwners(ownersList);
    const filteredOwnersList = [];
    const q = await query(
      ownersCollectionRef,
      where(filterType, filterWhere, filter /*.toLowerCase()*/)
    );

    await onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        filteredOwnersList.push({ ...doc.data(), id: doc.id });
      });
      if (filteredOwnersList.length > 0) {
        setState(filteredOwnersList);
      } else {
        setState(ownersList);
      }
    });
  };
  //-----------------------------EDIT----------------------
  const update = async (
    id,
    updatedCompany,
    updatedOwner,
    updatedPhone,
    updatedIndustry,
    updatedSpecialty,
    updatedHours,
    updatedMobile,
    updateTag,
    updateBio,
    navigate
    // uid
  ) => {
    const ownerDoc = await doc(db, "owners", id);
    console.log(id);
    const updatedData = {
      name: updatedCompany,
      owner: updatedOwner,
      phone: parseInt(updatedPhone),
      industry: updatedIndustry,
      specialty: updatedSpecialty,
      hours: updatedHours,
      mobile: updatedMobile,
      tag: updateTag,
      bio: updateBio,
      // uid: uid,
    };

    await updateDoc(ownerDoc, updatedData);
    navigate("/owner/dash");
  };

  const deleteUser = async (id, navigate) => {
    const userDoc = doc(db, "owners", id);
    await deleteDoc(userDoc);
    navigate("/");
  };
  //-----------------------------------------------------------------------------

  // useEffect is called everytime page renders, don't async useEffect - bad practice
  // useEffect(() => {
  //   //async function (other option: .then, .catch)
  //   const getOwners = async () => {
  //     // console.log("XHELLOOOOO");
  //     const data = await getDocs(ownersCollectionRef);
  //     // const data = await getDocs(customersCollectionRef);

  //     setOwnersList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     setDisplayOwners(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //doc.data access object that contains name and age
  //     // console.log("data HELLOOOOO", data);
  //   };
  //   getOwners();
  //   // setDisplayOwners(ownersList);
  //   console.log("Owners: ", ownersList);
  //   console.log("ALSO, ", displayOwners);
  // }, []);
  useEffect(() => {
    const getOwners = async () => {
      const data = query(ownersCollectionRef);
      onSnapshot(data, (snapshot) => {
        setOwnersList(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setDisplayOwners(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        console.log("I like really dont get it");
      });
    };
    getOwners();
  }, []);

  useEffect(() => {
    const getCustomers = async () => {
      console.log("possibly First");
      const data = await query(customersCollectionRef);
      onSnapshot(data, (snapshot) => {
        setCustomersList(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };
    getCustomers();
  }, []);
  console.log("IN APPPPP: CUSTOMERSLIST: ", customersList, ownersList);

  //--------------------------------FAVORITED--------------------------------
  const updateFav = async (customerId, ownerId, favOwners) => {
    // console.log("In update Fav. Fav Before: ", isFavorite);
    // const userDoc = doc(db, "owners", ownerId);
    // const newFields = { isFavorite: !isFavorite };
    // console.log("isFav", isFavorite);
    // await updateDoc(userDoc, newFields);
    // console.log("finished update", isFavorite);
    //Click favorite button
    //OwnerId is added to a favOwners list in customer's info
    //Button is changed to a heart
    // let newFields = ""
    const userDoc = doc(db, "customers", customerId);
    if (favOwners.includes(ownerId)) {
      await updateDoc(userDoc, {
        favOwners: arrayRemove(ownerId),
      });
      // newFields = {favOwners: favOwners.push(ownerId)}
    } else {
      await updateDoc(userDoc, { favOwners: arrayUnion(ownerId) });

      // const index = favOwners.indexOf(ownerId)
      // const removedOwner = favOwners.splice(index, 1)
      // newFields = {favOwners: favOwners}
    }

    // await updateDoc(userDoc, newFields);
  };

  //-----------------------------------------------------------------------------

  // console.log("SERVICE PROVIDERS", serviceProviderList);
  // const toggleDisplay = async (id, displayStatus) => {
  //   const ownerDoc = doc(db, "owners", id);
  //   await updateDoc(ownerDoc, { display: !displayStatus });
  //   const data = await getDocs(usersCollectionRef);
  //   setServiceProviderList(
  //     data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //   );
  // };
  // console.log(user);

  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ChatContextProvider>
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<SharedLoggedOutLayout />}>
                <Route index element={<Home />} />
                <Route
                  path="OwnerForm"
                  element={<OwnerForm createOwner={createOwner} />}
                />
                <Route
                  path="CustomerForm"
                  element={<CustomerForm createCustomer={createCustomer} />}
                />
                <Route path="CustomerForm" element={<CustomerForm />} />
                <Route
                  path="OwnerCreateAccount"
                  element={<OwnerCreateAccount />}
                />
                <Route
                  path="CustomerCreateAccount"
                  element={<CustomerCreateAccount />}
                />
                <Route
                  path="OwnerLogin"
                  element={
                    <OwnerLogin ownersList={ownersList} setOwner={setOwner} />
                  }
                />
                <Route
                  path="CustomerLogin"
                  element={<CustomerLogin /*setCustomer={setCustomer} */ />}
                />
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    ownersList={ownersList}
                    customersList={customersList}
                    allowedRole="customer"
                    user={customer}
                    // currentUser={currentUser}
                    // currentUserUID={currentUserUID}
                  />
                }
              >
                <Route path="/customer" element={<SharedCustLayout />}>
                  <Route
                    path="dash"
                    element={
                      <CustomerDashboard2
                        // filterOwners={filterOwners}
                        customer={customer}
                        owners={ownersList}
                        // favOwners={favOwners}
                        // setFavOwners={setFavOwners}
                        customers={customersList}
                      />
                    }
                  />

                  <Route
                    path="list"
                    element={
                      <ServiceProvidersList
                        ownersList={{ ownersList }}
                        displayOwners={{ displayOwners }}
                        customer={customer}
                        filterOwners={filterOwners}
                        setDisplayOwners={setDisplayOwners}
                      />
                    }
                  />
                  <Route
                    path="list/:SPId"
                    element={
                      <SingleServiceP
                        customersList={customersList}
                        customer={customer}
                        ownersList={ownersList}
                        updateFav={updateFav}
                      />
                    }
                  />
                  <Route
                    path="messaging"
                    element={
                      <HomeMessages
                        ownersList={ownersList}
                        customersList={customersList}
                      />
                    }
                  />
                </Route>
              </Route>

              <Route
                element={
                  <ProtectedRoute
                    ownersList={ownersList}
                    customersList={customersList}
                    allowedRole="owner"
                    user={owner}
                    // currentUser={currentUser}
                    // currentUserUID={currentUserUID}
                  />
                }
              >
                <Route path="/owner" element={<SharedOwnerLayout />}>
                  <Route
                    path="dash"
                    element={
                      // <ProtectedRoute ownersList={ownersList}
                      // customersList={customersList}
                      // allowedRole="owner" user={owner}>
                      <OwnerDash
                        owner={owner}
                        owners={ownersList}
                        deleteUser={deleteUser}
                      />
                      // </ProtectedRoute>
                    }
                  />
                  <Route
                    path="edit"
                    element={
                      // <ProtectedRoute ownersList={ownersList}
                      // customersList={customersList}
                      // allowedRole="owner" user={owner}>
                      <EditOwner
                        ownersList={ownersList}
                        update={update}
                        user={owner}
                      />
                      // </ProtectedRoute>
                    }
                  />
                  <Route
                    path="messaging"
                    element={
                      <HomeMessages
                        ownersList={ownersList}
                        customersList={customersList}
                      />
                    }
                  />
                  {/* </Route>  */}
                </Route>
              </Route>

              <Route path="*" element={<Error />} />
            </Routes>
          </ChatContextProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}
export default App;
