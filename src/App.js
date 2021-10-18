import "./App.css";
import Room from "./components/ChatRoom/Room/Room.js";
import SignIn from "./components/SignIn/SignIn";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React from "react";
import "firebase/compat/firestore";
import { useState, useEffect } from "react";

// require("dotenv").config();
firebase.initializeApp({
  apiKey: "AIzaSyDpB2qE2d38eNdThwya3VO0enTOQx-X-Po",
  authDomain: "lemon-1c4c5.firebaseapp.com",
  projectId: "lemon-1c4c5",
  storageBucket: "lemon-1c4c5.appspot.com",
  messagingSenderId: "155068374743",
  appId: "1:155068374743:web:e2c3782564b261377f5a92",
  measurementId: "G-3PPWXCGB7K",
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const db = firestore.collection("users");
// localStorage.removeItem("id");

function App() {
  var docId = localStorage.getItem("id");
  const [isSigned, setSigned] = useState(docId !== null);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    if (localStorage.getItem("id") !== null) {
      db.doc(localStorage.getItem("id"))
        .get()
        .then((e) => {
          setUserDetails(e.data());
        });
    }
  }, []);

  const createUser = async (details) => {
    await db
      .add(details)
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
        localStorage.setItem("id", docRef.id);
        setUserDetails(details);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    setSigned(true);
  };
  const LogInUser = (id) => {
    localStorage.setItem("id", id);
    db.doc(id)
      .get()
      .then((snapshot) => {
        setUserDetails(snapshot.data());
      });
    setSigned(true);
  };

  function getClass(cls) {
    if (cls === "Always Right") {
      return "right";
    } else if (cls === "Always Left") {
      return "left";
    } else {
      return cls;
    }
  }

  return (
    <div className="App flex center">
      {isSigned ? (
        <Room
          firestore={firestore}
          firebase={firebase}
          userDetails={{
            Username: userDetails.Username,
            orient: getClass(userDetails.orient),
            photo: userDetails.photo,
            setDpChat: userDetails.setDpChat,
          }}
          logOut={() => {
            console.log("I AM HERE");
            localStorage.removeItem("id");
            setSigned(false);
          }}
          setSigned={setSigned}
        />
      ) : (
        <SignIn
          createUser={createUser}
          db={db}
          firebase={firebase}
          LogInUser={LogInUser}
        />
      )}
      {/* <FieldUpdate /> */}
    </div>
  );
}

export default App;
