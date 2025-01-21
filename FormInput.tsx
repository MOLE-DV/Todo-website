import React from "react";
export function FormInput({}) {
  return <label htmlFor="name" className="register-form-field-container">
        <h3 className="register-form-field-title">Name</h3>
        <input type="text" className="register-form-field-input" placeholder="Your name." />
      </label>;
}
  