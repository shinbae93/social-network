import React, { useEffect, useState } from 'react';
import Post from '../components/post/Post';
import http from '../config/axiosConfig';
import { useAuth } from '../context/auth-context';

const ProfilePage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    http
      .get('posts/of/me')
      .then((res) => {
        console.log(res);
        setPosts(res?.data?.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="mt-10 mx-auto w-full max-w-[800px]">
      <div className="flex flex-row items-start gap-10">
        <div className="w-[150px] h-[150px]">
          <img
            src="https://images.unsplash.com/photo-1669058665299-d6f81125dce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
            alt=""
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="mt-5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-10 items-center">
              <span className="text-xl font-bold">{user?.name}</span>
            </div>
            <div className="text-lg text-slate-700">{user?.email}</div>
          </div>
        </div>
        <div className="ml-auto inline-block text-sm px-2 py-1 border border-purple-500 cursor-pointer">
          Edit profile
        </div>
      </div>
      <div className="h-[1px] w-full bg-slate-200 mt-10"></div>
      <div className="w-[500px] mx-auto pt-10 flex flex-col gap-8">
        {posts.map((post) => {
          const createdAt = post.createdAt.slice(0, 10);
          return (
            <Post
              key={post._id}
              userName={post?.user.name}
              content={post.content}
              totalLikes={post.totalLikes}
              totalShares={post.totalShares}
              totalComments={post.totalComments}
              _id={post._id}
              createdAt={createdAt}
              userId={post.user._id}
              isLike={post.isLike}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProfilePage;
