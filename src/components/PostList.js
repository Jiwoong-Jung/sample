import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';
import PostForm from './PostForm';
import EditPostForm from './EditPostForm';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addPost = (post) => {
    axios.post('http://localhost:3000/posts', post)
      .then(response => setPosts([...posts, response.data]))
      .catch(error => console.error('Error adding post:', error));
  };

  const deletePost = (id) => {
    axios.delete(`http://localhost:3000/posts/${id}`)
      .then(() => setPosts(posts.filter(post => post.id !== id)))
      .catch(error => console.error('Error deleting post:', error));
  };

  const updatePost = (id, updatedPost) => {
    axios.put(`http://localhost:3000/posts/${id}`, updatedPost)
      .then(response => {
        setPosts(posts.map(post => (post.id === id ? response.data : post)));
        setEditingPost(null);
      })
      .catch(error => console.error('Error updating post:', error));
  };

  return (
    <Container>
      <Title>Posts</Title>
      <PostForm addPost={addPost} />
      {editingPost && (
        <EditPostForm
          post={editingPost}
          updatePost={updatePost}
          cancelEdit={() => setEditingPost(null)}
        />
      )}
      {posts.map(post => (
        <Post
          key={post.id}
          post={post}
          deletePost={deletePost}
          editPost={() => setEditingPost(post)}
        />
      ))}
    </Container>
  );
};

export default PostList;