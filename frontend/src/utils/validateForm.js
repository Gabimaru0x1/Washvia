const requiredMessages = {
  email: "Enter your email address.",
  firstName: "Enter your first name.",
  password: "Enter your password.",
  phone_number: "Enter your phone number.",
  confirmPassword: "Confirm your password.",
};

export function validateForm(form) {
  const errors = {};

  for (const field of form.elements) {
    if (!field.name || !field.willValidate) continue;

    const isBlankFirstName =
      field.name === "firstName" && field.required && field.value.trim() === "";

    if (field.validity.valueMissing || isBlankFirstName) {
      errors[field.name] =
        requiredMessages[field.name] ?? "This field is required.";
    } else if (field.validity.typeMismatch && field.type === "email") {
      errors[field.name] = "Enter a valid email address.";
    }
  }

  return errors;
}