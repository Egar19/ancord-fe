import { useState } from "react";

export const useInput = (defaultValue) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const reset = () => {
    setInputValue(defaultValue);
  };

  return [inputValue, handleInputChange, reset];
};