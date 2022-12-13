import React, { useEffect, useState } from 'react';
import Post from '../components/post/Post';
import http from '../config/axiosConfig';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    http
      .get('posts')
      .then((res) => {
        console.log(res);
        setPosts(res?.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="w-full">
      <div className="w-[500px] mx-auto pt-10 flex flex-col gap-8">
        {posts.map((post) => {
          const createdAt = post.createdAt.slice(0, 10);
          return (
            <Post
              userName={post?.user.name}
              content={post.content}
              totalLikes={post.totalLikes}
              totalShares={post.totalShares}
              totalComments={post.totalComments}
              _id={post._id}
              createdAt={createdAt}
              userId={post.user._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
