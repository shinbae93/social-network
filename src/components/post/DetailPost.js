import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { SwiperSlide, Swiper } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import http from '../../config/axiosConfig';
import { useAuth } from '../../context/auth-context';
import { BiRightArrow } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router-dom';

const DetailPost = () => {
  const [post, setPost] = useState();
  const [totalComment, setTotalComment] = useState();
  const [totalShare, setTotalShare] = useState();
  const [commentList, setCommentList] = useState([]);
  const [comment, setComment] = useState('');
  const [totalLike, setTotalLike] = useState();
  const [like, setLike] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();
  const params = useParams();
  const _id = params.id;
  useEffect(() => {
    http.get(`posts/${_id}`).then((res) => {
      console.log(res.data);
      setPost(res.data);
      setTotalLike(res.data.totalLikes);
      setTotalComment(res.data.totalComments);
      setTotalShare(res.data.totalShares);
      setCommentList(res.data.comments);
      setLike(res.data.isLike);
    });
  }, []);

  if (typeof document === 'undefined') return <div className="modal"></div>;

  const handleClickLike = (e) => {
    http
      .post('likes', {
        postId: _id,
        userId: user._id,
      })
      .then((res) => {
        setTotalLike(res.data.totalLikes);
        setLike((prev) => !prev);
      });
  };
  const handleClose = () => {
    navigate(-1);
  };
  const attachmentsDetail = post?.attachments || [];
  const handleAddSubmit = (e) => {
    e.preventDefault();
    http
      .post(`comments`, {
        userId: user?._id,
        postId: _id,
        content: comment,
      })
      .then((res) => {
        setComment('');
        setTotalComment((prev) => prev + 1);
      })
      .then((res) => {
        http.get(`posts/${_id}`).then((res) => {
          setCommentList(res?.data.comments);
        });
      })
      .catch((err) => {
        console.log('comment err: ', err);
      });
  };
  console.log(comment);
  return ReactDOM.createPortal(
    <div className="modal fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-black bg-opacity-30 overlay"></div>
      <div className="relative z-10  bg-white rounded-lg w-full max-w-[900px] h-[650px]">
        <AiOutlineCloseCircle
          onClick={handleClose}
          className="absolute top-4 right-4 cursor-pointer text-2xl"
        />
        <div className="flex flex-row w-full h-full">
          <div className="w-[50%] h-full image-list">
            {attachmentsDetail.length > 0 && (
              <Swiper
                slidesPerView={1}
                modules={[Navigation, Pagination]}
                navigation={true}
                pagination={{ clickable: true }}
                parallax={true}
              >
                {attachmentsDetail.map((item) => {
                  return (
                    <SwiperSlide>
                      <div className="h-full">
                        <img
                          src={item}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            )}
          </div>
          <div className="w-[50%] h-full pt-5 px-5 flex flex-col justify-between">
            <div className="w-full overflow-y-auto">
              <div className="flex flex-row gap-3 items-center">
                <div className="w-10 h-10">
                  <img
                    src="https://images.unsplash.com/photo-1669058665299-d6f81125dce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{post?.user?.name}</span>
                  <span className="text-xs text-slate-400">
                    {post?.createdAt.slice(0, 10)}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <p>{post?.content}</p>

                <AiOutlinePlusCircle className="mx-auto text-2xl mt-4 cursor-pointer" />
                <div className="">
                  {commentList &&
                    commentList.map((comment) => (
                      <div
                        key={comment._id}
                        className="flex flex-row gap-3 items-center mb-4"
                      >
                        <div className="w-10 h-10">
                          <img
                            src="https://images.unsplash.com/photo-1669058665299-d6f81125dce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                            alt=""
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                        <div className="flex flex-row gap-2 items-center text-sm">
                          <span className="font-semibold">
                            {comment.userName}
                          </span>
                          <span className="">{comment.content}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 relative mt-3">
              <div className="w-full h-[1px] bg-slate-300 absolute -top-2"></div>
              <div className="flex flex-row gap-3 items-center">
                <svg
                  fill={like ? '#ef4444' : '#262626'}
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                  className="cursor-pointer"
                  onClick={handleClickLike}
                >
                  <path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path>
                </svg>
                <svg
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <path
                    d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></path>
                </svg>
                <svg
                  color="#262626"
                  fill="#262626"
                  height="24"
                  role="img"
                  viewBox="0 0 24 24"
                  width="24"
                >
                  <line
                    fill="none"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    x1="22"
                    x2="9.218"
                    y1="3"
                    y2="10.083"
                  ></line>
                  <polygon
                    fill="none"
                    points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  ></polygon>
                </svg>
              </div>
              <div className="likes font-semibold text-sm flex flex-row gap-3">
                <div>
                  {totalLike} <span>Likes</span>
                </div>
                <div>
                  {totalShare} <span>Shares</span>
                </div>
              </div>
              <form onSubmit={handleAddSubmit} className="relative w-full">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="outline-none py-2 pl-4 pr-10 w-full text-sm"
                  placeholder="Write yout comment..."
                />
                <button
                  type="submit"
                  className="px-3 py-2 absolute bottom-1 right-1"
                >
                  <BiRightArrow />
                </button>
              </form>
              <div className="w-full h-[1px] bg-slate-200 mt-5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector('body')
  );
};

export default DetailPost;
