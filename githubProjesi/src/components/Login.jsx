import { useEffect, useState } from "react";
import { Button, Form, FormFeedback, FormGroup, Input, Label } from "reactstrap";
import { useHistory } from "react-router-dom";

export default function Login() {

  const history = useHistory();

  const [isValid, setIsValid] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    term: false
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    term: false
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormData({ ...formData, [name]: newValue });

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

    if (name === "term") {
      if (checked) {
        setErrors({ ...errors, term: false });
      } else {
        setErrors({ ...errors, term: true });
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push("/success");
  };

  useEffect(() => {
    if (
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      formData.term === true
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [formData]);

  return (
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

          {errors.email && (
            <FormFeedback>
              Mail adresinizi kontrol edin
            </FormFeedback>
          )}

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

          {errors.password && (
            <FormFeedback>
              Parolanızı kontrol edin
            </FormFeedback>
          )}

        </FormGroup>

        <FormGroup>
          <Label for="term">
            Şartları kabul ediniz
          </Label>

          <Input
            id="term"
            name="term"
            type="checkbox"
            onChange={handleChange}
            invalid={errors.term}
          />

          {errors.term && (
            <FormFeedback>
              Şartları kabul etmelisiniz
            </FormFeedback>
          )}

        </FormGroup>

        <Button type="submit" disabled={!isValid}>
          Giriş Yap
        </Button>

      </Form>
    </>
  );
};