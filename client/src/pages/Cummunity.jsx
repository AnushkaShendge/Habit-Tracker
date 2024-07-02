import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import Header from './Header';
import { ThemeContext } from '../ThemeContext';

const Community = () => {
  const {theme} = useContext(ThemeContext)
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:4000/post');
      setPosts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/post', { content });
      setPosts([res.data, ...posts]);
      setContent('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className={`h-screen mx-auto p-4 mt-20 ${theme == 'light' ? '' : 'bg-gray-900 text-white'}`}>
        <h1 className="text-2xl font-bold mb-4">Posts</h1>
        {user && (
          <form onSubmit={handleSubmit} className="mb-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 border rounded mb-2"
              rows="4"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Post</button>
          </form>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {posts.map(post => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Community;

const PostItem = ({ post }) => (
    <div className="bg-gray-300 p-4 rounded-lg shadow-md flex flex-col justify-between transition-all duration-500 hover:scale-110 ">
      <h3 className="text-lg text-center font-bold">{post.user.username}</h3>
      <p className='text-md'>{post.content}</p>
      <small className="text-gray-500">{new Date(post.createdAt).toLocaleString()}</small>
    </div>
  );