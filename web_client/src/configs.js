export const exampleFormConfig = {
  formName: "userForm",
  formFields: [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      placeholder: "Enter your first name",
      initialValue: "Some value",
      required: true,
      onChange: "handleFirstNameChange",
      field_validation: {
        required: true,
        min_length: 5,
        max_length: 40,
      },
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      placeholder: "Enter your last name",
      required: true,
      onChange: "handleLastNameChange",
      field_validation: {
        required: true,
        max_length: 40,
      },
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
      onChange: "handleEmailChange",
      field_validation: {
        required: true,
        min_length: 3,
        max_length: 100,
        email: true,
      },
    },
    {
      type: "group",
      name: "gender",
      label: "Gender",
      required: true,
      onChange: "handleGenderChange",
      options: [
        {
          label: "Male",
          value: "male",
        },
        {
          label: "Female",
          value: "female",
        },
        {
          label: "Other",
          value: "other",
        },
      ],
    },
    {
      type: "group",
      name: "hobbies",
      label: "Hobbies",
      required: true,
      onChange: "handleHobbiesChange",
      options: [
        {
          label: "Reading",
          value: "reading",
        },
        {
          label: "Writing",
          value: "writing",
        },
        {
          label: "Painting",
          value: "painting",
        },
      ],
      initialValue: ["reading", "writing"],
    },
    {
      type: "checkbox",
      name: "newsletter",
      label: "Subscribe to Newsletter",
      initialValue: true,
      onChange: "handleNewsletterChange",
    },
  ],
  errors: {
    firstName: ["Too long, max 40 characters"],
    email: ["Email is required"],
  },
  buttons: [
    {
      type: "button",
      label: "Submit",
      onClick: "handleSubmit",
    },
  ],
};

export const chatFormConfig = {
  formName: "chatForm",
  formFields: [
    {
      type: "textArea",
      name: "prompt",
      label: "Prompt",
      placeholder: "Enter your prompt",
      initialValue: "Some value",
      onChange: "handlePromptChange",
      field_validation: {
        required: true,
      },
    },
    {
      type: "textArea",
      name: "response",
      label: "Response",
      placeholder: "Enter your response",
      onChange: "handleResponseChange",
      readOnly: true,
    },
  ],
  buttons: [
    {
      type: "button",
      label: "Submit",
      onClick: "handleSubmit",
    },
  ],
};
