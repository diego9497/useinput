# useInputValue

React hook that allow us an easy validation and manage styles.

[Versión español](https://github.com/diego9497/useinput/blob/master/README_es.md)

```javascript
const email = useInputValue()
```

## 1. Paramaters

Receive an object with the following keys

| Option             | Description                                                                                    | Type      |
| ------------------ | :--------------------------------------------------------------------------------------------- | --------- |
| `initialValue`     | The initial value of the input                                                                 | `any`     |
| `required`         | Says if the input is required                                                                  | `boolean` |
| `regEx`            | A regular expression to validate                                                               | `RegExp`  |
| `customValidation` | A callback to perform a custom validation that `return boolean`                                | `fn`      |
| `errorMessage`     | An object with messages for the three types of errors `required`, `regExp`, `customValidation` | `fn`      |

### Examples

#### Username validation

A username validation where the **input** is required and need to match with a **regular expression**

```javascript
const regExpUsername = /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
```

```javascript
const username = useInputValue({
  initialValue: '',
  required: true,
  regExp: regExpUsername,
})
```

#### Password matches

A password validation where the password inputs must be equals perfomed by a **customValidation**

```javascript
const password1 = useInputValue({
  initialValue: '',
  required: true,
  regExp: regExpPassword,
})

const password2 = useInputValue({
  initialValue: '',
  required: true,
  customValidation: (value) => {
    return value == password1.value
  },
})
```

## 2. Return

| Name              | Description                                                                                                                                          | Type      |
| ----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `value`           | The value of the field                                                                                                                               | `any`     |
| `onChange`        | The function that update the state of the value                                                                                                      | `fn`      |
| `valid`           | Indicates if the field entry is valid                                                                                                                | `boolean` |
| `showError`       | A variable that helps show error styles. Avoid displaying an error when the field has not been touched.                                              | `boolean` |
| `errors`          | An object with the errors present in the validation, could be **empty** or coul be **one or more** of these `required`, `regExp`, `customValidation` | `object`  |
| `updateShowError` | An function to re-check if the input is valid, useful when an user submit the form and dont modified a field                                         | `fn`      |

### Examples

#### With className

You can use the key `showError` to put a class to show the correct error styles.
Or use `showError`, `required`, `regExp`, `customValidation` to show error messages, in this case show just one of the possible errors at the same time, and prefer to show the required error message when the field is empty above the other possible errors.
If the field is not empty can display another error if exists.

```JSX
<input
  type="password"
  {...password1}
  className={`input ${password1.showError? 'error': ''}`}
/>
{
  password1.errors.required && password1.showError ?
  <Error>{password1.errors.required}</Error>
  : null
}
{
  password1.errors.regExp && password1.showError &&
 !password1.errors.required ?
  <Error>{password1.errors.regExp}</Error>
 : null
}
<input
  type="password"
  {...password2}
  className={`input ${password1.showError? 'error': ''}`}
/>
{
  password2.errors.customValidation && password2.showError
  && !password2.errors.required ?
  <Error>{password2.errors.customValidation}</Error>
: null
}

```

#### With styled-components

You can pass directly the all the variables using the spread operation and use `styled-components` to show the correct styles.

```JSX
<Input type="password" {...password1} />
{/*
 Code to show the specific message error
 */}
<Input type="password" {...password2} />
{/*
  Code to show the specific message error
 */}
```

`showError` and `valid` are provided by the hook.

```JSX
export const Input = styled.input`
  height: 32px;
  margin-bottom: 6px;
  padding-left: 16px;
  border: 1px solid #382042;
  ${(props) =>
    props.showError &&
    css`
      box-shadow: ${(props) =>
        props.valid ? null : '0 0 3px 2px rgba(255, 30, 30, 0.97)'};
      border-color: ${(props) => (props.valid ? '#382042' : 'transparent')};
    `}
`
export const Error = styled.span`
  font-size: 0.87em;
  color: rgba(255, 30, 30, 0.97);
  padding-left: 7px;
`

```
