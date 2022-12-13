import React, { useEffect, useState } from 'react';
import Post from '../components/post/Post';
import Search from '../components/search/Search';
import http from '../config/axiosConfig';

const getPosts = async (page) => {
  try {
    const res = await http.get(`posts?page=${page}`);
    return res.data.rows;
  } catch (e) {
    console.log('error', e);
  }
};
const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  const handleLoadMore = async () => {
    await getPosts(page).then((data) => {
      setPosts((prev) => [...prev, ...data]);
    });
  };
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
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (!isFetching) return;
    console.log('fetch');
    handleLoadMore();
  }, [isFetching]);

  const handleScroll = (event) => {
    const a = window.innerHeight;
    const b = document.documentElement.scrollTop;
    const c = document.documentElement.offsetHeight;
    // console.log(a, b, c);
    if (
      document.documentElement.scrollHeight -
        document.documentElement.scrollTop <=
      document.documentElement.clientHeight
    ) {
      // console.log('fetchscroll');
      setIsFetching(true);
      setPage(page + 1);
    }
  };
  return (
    <div className="w-full">
      <Search />
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
              attachments={post.attachments || []}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
