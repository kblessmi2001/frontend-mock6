import { Heading } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"

const Navbar = () => {
  return (
    <NAVBAR>
      <Link to="/">
        <Heading>Register</Heading>
      </Link>
      <Link to="/login">
        <Heading>Login</Heading>
      </Link>
      <Link to="/blogs">
        <Heading>Blogs</Heading>
      </Link>
    </NAVBAR>
  )
}

export default Navbar

const NAVBAR = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1%;
    background-color: #8ec5fc;
    background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
    color: #072747;
`;
