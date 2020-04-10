import { useState } from "react";

export default useInputValue = ({
  initialValue,
  required = false,
  regEx = /.*/,
  customValidation = (value) => true,
  errorMessage = {
    required: "This input must be provide",
    regEx: "This input does not match the given regular expression",
    customValidation: "This input does not match the given custom validation ",
  },
}) => {
  const [value, setValue] = useState(initialValue);
  const [valid, setValid] = useState(!required);
  const [showError, setShowError] = useState(false);

  const onChange = (e) => {
    let valueCopy = e.target.value;
    let evaluation = evaluate(valueCopy);
    setValue(valueCopy);
    setValid(evaluation.result);
    setShowError(!evaluation.result);
    setErrors(evaluation.errors);
  };

  const evaluate = (valueCopy) => {
    let requiredResult = true;
    let regExResult;
    let customValidationResult;
    if (required) {
      requiredResult = valueCopy !== "" && valueCopy !== undefined;
    }
    regExResult = regEx.test(valueCopy);
    customValidationResult = customValidation(valueCopy);
    let e = {};
    if (!requiredResult) e.required = errorMessage.required;
    if (!regExResult) e.regEx = errorMessage.regEx;
    if (!customValidationResult)
      e.customValidation = errorMessage.customValidation;
    let result = required && regExResult && customValidationResult;
    return { result, errors: e };
  };

  const [errors, setErrors] = useState(() => {
    return evaluate(initialValue).errors;
  });

  return { value, onChange, valid, showError, errors };
};
