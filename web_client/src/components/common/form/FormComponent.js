import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { Editable, useEditor } from "@wysimark/react";

const ErrorArea = ({ errors }) => {
  if (errors) {
    return (
      <div className="error-area">
        {errors.map((error, i) => (
          <p key={i}>{error}</p>
        ))}
      </div>
    );
  }
};

// Helper component for text and email inputs
const TextInput = ({ field, value, errors, onChange }) => (
  <div className="field-container">
    <label>{field.label}</label>
    <input
      type={field.type}
      name={field.name}
      placeholder={field.placeholder}
      value={value}
      required={field.required}
      onChange={onChange}
    />
    <ErrorArea errors={errors} />
  </div>
);

// Helper component for group inputs
const GroupInput = ({ field, value, errors, onChange }) => (
  <div className="field-container">
    <label>{field.label}</label>
    {field.options.map((option, i) => (
      <label key={i}>
        {option.label}
        <input
          type="radio"
          name={field.name}
          value={option.value}
          checked={value === option.value}
          required={field.required}
          onChange={onChange}
        />
      </label>
    ))}
    <ErrorArea errors={errors} />
  </div>
);

// Helper component for checkbox inputs
const CheckboxInput = ({ field, value, errors, onChange }) => (
  <div className="field-container">
    <label>{field.label}</label>
    <input type="checkbox" name={field.name} checked={value} />
    <ErrorArea errors={errors} />
  </div>
);

// Helper component for textarea inputs
const TextAreaInput = ({ field, value, errors, onChange, readOnly }) => {
  const textAreaRef = useRef(null);

  useEffect(() => {
    textAreaRef.current.style.height = "inherit";
    const scrollHeight = textAreaRef.current.scrollHeight;
    textAreaRef.current.style.height = `${scrollHeight}px`;
  }, [value]);

  return (
    <div className="field-container">
      <label>{field.label}</label>
      <textarea
        ref={textAreaRef}
        style={{
          height: "auto",
          maxHeight: "200px", // you would adjust this to be the equivalent of 10 lines of text
          overflowY: "auto",
        }}
        name={field.name}
        placeholder={field.placeholder}
        value={value}
        required={field.required}
        onChange={onChange}
        readOnly={readOnly}
      />
      <ErrorArea errors={errors} />
    </div>
  );
};

const TextEditor = ({ field, value, errors, onChange }) => {
  const editor = useEditor({
    initialMarkdown: "# Hello World",
  });

  return (
    <div className="field-container">
      <label>{field.label}</label>
      <Editable editor={editor} />
      <ErrorArea errors={errors} />
    </div>
  );
};

// Helper component for button inputs
const Button = ({ button, onClick }) => (
  <button type={button.type} onClick={onClick}>
    {button.label}
  </button>
);

// Main component
const FormComponent = ({
  buttonHandlers,
  formConfig,
  changeHandlers,
  errors,
  values,
}) => {
  const { formFields, buttons } = formConfig;

  // TODO apply field validation
  return (
    <form name={formConfig.formName} className="form-component-container">
      {formFields.map((field) => {
        const fieldValue = values[field.name];
        const fieldErrors = errors[field.name];
        const onChange = changeHandlers[field.onChange];
        if (field.type === "text" || field.type === "email") {
          return (
            <TextInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          );
        } else if (field.type === "group") {
          return (
            <GroupInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          );
        } else if (field.type === "checkbox") {
          return (
            <CheckboxInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          );
        } else if (field.type === "textArea") {
          return (
            <TextAreaInput
              key={field.name}
              field={field}
              value={fieldValue}
              errors={fieldErrors}
              readOnly={field.readOnly}
              onChange={(e) => onChange(field.name, e.target.value)}
            />
          );
        }
        return null;
      })}
      {buttons &&
        buttons.map((button, i) => {
          const clickHandler = buttonHandlers[button.onClick];
          return <Button key={i} button={button} onClick={clickHandler} />;
        })}
    </form>
  );
};

// Set prop types
FormComponent.propTypes = {
  // The elements of the form and their configuration
  formConfig: PropTypes.object.isRequired,
  // The functions that will be called on change of the corresponding input
  changeHandlers: PropTypes.object.isRequired,
  // The values of the form inputs
  values: PropTypes.object.isRequired,
  // The errors of the form inputs
  errors: PropTypes.object.isRequired,
  // The functions that will be called on click of the corresponding button
  buttonHandlers: PropTypes.object.isRequired,
};

export default FormComponent;
