import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatIcon } from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";
import styled from "styled-components";

const Blog = ({
  username,
  title,
  content,
  category,
  date,
  initialLikes,
  initialComments,
  onEditClick,
  onDeleteClick,
}) => {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments ?? []); 

  const [newComment, setNewComment] = useState("");

  const handleLikeClick = () => {
    setLikes((prevLikes) => (isNaN(prevLikes) ? 1 : prevLikes + 1));
  };
  

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      setComments((prevComments) => [
        ...prevComments,
        { username: "Current User", content: newComment },
      ]);
      setNewComment("");
    }
  };

  return (
    <BLOG>
      <Flex justifyContent={"space-between"}>
        <Box>
          <Heading as={"h3"} size={"xl"}>
            {username}
          </Heading>
          <Text>{category}</Text>
          <Text>{date}</Text>
        </Box>
        <Box>
          <Button
            color={"whitesmoke"}
            backgroundColor={"orange"}
            mr={"15px"}
            onClick={onEditClick}
          >
            Edit
          </Button>
          <Button
            color={"whitesmoke"}
            backgroundColor={"red"}
            onClick={onDeleteClick}
          >
            Delete
          </Button>
        </Box>
      </Flex>
      <Box>
        <Heading as={"h3"} size={"xl"}>
          {title}
        </Heading>
        <Text>{content}</Text>
        <Flex>
          <FaHeart onClick={handleLikeClick} style={{ cursor: "pointer" }} />
          <Text>{likes}</Text>
          <ChatIcon style={{ marginLeft: "20px" }} />
          <Text>{comments.length}</Text>
        </Flex>
      </Box>
      <Box>
        {comments?.map((el, index) => (
          <Box key={index}>
            <Text>{el.username}</Text>
            <Text>{el.content}</Text>
          </Box>
        ))}
      </Box>
      <Box mt="3">
        <textarea
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          color={"whitesmoke"}
          backgroundColor={"blue"}
          onClick={handleCommentSubmit}
          mt="2"
        >
          Post Comment
        </Button>
      </Box>
    </BLOG>
  );
};

export default Blog;

const BLOG = styled.div`
  padding: 1%;
  border: 1px solid gray;
  margin-bottom: 30px;
  border-radius: 15px;
`;
