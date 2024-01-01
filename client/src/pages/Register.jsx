import React, { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {

  const { registerInfo,updateRegisterInfo,registerUser,registerError,isRegisterLoading } = useContext(AuthContext);

  return (
    <Form onSubmit={registerUser}>
      <Row
        style={{ height: "100vh", justifyContent: "center", paddingTop: "20%" }}
      >
        <Col xs={6}>
          <Stack gap="3">
            <h2>Register</h2>

            {/* <h2>{user.name}</h2> */}

            <Form.Control
              type="text"
              placeholder="name"
              onChange={(e) =>
                updateRegisterInfo({ ...registerInfo, name: e.target.value })
              }
            />
            <Form.Control type="email" placeholder="email" onChange={(e) =>
                updateRegisterInfo({ ...registerInfo, email: e.target.value })
              }/>
            <Form.Control type="password" placeholder="password" onChange={(e) =>
                updateRegisterInfo({ ...registerInfo, password: e.target.value })
              }/>
            <Button variant="primary" type="submit">
              {isRegisterLoading?"Creating Account":"Register"} 
            </Button>
            {registerError?.error && (
              <Alert variant="danger">{registerError?.message}</Alert>
            )}
          </Stack>
        </Col>
      </Row>
    </Form>
  );
};

export default Register;
