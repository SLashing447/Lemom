import React, { useState, useEffect } from "react";
import "./Settings.css";

function Settings(props) {
  const id = localStorage.getItem("id");
  const db = props.db;
  const [state, setState] = useState("Settings");
  const [orient, setOrient] = useState("");
  const [dpChat, setDpChat] = useState("");
  const [color, setColor] = useState("");
  useEffect(() => {
    db.doc(id)
      .get()
      .then((snapshot) => {
        setOrient(snapshot.data()["orient"]);
        setDpChat(snapshot.data()["setDpChat"] ? "On" : "Off");
      });
  }, []);
  function setting_Orientation(orient) {
    db.doc(id).update({
      orient: orient,
    });
  }
  function setting_DPM(dpChat) {
    db.doc(id).update({
      setDpChat: dpChat === "On" ? true : false,
    });
  }
  return (
    <div className="settings">
      <div className="settings-header flex center">
        <h4 style={{ margin: "0" }}>Welcome To {state}</h4>
      </div>

      {state === "Settings" && (
        <button
          className="settings-button"
          onClick={() => {
            setState("Chat Settings");
          }}
        >
          Chat Settings
        </button>
      )}
      {state === "Chat Settings" && (
        <div>
          <button
            className="settings-button"
            onClick={() => {
              if (orient == "Dynamic") {
                setOrient("Always Left");
              }
              if (orient == "Always Left") {
                setOrient("Always Right");
              }
              if (orient == "Always Right") {
                setOrient("Dynamic");
              }
            }}
          >
            Chat Bubble Orientation : {orient}
          </button>
          <button
            className="settings-button"
            onClick={() => {
              setDpChat(`${dpChat === "Off" ? "On" : "Off"}`);
            }}
          >
            Display Picture in Chat Bubble : {dpChat}
          </button>
          <button
            className="settings-button"
            onClick={() => {
              setting_DPM(dpChat);
              setting_Orientation(orient);
              setState("Settings");
            }}
          >
            Done
          </button>
        </div>
      )}

      {state === "Settings" && (
        <div>
          <input
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            type="color"
            className="settings-button"
          />
          <button
            className="settings-button"
            onClick={() => {
              localStorage.removeItem("id");
              props.setSigned(false);
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default Settings;
