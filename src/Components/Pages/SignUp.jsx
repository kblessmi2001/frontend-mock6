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

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    avatar:
      "https://img.freepik.com/free-photo/3d-portrait-woman_23-2150793881.jpg?ga=GA1.1.1162169027.1699254330&semt=ais_ai_generated", // Replace with a dummy avatar URL
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData)
    axios.post("https://mock-6-0vuh.onrender.com/user/signup", formData)
    .then((res)=>{
        console.log('res:', res.data)
        if(res.data.msg=="User registered successfully!"){
            toast({
                title: "Signup Successful",
                description: "You have successfully signed up!",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              navigate("/login");
        }
    })
    .catch((err)=>{
        console.log('err:', err)
        toast({
            title: "Signup Error",
            description: "An error occurred during signup. Please try again.",
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
        Signup
      </Heading>
      <form onSubmit={handleSubmit}>
        <FormControl mb="4">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Avatar</FormLabel>
          <Input
            type="text"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
            required
          />
        </FormControl>
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
        <Button type="submit" colorScheme="teal" margin="auto">
          Signup
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;