import "./index.css";
import React from "react";

function PasswordRules(props) {
  return (
    <div className="passRules flex col" style={{ alignItems: "center" }}>
      <h4>Password Rules</h4>
      <div>
        <div className="rules">
          1) It must have more than <strong>8 letter</strong>
        </div>
        <div className="rules">
          2) It must have less than <strong>16 letter</strong>
        </div>
        <div className="rules">
          3) It must have at least <strong>3 digits</strong>
        </div>
        <div className="rules">
          4) It must have <strong>uppercase letters</strong>
        </div>
        <div className="rules">
          5) It must have <strong>lower letters</strong>
        </div>
      </div>
      <div
        className="button google back flex center"
        onClick={() => {
          props.setShowPassRules(false);
        }}
      >
        Done
      </div>
    </div>
  );
}

export default PasswordRules;
