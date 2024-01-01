import React, { useContext } from 'react'
import { Alert, Button, Col, Form, Row, Stack } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext';
// useContext
// AuthContext
const Login = () => {
  const { loginInfo,updateLoginInfo,loginUser,loginError,isLoginLoading,logout } = useContext(AuthContext);

  return (
    <Form onSubmit={loginUser}>
        <Row style={{height:"100vh",justifyContent:"center",paddingTop:"20%"}}>
    <Col xs={6}>
    <Stack gap="3">
        <h2>Login</h2>
        <Form.Control type="email" placeholder='email'  onChange={(e) =>
                updateLoginInfo({ ...loginInfo, email: e.target.value })
              }/>
        <Form.Control type="password" placeholder='password' onChange={(e) =>
                updateLoginInfo({ ...loginInfo, password: e.target.value })
              }/>
         <Button variant="primary" type="submit">
              {isLginLoading?"Logging you in":"Login"} 
            </Button>
        {loginError?.error && (
              <Alert variant="danger">{loginError?.message}</Alert>
            )}
    </Stack>
    </Col>
        </Row>
    </Form>
  )
}

export default Login