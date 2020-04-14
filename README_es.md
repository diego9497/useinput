# useInputValue

Hook de react que nos permite validar de manera fácil y manejar los estilos.

[Live demo - codesand](https://codesandbox.io/s/useinputvalue-bxugd?file=/src/App.js)

[English version ](https://github.com/diego9497/useinput/blob/master/README.md)

```javascript
const email = useInputValue()
```

## 1. Parámetros

Recibe un objeto con las siguiente llaces

| Opción             | Descripción                                                                                            | Tipo      |
| ------------------ | :----------------------------------------------------------------------------------------------------- | --------- |
| `initialValue`     | El valor inicial del campo                                                                             | `any`     |
| `required`         | Indica si el campo es obligatorio                                                                      | `boolean` |
| `regEx`            | Una expresión regular que se usa para validar                                                          | `RegExp`  |
| `customValidation` | Un callback que se ejecuta para una validación personalizada y retorna un boleano `return boolean`     | `fn`      |
| `errorMessage`     | Un objeto con mensaje para los tres diferentes tipos de error `required`, `regExp`, `customValidation` | `fn`      |

### Examples

#### Validación de nombre usuario.

Validación de nombre usuario donde el **input** is obligatorio y necesita satisfacer una **expresión regular**

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

#### Coincidencia de contraseña

Una validación donde los campos de contraseña y repetir contraseña deben ser iguales, ejecutada por una **customValidation**

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

| Nombre            | Descripción                                                                                                                                            | Tipo      |
| ----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `value`           | El valor del campo                                                                                                                                     | `any`     |
| `onChange`        | La función que actualiza el valor del campo                                                                                                            | `fn`      |
| `valid`           | Indica si el valor del campo es valido                                                                                                                 | `boolean` |
| `showError`       | Una variable que nos dice cuando mostrar los errores. Evita mostrar un error cuando el campo no ha sido modificado y sigue en el estado inicial.       | `boolean` |
| `errors`          | Un objeto con los errores presentes durante la validación, puede estar **vacio** o ser **uno o más** de estos `required`, `regExp`, `customValidation` | `object`  |
| `updateShowError` | Una función para re validar si el campo es válido, útil cuando un usuario hace submit del formulario y no ha modificado algún campo                    | `fn`      |

### Ejemplos

#### Con className

Puedes usar la llave `showError` para poner una clase y mostrar los estilos de error.
O usar `showError`, `required`, `regExp`, `customValidation` y mostrar los mensajes de error, en este caso solo se mostrará uno de los posibles errores al mismo tiempo, y será el del campo es obligatorio, poniendolo como prioridad sobre los otros posibles errores. Si el campo no es vacio mostrará otro error si existe.

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

#### Con styled-components

Puedes pasar todas las variables usando el operador de propagación y usar `styled-components` para mostrar los estilos correctos.

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
