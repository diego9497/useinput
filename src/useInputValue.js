const { useState } = require("react");

function useInputValue({
  initialValue,
  required = false,
  regExp = /.*/,
  customValidation = (value) => true,
  errorMessage = {
    required: "This input must be provide",
    regExp: "This input does not match the given regular expression",
    customValidation: "This input does not match the given custom validation ",
  },
}) {
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

  const updateShowError = () => {
    console.log(value);
    let evaluation = evaluate(value);
    setValid(evaluation.result);
    setShowError(!evaluation.result);
    setErrors(evaluation.errors);
  };

  const evaluate = (valueCopy) => {
    let requiredResult = true;
    let regExpResult;
    let customValidationResult;
    if (required) {
      requiredResult = valueCopy !== "" && valueCopy !== undefined;
    }
    regExpResult = regExp.test(valueCopy);
    customValidationResult = customValidation(valueCopy);
    let e = {};
    if (!requiredResult) e.required = errorMessage.required;
    if (!regExpResult) e.regExp = errorMessage.regExp;
    if (!customValidationResult)
      e.customValidation = errorMessage.customValidation;
    let result = requiredResult && regExpResult && customValidationResult;
    return { result, errors: e };
  };

  const [errors, setErrors] = useState(() => {
    return evaluate(initialValue).errors;
  });

  return { value, onChange, valid, showError, errors, updateShowError };
}

module.exports = useInputValue;
