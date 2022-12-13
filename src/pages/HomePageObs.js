import React, { useCallback, useRef, useState } from 'react';
import Post from '../components/post/Post';
import Search from '../components/search/Search';

import usePosts from '../hooks/usePosts';

const HomePageObs = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { posts, hasMore, loading } = usePosts(pageNumber);

  const observer = useRef();
  const lastElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loading]
  );

  return (
    <div className="w-full">
      <Search />
      <div className="w-[500px] mx-auto pt-10 flex flex-col gap-8">
        {posts.map((post, index) => {
          const createdAt = post.createdAt.slice(0, 10);
          if (posts.length === index + 1)
            return (
              <div className="check" ref={lastElement} key={post._id}>
                <Post
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
              </div>
            );
          else
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
        <div>{loading && 'Loading...'}</div>
      </div>
    </div>
  );
};

export default HomePageObs;
