import {
    Box,
    Button,
    Flex,
    Input,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Textarea,
    useToast,
  } from "@chakra-ui/react";
  import React from "react";
  import { Search2Icon } from "@chakra-ui/icons";
  import styled from "styled-components";
  import { useEffect } from "react";
  import { useState } from "react";
  import axios from "axios";
  import Blog from "./Blog";
  
  const Blogs = () => {
    const [blogs, setBlogs] = useState();
    const toast = useToast();
  
    const [editingBlog, setEditingBlog] = useState(null);
    const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  
    const handleEditClick = (blog) => {
        setEditingBlog({ ...blog, editedContent: blog.content });
        setIsEditingModalOpen(true);
      };
  
    const handleCloseModal = () => {
      setEditingBlog(null);
      setIsEditingModalOpen(false);
    };
    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = () => {
      let token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
      };
      axios
        .get(`https://mock-6-0vuh.onrender.com/blog`, { headers })
        .then((res) => {
          console.log("res:", res.data);
          setBlogs(res.data);
        })
        .catch((err) => {
          console.log("err:", err);
        });
    };
  
    const handleSaveChanges = () => {
      console.log(editingBlog.editedContent)
      let token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
      };
      axios
        .patch(`https://mock-6-0vuh.onrender.com/blog//update/${editingBlog._id}`, {
          content: editingBlog.editedContent,
        },{ headers })
        .then((res) => {
          if(res.data.error=="You don't have the access to update"){
              toast({
                  title: "You don't have the access to update",
                  description: "Only Author can update",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
          }else{
              toast({
                  title: "Updated Successfully",
                  description: "Content updated successfully !",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              console.log("Blog updated successfully:", res.data);
              const updatedBlogs = blogs.map((blog) =>
                blog._id === editingBlog._id
                  ? { ...blog, content: editingBlog.editedContent }
                  : blog
              );
              setBlogs(updatedBlogs);
              handleCloseModal();
          }
        })
        .catch((err) => {
          console.error("Error updating blog:", err);
        });
    };
  
    const handleDeleteClick = (blogId) => {
      let token = localStorage.getItem("token");
      const headers = {
        Authorization: `${token}`,
      };
      axios
        .delete(`https://mock-6-0vuh.onrender.com/blog/delete/${blogId}`,{ headers })
        .then((res) => {
          if(res.data.error=="You don't have the access to delete"){
              toast({
                  title: "You don't have the access to delete",
                  description: "Only Author can delete",
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                })
          }else{
              toast({
                  title: "Deleted Successfully",
                  description: "Content deleted successfully !",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
              console.log('Blog deleted successfully:', res.data);
              const updatedBlogs = blogs.filter((blog) => blog._id !== blogId);
              setBlogs(updatedBlogs);
          }
        })
        .catch((err) => {
          console.error('Error deleting blog:', err);
        });
    };
  
    return (
      <DIV>
        <Flex w={"90%"} m={"auto"} justifyContent={"space-around"}>
          <Flex id="search" alignItems={"center"} justifyContent={"space-around"}>
            <Search2Icon w={"10%"} />
            <Input />
          </Flex>
          <Box id="filter">
            <Select placeholder="Filter By Category">
              <option value="Business">Business</option>
              <option value="Tech">Tech</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Entertainment">Entertainment</option>
            </Select>
          </Box>
          <Box id="sort">
            <Select placeholder="Sort By Date">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Select>
          </Box>
          <Button>CREATE BLOG</Button>
        </Flex>
  
        <Box id="blogs">
          {blogs?.map((el) => (
            <Blog key={el._id} {...el} onEditClick={() => handleEditClick(el)} onDeleteClick={() => handleDeleteClick(el._id)}/>
          ))}
        </Box>
  
        <Modal isOpen={isEditingModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Blog</ModalHeader>
            <ModalBody>
              <Textarea
                value={editingBlog?.editedContent || ""}
                onChange={(e) =>
                  setEditingBlog({
                    ...editingBlog,
                    editedContent: e.target.value,
                  })
                }
                placeholder="Enter the updated content here"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
                Save Changes
              </Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </DIV>
    );
  };
  
  export default Blogs;
  
  const DIV = styled.div`
    margin-top: 40px;
    #blogs {
      width: 50%;
      margin: auto;
      margin-top: 30px;
    }
  `;