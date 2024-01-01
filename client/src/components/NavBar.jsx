import React, { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
const NavBar = () => {
  const {user,logout}=useContext(AuthContext)

  return (
    <Navbar bg="dark" className="mb-4" style={{ height: "3.75rem" }}>
      <Container>
        <h2>
          <Link className="link-light text-decoration-none" to="/">
            ChatApp
          </Link>
        </h2>

        {user &&(<span className="text-warning">Logged in as {user?.name}</span>)}
        <Nav>

        <Stack direction="horizontal" gap="3">
          {user && (<>
            <Link onClick={()=>logout()} className="link-light text-decoration-none" to="/logout">
              Logout
            </Link>
          </>)}


           {
            !user && (
              <>
              <Link className="link-light text-decoration-none" to="/login">
                Login
              </Link>
              <Link className="link-light text-decoration-none" to="/register">
                Register
              </Link>
              </>
              )
           }

            
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;