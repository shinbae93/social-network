import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import UploadImage from '../components/uploadImage/UploadImage';
import Button from '../components/button/Button';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import http from '../config/axiosConfig';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const PostAddPage = () => {
  const params = useParams();
  const id = params.id;
  const { user } = useAuth();
  const [imageFiles, setImageFiles] = useState([]);
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
    },
  });
  useEffect(() => {
    http.get(`posts/${id}`).then((res) => {
      console.log(res.data);
      setPost(res?.data);
      reset({
        content: res?.data.content,
      });
      const listImageUpdate = [];
      res?.data?.attachments.map((image) =>
        listImageUpdate.push({
          file: {
            name: image,
          },
          url: image,
        })
      );
      setImageFiles(listImageUpdate);
    });
  }, [id]);
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error('Content required');
    }
  }, [errors]);
  const addPost = (values) => {
    setIsLoading(true);
    const formData = new FormData();

    imageFiles.forEach((item) => {
      formData.append('attachments', item.file);
    });
    formData.append('content', values.content);
    formData.append('userId', user._id);
    const token = localStorage.getItem('token');

    axios
      .put(
        `https://social-network-prod-ong-troc-wlfcze.mo2.mogenius.io/api/v1/posts/${id}`,
        formData,
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        navigate('/profile');
        setIsLoading(false);
        toast.success('success');
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        toast.error('error');
      });
  };

  return (
    <div className="w-full max-w-[600px] flex flex-col mt-10 shadow-lg  mx-auto rounded-lg mb-4">
      <div className="w-full">
        <div className="w-full py-5 border-b border-slate-300">
          <h1 className="text-2xl font-bold text-center">Update post</h1>
        </div>
        <div className="px-4 w-full pt-4">
          <form
            onSubmit={handleSubmit(addPost)}
            className="flex flex-col gap-5 mb-4"
          >
            <div className="mt-3">
              <textarea
                className="w-full h-[100px] outline-none min-h-[100px] px-3 py-3"
                placeholder="Post's content"
                name="content"
                {...register('content', { required: true })}
              ></textarea>
            </div>
            <UploadImage
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
            <Button type="submit" isLoading={isLoading} styleClass="w-full">
              Update
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAddPage;
