import React, { useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    // return;
    axios.post("https://mock-6-0vuh.onrender.com/user/login", formData)
    .then((res)=>{
        console.log('res:', res.data)
        if(res.data.msg=="User successfully logged in"){
            localStorage.setItem('token',res.data.token)
            toast({
                title: "Signup Successful",
                description: "You have successfully Logged in!",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              navigate("/blogs");
        }
    })
    .catch((err)=>{
        console.log('err:', err)
        toast({
            title: "Login Error",
            description: "An error occurred during login. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
    })
  };
  return (
    <Box
      maxW="400px"
      m="auto"
      p="4"
      border={"1px solid gray"}
      mt={"40px"}
      borderRadius={"15px"}
      boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px;"}
    >
      <Heading textAlign={"center"} mb="4">
        Login
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormControl>
        <Button type="submit" colorScheme="teal"  margin="auto">
          Login 
        </Button>
      </form>
    </Box>
  );
};

export default Login;