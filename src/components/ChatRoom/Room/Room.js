import "./Room.css";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useState, useRef, useEffect } from "react";
import Settings from "../../Settings/Settings";

function Room(props) {
  let ran = 0;
  const dummy = useRef();
  const { firestore, firebase, userDetails } = props;
  const msgRef = firestore.collection("messages");
  const query = msgRef.orderBy("createdAt");
  const [messages] = useCollectionData(query, { idField: "id" });
  const [msg, setMsg] = useState("");
  const [PrevMsgName, setPrevMsgName] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [isStart, setStart] = useState(false);
  const [isReplyMode, setReplyMode] = useState(false);
  const [ReplyDetails, setReplyDetails] = useState({});
  const Reply = (details) => {
    setReplyDetails(details);
    setReplyMode(!isReplyMode);
  };
  const focusInp = useRef();
  const sendMessage = async () => {
    if (!msg.startsWith("/clear") || !msg.startsWith(" /clear")) {
      let photo = userDetails.photo;
      let reply = isReplyMode;
      setPrevMsgName(userDetails.Username);
      if (msg.startsWith("/anonymous "))
        photo =
          "https://firebasestorage.googleapis.com/v0/b/lemon-1c4c5.appspot.com/o/ghost.jpg?alt=media&token=06e9b230-1ab4-482e-82c5-626f7d160e60";
      await msgRef.add({
        text: MSG(msg, userDetails.Username),
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        name: Name(userDetails.Username),
        photo: photo,
        isReply: reply,
        replyText: ReplyDetails.text == undefined ? "" : ReplyDetails.text,
        replyName:
          ReplyDetails.Username == undefined ? "" : ReplyDetails.Username,
      });
      setMsg("");
      dummy.current.scrollIntoView({ behavior: "smooth" });
    } else {
      console.log("I AM HERE");
      document.querySelectorAll(".msg").forEach((e) => {
        e.style.display = "none";
      });
      setStart(true);
      setMsg("");
    }
  };

  const Name = (name) => {
    if (msg.startsWith("/anonymous ")) {
      return "Anonymous";
    } else {
      return name;
    }
  };

  const MSG = (msg, name) => {
    if (msg.includes("/name")) msg = msg.replace("/name", name);
    if (msg.startsWith("/anonymous ")) {
      return msg.replace("/anonymous ", "");
    } else {
      return msg;
    }
  };
  function msgClassOnDynamic(cls, name) {
    if (cls === "Dynamic") {
      if (userDetails.Username === name) {
        return "right";
      } else {
        return "left";
      }
    } else {
      return cls;
    }
  }
  return (
    <div
      className="ChatSpace"
      onLoad={() => {
        dummy.current.scrollIntoView({ behavior: "smooth" });
      }}
    >
      <div className="header flex">
        <div className="dpH flex center">
          <img src={userDetails.photo} className="dp" />

          <div style={{ paddingLeft: "1rem", fontSize: "1.8rem" }}>
            {userDetails.Username}
          </div>
        </div>
        <div
          className="more flex center col"
          onClick={() => {
            setShowSettings(!showSettings);
          }}
        >
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
      {!showSettings ? (
        <div className={!isStart ? `display` : "display flex center"}>
          {messages &&
            messages.map((msg) => {
              return (
                <ChatMessage
                  key={msg.id}
                  message={msg}
                  DATE={new Date(msg.createdAt.seconds * 1000)}
                  Reply={Reply}
                  clientName={userDetails.Username}
                  msgClass={msgClassOnDynamic(userDetails.orient, msg.name)}
                  showDp={userDetails.setDpChat}
                  focus={focusInp}
                />
              );
            })}
          {isStart && <div>To start The Chat , Type Something</div>}

          <span id="reff" ref={dummy}></span>
        </div>
      ) : (
        <Settings
          db={firestore.collection("users")}
          setSigned={props.setSigned}
        />
      )}
      {/* {isReplyMode && (
        <div className="reply">
          <span>{ReplyDetails.Username}</span>
          <span>{" says ->"}</span>
          <span style={{ color: "lightblue" }}>{ReplyDetails.text}</span>
        </div>
      )} */}
      {!showSettings && (
        <div className="inp flex row">
          <button
            className="cmd"
            onClick={() => {
              setMsg(`${msg} /`);
              focusInp.current.focus();
            }}
          >
            /
          </button>
          <input
            autoFocus
            type="text"
            onKeyDown={(e) => {
              if (msg.trim() !== "") {
                if (e.key == "Enter") {
                  sendMessage();
                }
              }
            }}
            ref={focusInp}
            placeholder={
              !isReplyMode
                ? "Write a Message ... "
                : `Write Something to Reply ${ReplyDetails.Username}`
            }
            className="msgField"
            value={msg}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
          <div
            onClick={() => {
              sendMessage();
            }}
            className={
              msg.trim() !== "" ? "send flex center" : "send flex center ac"
            }
          >
            Send
          </div>
        </div>
      )}
    </div>
  );
}

export default Room;
