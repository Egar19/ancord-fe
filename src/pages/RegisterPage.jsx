import { useState } from "react";
import RegisterInput from "../components/RegisterInput";
import AlertBox from "../components/AlertBox";
import { registerUser } from "../utils/api";

const RegisterPage = () => {
  const [alert, setAlert] = useState({ type: "", message: "" });

  const showAlert = (type, message, duration = 3000) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: "", message: "" });
    }, duration);
  };

  const handleRegister = async ({ name, email, password }) => {
    try {
      const result = await registerUser(email, password, name);

      if (result?.status === "success") {
        showAlert("success", "Registration successful! Redirecting...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        showAlert("error", result?.message || "Registration failed.");
      }
    } catch (error) {
      showAlert("error", error?.message || "An unexpected error occurred.");
    }
  };

  return (
    <>
      {alert.message && (
        <AlertBox
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ type: "", message: "" })}
        />
      )}
      <RegisterInput register={handleRegister} />
    </>
  );
};

export default RegisterPage;