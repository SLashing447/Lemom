import "./SignIn.css";
import { useState, useEffect } from "react";
import PasswordRules from "../PassRules/PasswordRules";
import Info from "../../assets/info.svg";
// localStorage.removeItem(
//   "sadt87237r3h123321696969696969420420420420420420dbfsajkhbdckbfjkhasfb9832yr893yhuhfk48796989/-*-*-+6+8321hU!&^E&^#@gydgfydsukfgksduygfafhfvhvcfhjfvkhdfas';;assss[[f'f[f']as"
// );
function SignIn(props) {
  const [OTPattempts, setOTPattempts] = useState(0);
  const db = props.db;
  const firebase = props.firebase;
  const [details, setDetails] = useState({
    Username: "",
    Passowrd: "",
    email: "",
  });
  const [InvalidOtp, setInvalidOtp] = useState(false);
  const [inputOTP, setInputOtp] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [emailErr, setEmaiErr] = useState("");
  const [gender, setGender] = useState("");
  const [showPassRules, setShowPassRules] = useState(false);
  function sendOtp(email) {
    console.log(email);
    window.Email.send({
      Host: "smtp.gmail.com",
      Username: "lemon.co.960@gmail.com",
      Password: "hy2s72YGSYg872178Y&U!*&tey7gdiuy",
      To: email,
      From: "lemon.co.960@gmail.com",
      Subject: "This is the subject",
      Body: `Your Secret OTP is ${localStorage.getItem(
        "sadt87237r3h123321696969696969420420420420420420dbfsajkhbdckbfjkhasfb9832yr893yhuhfk48796989/-*-*-+6+8321hU!&^E&^#@gydgfydsukfgksduygfafhfvhvcfhjfvkhdfas';;assss0000as"
      )}`,
    }).then((message) => alert(message));
  }
  function genOTP() {
    var length = 6;
    for (
      var s = "";
      s.length < length;
      s +=
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
          (Math.random() * 62) | 0
        )
    );
    localStorage.setItem(
      "sadt87237r3h123321696969696969420420420420420420dbfsajkhbdckbfjkhasfb9832yr893yhuhfk48796989/-*-*-+6+8321hU!&^E&^#@gydgfydsukfgksduygfafhfvhvcfhjfvkhdfas';;assss0000as",
      s
    );
  }
  async function getMarkers() {
    const events = await firebase.firestore().collection("users");
    events.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (details.Username === doc.data()["Username"]) {
          setUsernameErr("USERNAME EXISTS");
        }
        if (details.email === doc.data()["email"]) {
          setEmaiErr("EMAIl EXISTS");
        }
      });
    });
  }
  function checkTypo() {
    return validPassword(details.Passowrd) && validEmail(details.email);
  }
  function validEmail(email) {
    const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
    return regex.test(email);
  }
  function validPassword(pass) {
    var passwordValidator = require("password-validator");

    // Create a schema
    var schema = new passwordValidator();
    schema
      .is()
      .min(8) // Minimum length 8
      .is()
      .max(16) // Maximum length 100
      .has()
      .uppercase() // Must have uppercase letters
      .has()
      .lowercase() // Must have lowercase letters
      .has()
      .digits(3); // Must have at least 3 digits

    return schema.validate(pass);
  }
  const [page, setPage] = useState(false);
  const [otpPage, setOtpPage] = useState(false);

  return (
    <div className="regis">
      <div className="SignInheader">Lemon</div>
      {(emailErr !== "" || usernameErr !== "") && (
        <div className="errMSG">
          {emailErr !== "" && <span>{`${emailErr} ! `}</span>}
          {usernameErr !== "" && <span>{`${usernameErr} ! `}</span>}
        </div>
      )}
      <div
        className={`flex center col ${
          emailErr !== "" || usernameErr !== "" ? "defaultHeight" : "errHeight"
        }`}
        id="f12"
      >
        {showPassRules && <PasswordRules setShowPassRules={setShowPassRules} />}

        {!otpPage ? (
          <div className={`flex center col ${showPassRules && "hide"}`}>
            <input
              onChange={(e) => {
                setUsernameErr("");
                setDetails({
                  Username: e.target.value,
                  Passowrd: details.Passowrd,
                  email: details.email,
                });
              }}
              className="SignUp-Inp"
              type="text"
              placeholder="username"
              value={details.Username}
            />
            {!page && (
              <input
                onChange={(e) => {
                  setEmaiErr("");
                  setDetails({
                    Username: details.Username,
                    Passowrd: details.Passowrd,
                    email: e.target.value,
                  });
                }}
                className="SignUp-Inp"
                type="email"
                placeholder="email"
                value={details.email}
              />
            )}
            <span className="flex" id="passField">
              <input
                onChange={(e) => {
                  page && setEmaiErr("");
                  setDetails({
                    Username: details.Username,
                    Passowrd: e.target.value,
                    email: details.email,
                  });
                }}
                id="passFild"
                type="text"
                placeholder="password"
                value={details.Passowrd}
                maxLength="16"
                style={{ marginBottom: "0" }}
              />
              <img
                onClick={() => {
                  setShowPassRules(true);
                }}
                style={{ cursor: "pointer" }}
                src={Info}
              />
            </span>
            {!page && (
              <div
                className="SignUp-Inp flex center"
                style={{
                  fontSize: "1.1rem",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                <div>Gender : </div>&nbsp;&nbsp;
                <input
                  onClick={() => {
                    setGender("male");
                  }}
                  id="maleC"
                  className="checkBox"
                  type="checkbox"
                  checked={gender === "male" ? true : false}
                />
                <label for="maleC">Male</label>
                &nbsp;
                <input
                  onClick={() => {
                    setGender("female");
                  }}
                  id="femaleC"
                  className="checkBox"
                  type="checkbox"
                  checked={gender === "female" ? true : false}
                />
                <label for="femaleC">Female</label>
                <span
                  style={{
                    textDecoration: "underline",
                    paddingLeft: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    alert(
                      "We take your Gender input to uqinuely customize your Avatar and It is completely optional"
                    );
                  }}
                >
                  Why
                </span>
              </div>
            )}
            <button
              onClick={
                !page
                  ? () => {
                      if (
                        details.Passowrd !== "" &&
                        details.email !== "" &&
                        details.Username !== ""
                      ) {
                        getMarkers();
                        if (checkTypo()) {
                          const cond = document.getElementById("elem") || false;
                          if (!cond) {
                            genOTP();
                            console.log(
                              localStorage.getItem(
                                "sadt87237r3h123321696969696969420420420420420420dbfsajkhbdckbfjkhasfb9832yr893yhuhfk48796989/-*-*-+6+8321hU!&^E&^#@gydgfydsukfgksduygfafhfvhvcfhjfvkhdfas';;assss0000as"
                              )
                            );
                            setOtpPage(true);
                            let email = details.email;
                            sendOtp(email);
                          }
                        } else {
                          if (!validEmail(details.email)) {
                            setEmaiErr("INVALID EMAIL");
                          }
                          if (!validPassword(details.Passowrd)) {
                            setShowPassRules(true);
                          }
                        }
                      }
                    }
                  : () => {
                      console.log("Log In");
                      const events = firebase.firestore().collection("users");
                      events.get().then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                          if (
                            details.Username === doc.data()["Username"] &&
                            details.Passowrd === doc.data()["Password"]
                          ) {
                            props.LogInUser(doc.id);
                          } else {
                            if (details.Username !== doc.data()["Username"]) {
                              setUsernameErr("Incorrent Username");
                            }
                            if (details.Passowrd !== doc.data()["Password"]) {
                              setEmaiErr("Incorrect Password");
                            }
                          }
                        });
                      });
                    }
              }
              className="signup-button"
            >
              {!page ? "Sign Up" : "Log In"}
            </button>
            <div className="signIn">
              {!page ? "Have an account ?" : "Don't Have an account ?"}
              <span
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => {
                  setDetails({ Username: "", Passowrd: "", email: "" });
                  setPage(!page);
                }}
              >
                {!page ? "Log In" : "Sign Up"}
              </span>
            </div>
          </div>
        ) : (
          <div className="flex center col">
            <div
              className="otp-msg"
              style={{
                color: "black",
                height: "fit-content",
                fontWeight: "bold",
              }}
            >
              The otp has been sent to
              <br />
              {details.email}
            </div>
            <input
              className="SignUp-Inp"
              type={InvalidOtp ? "text" : "password"}
              placeholder="OTP"
              maxLength="6"
              onChange={(e) => {
                setInvalidOtp(false);
                setInputOtp(e.target.value);
              }}
              value={inputOTP}
            />
            <button
              onClick={() => {
                var otp = localStorage.getItem(
                  "sadt87237r3h123321696969696969420420420420420420dbfsajkhbdckbfjkhasfb9832yr893yhuhfk48796989/-*-*-+6+8321hU!&^E&^#@gydgfydsukfgksduygfafhfvhvcfhjfvkhdfas';;assss0000as"
                );
                var inpOtp = inputOTP;
                console.log("Generated OTP ", otp);
                console.log("Input OTP ", inpOtp);
                if (OTPattempts <= 1) {
                  if (otp === inpOtp) {
                    localStorage.removeItem(
                      "sadt87237r3h123321696969696969420420420420420420dbfsajkhbdckbfjkhasfb9832yr893yhuhfk48796989/-*-*-+6+8321hU!&^E&^#@gydgfydsukfgksduygfafhfvhvcfhjfvkhdfas';;assss0000as"
                    );
                    props.createUser({
                      Username: details.Username,
                      email: details.email,
                      Password: details.Passowrd,
                      photo:
                        gender != ""
                          ? `https://avatars.dicebear.com/api/${gender}/${details.Username}.svg?mood[]=happy`
                          : `https://avatars.dicebear.com/api/jdenticon/${details.Username}.svg`,
                    });
                  } else {
                    var attempt = OTPattempts;
                    setOTPattempts((attempt += 1));
                    console.log("wrong OTP  , attempt : ", OTPattempts);
                    setInputOtp(
                      `Wrong OTP ! , ${2 - OTPattempts} attempts left`
                    );
                    setInvalidOtp(true);
                  }
                } else {
                  localStorage.removeItem(
                    "sadt87237r3h123321696969696969420420420420420420dbfsajkhbdckbfjkhasfb9832yr893yhuhfk48796989/-*-*-+6+8321hU!&^E&^#@gydgfydsukfgksduygfafhfvhvcfhjfvkhdfas';;assss0000as"
                  );
                  setDetails({ email: "" });
                  setOtpPage(false);
                }
              }}
              className="signup-button"
            >
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default SignIn;
