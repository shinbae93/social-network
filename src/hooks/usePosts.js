import { useEffect, useState } from 'react';
import axios from 'axios';

export default function usePosts(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const token = localStorage.getItem('token');
  useEffect(() => {
    setPosts([]);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: 'GET',
      url: `https://social-network-prod-ong-troc-wlfcze.mo2.mogenius.io/api/v1/posts?page=${pageNumber}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
      headers: {
        token: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setPosts((prev) => [...prev, ...res.data.rows]);
        setHasMore(posts.length < res.data.count);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [pageNumber]);

  return { loading, error, posts, hasMore };
}
