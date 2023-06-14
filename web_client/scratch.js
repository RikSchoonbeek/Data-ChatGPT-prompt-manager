
Generate the code for a React functional component that handles rendering a form based on a configuration object that describes all the fields and contains functions that are called on the onChange event of the corresponding input.

Generate all the code for a component that takes the following example formConfig and handles all the logic of rendering the correct label, input and other required elements.


const handleFirstNameChange = (event) => {
  // Handle first name change logic here
};

const handleLastNameChange = (event) => {
  // Handle last name change logic here
};

const handleEmailChange = (event) => {
    // Handle email change logic here
};

const handleGenderChange = (event) => {
    // Handle gender change logic here
};

const handleHobbiesChange = (event) => {
    // Handle hobbies change logic here
};

const handleNewsletterChange = (event) => {
    // Handle newsletter change logic here
};

const formConfig = [
  {
    formName: "userForm",
    formFields: [
      {
        type: "text",
        name: "firstName",
        label: "First Name",
        placeholder: "Enter your first name",
        initialValue: "Some value",
        required: true,
        onChange: handleFirstNameChange,
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
        onChange: handleLastNameChange,
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
        onChange: handleEmailChange,
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
        onChange: handleGenderChange,
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
        onChange: handleHobbiesChange,
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
        onChange: handleNewsletterChange,
      },
    ],
    errors: {
        firstName: ["Too long, max 40 characters"],
        email: ["Email is required"],
    buttons: [
      {
        type: "button",
        label: "Submit",
        onClick: () => {
          // Handle form submission logic here
        },
      },
    ],
  },
];

export default formConfig;
