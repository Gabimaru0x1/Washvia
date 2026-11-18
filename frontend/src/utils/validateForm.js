const requiredMessages = {
  email: "Enter your email address.",
  password: "Enter your password.",
  phone_number: "Enter your phone number.",
  confirmPassword: "Confirm your password.",
};

export function validateForm(form) {
  const errors = {};

  for (const field of form.elements) {
    if (!field.name || !field.willValidate) continue;

    if (field.validity.valueMissing) {
      errors[field.name] =
        requiredMessages[field.name] ?? "This field is required.";
    } else if (field.validity.typeMismatch && field.type === "email") {
      errors[field.name] = "Enter a valid email address.";
    }
  }

  return errors;
}