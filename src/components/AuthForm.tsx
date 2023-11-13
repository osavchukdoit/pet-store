import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

interface AuthFormProps {
  title: string;
  handleClick: (login: string, password: string) => void;
  children?: React.ReactElement;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  handleClick,
  children,
}) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    handleClick(login, password);
  };

  return (
    <Form className={"mb-3 col-xl-6 col-xs-12"} data-testid={"auth-form"}>
      <Form.Group className={"mb-3"} controlId={"from-email"}>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type={"email"}
          placeholder={"Enter email"}
          value={login}
          onChange={(event) => setLogin(event.target.value)}
        />
        <Form.Text className={"text-muted"}>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className={"mb-3"} controlId={"from-password"}>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type={"password"}
          placeholder={"Password"}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Group>

      <Button onClick={onSubmit} variant={"primary"} type={"submit"}>
        {title}
      </Button>
      {children}
    </Form>
  );
};
