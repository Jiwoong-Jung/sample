import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash } from 'react-icons/fa';

const PostContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
`;

const PostTitle = styled.h2`
  margin: 0 0 10px;
  color: #333;
`;

const PostContent = styled.p`
  color: #666;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    color: #0056b3;
  }
`;

const Post = ({ post, deletePost, editPost }) => {
  return (
    <PostContainer>
      <PostTitle>{post.title}</PostTitle>
      <PostContent>{post.content}</PostContent>
      <ButtonContainer>
        <IconButton onClick={editPost}>
          <FaEdit />
        </IconButton>
        <IconButton onClick={() => deletePost(post.id)}>
          <FaTrash />
        </IconButton>
      </ButtonContainer>
    </PostContainer>
  );
};

export default Post;