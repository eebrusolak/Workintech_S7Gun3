import { useEffect, useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";

export default function Login() {
 
    const history = useHistory();
    const [isValid, setİsValid] = useState(true);

    const [formData, setFormData]= useState(
        {
            email:"",
            password: "",
            term: false
        }
    );

    const [errors, setErrors] = useState(
        {
            email: false,
            password: false,
            term: false
        }
    );

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email)
    }


   const validatePassword = (password) => {
  //Min 1, Upper, Lower, Number, Symbol
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[d@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return regex.test(password)
}

    const handleChange = (event) => {
  const { name, value, checked} = event.target;

  const newValue = type === "checkbox" ? checked : value;

  setFormData({ ...formData, [name]: Value });

  if (name === "email") {
    if (validateEmail(value)) {
      setErrors({ ...errors, email: false });
    } else {
      setErrors({ ...errors, email: true });
    }
  }

  if (name === "password") {
    if (validatePassword(value)) {
      setErrors({ ...errors, password: false });
    } else {
      setErrors({ ...errors, password: true });
    }
  }

  if (name === "terms") {
    if (checked) {
      setErrors({ ...errors, terms: false });
    } else {
      setErrors({ ...errors, terms: true });
    }
  }
};


  const handleSubmit = (event) => {
    event.preventDefault();



    history.push("/success")


  }
useEffect(() => {
  if (validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      formData.term === true) {
    setİsValid(true);
  } else {
    setİsValid(false);
  }

  setIsValid(validateEmail(formData.email) && validatePassword(formData.password) && formData.term == true);

}, [formData]);

    return(
        <>
            <Form onSubmit={handleSubmit}>
  <FormGroup>
    <Label for="email">
      Email
    </Label>
    <Input
      id="email"
      name="email"
      placeholder="Mail Adresiniz"
      type="email"
      onChange={handleChange}
      value={formData.email}
      invalid={errors.email}
    />
  </FormGroup>

  <FormGroup>
  <Label for="password">
    Parola
  </Label>
  <Input
    id="password"
    name="password"
    placeholder="Parolanız"
    type="password"
    onChange={handleChange}
    value={formData.password}
    invalid={errors.password}
  />
</FormGroup>

<FormGroup>
  <Label for="term">
    Şartları kabul ediniz
  </Label>
  <Input
    id="term's"
    name="term"
    type="checkbox"
    onChange={handleChange}
    invalid={errors.term}
  />
</FormGroup>

<Button type="submit">Giriş Yap</Button>
</Form>
        </>
    )
}
