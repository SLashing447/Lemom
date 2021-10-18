import "./ChatMessage.css";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
function ChatMessage(props) {
  const clientName = props.clientName;
  const [currentReply, setCurrentReply] = useState("");
  const focus = props.focus;
  const { text, uid, name, photo, isReply, replyText, replyName } =
    props.message;
  const date = props.DATE;
  var msgClass =
    props.msgClass === "Dynamic"
      ? props.name === clientName
        ? "right"
        : "left"
      : props.msgClass;

  console.log(msgClass);
  const showDp = props.showDp;

  return (
    <div
      className={`msg flex ${msgClass}`}
      style={
        msgClass === "right"
          ? { paddingRight: "0.2rem" }
          : { width: "fit-content" }
      }
    >
      {/* {console.log(showImg)} */}
      {showDp && (
        <img
          src={photo}
          className={`MDP`}
          style={
            msgClass === "right"
              ? {
                  marginLeft: "0.5rem",
                }
              : {}
          }
        />
      )}
      <div>
        {isReply && (
          <div
            className={
              msgClass === "left"
                ? "replyParent"
                : "replyParent replyParentRight"
            }
          >
            You've Replied To{" "}
            <strong>{replyName == clientName ? "Yourself" : replyName}</strong>
            <div
              className={msgClass === "left" ? "replyText" : "replyTextRight"}
            >
              {replyText}
            </div>
          </div>
        )}
        <div
          className={`msgIn ${isReply && "replyBubble "} ${
            msgClass === "right" && isReply && "replyBubbleRight"
          }`}
          style={
            currentReply ? { border: "2px solid lime" } : { border: "none" }
          }
          onDoubleClick={() => {
            focus.current.focus();
            setCurrentReply(!currentReply);
            props.Reply({
              Username: props.message.name,
              text: props.message.text,
            });
          }}
        >
          <div className={msgClass === "right" ? "rightSpan" : "leftSpan"}>
            <span
              className="mName"
              style={
                msgClass == "right"
                  ? {
                      float: "left",
                      paddingRight: "1rem",
                    }
                  : {}
              }
            >
              {name !== clientName ? name : "You"}
            </span>
            <div
              className="time"
              style={msgClass === "right" ? { marginLeft: "0" } : {}}
            >
              {Time(date)}
            </div>
          </div>
          {msgClass == "right" && <br />}
          <div style={msgClass == "right" ? { textAlign: "right" } : {}}>
            {parse(Linkify(text))}
          </div>
        </div>
      </div>
    </div>
  );
}
function Time(date) {
  var Hours =
    date.getHours() !== 0
      ? date.getHours() > 12
        ? date.getHours() - 12
        : date.getHours()
      : "12";
  var mins =
    date.getMinutes() === 0
      ? "00"
      : (date.getMinutes() + 1).toString().length === 1
      ? `0${date.getMinutes() + 1}`
      : date.getMinutes() + 1;
  var app =
    date.getHours() !== 12 ? (date.getHours() > 12 ? " pm" : " am") : " pm";
  return `${Hours}:${mins} ${app}`;
}

function Linkify(str) {
  let newStr = [];
  let word = str.split(" ");
  word.map((e) => {
    if (e.includes(".")) {
      let index = word.index;
      if (e[index + 1] !== "" && e[index - 1] !== "" && !e.endsWith(".")) {
        let newText = "";
        if (!e.startsWith("https://")) {
          newText = e.replace(e, `<a class="link" href="http://${e}">${e}</a>`);
        } else {
          newText = e.replace(e, `<a class="link" href="${e}">${e}</a>`);
        }
        newStr.push(newText);
      } else {
        newStr.push(e);
      }
    } else {
      newStr.push(e);
    }
  });
  let NewString = "";
  newStr.forEach((e) => {
    NewString = `${NewString} ${e}`;
  });
  return NewString;
}

export default ChatMessage;
