import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Post from '../post/Post';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("Token:", token); // Log token value
    const fetchPosts = async () => {
      try {
        const res = await fetch(`http://localhost:5000/post/timeline/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error); // Error handling
      }
    };
    fetchPosts();
  }, [token]); // Include token in dependency array

  console.log("Posts:", posts); // Log posts state

  return (
    <div>
     {Array.isArray(posts) && posts.map((post) => (
      <Post key={post._id} post={post} />
    ))}
    </div>
  );
};

export default Posts;
