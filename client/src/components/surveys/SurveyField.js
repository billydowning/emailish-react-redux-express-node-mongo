// Contains logic to render a single label and text input
import React from "react";

const SurveyField = ({ input, label, meta }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
    </div>
  );
};

export default SurveyField;
