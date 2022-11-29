import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth-context';
import UploadImage from '../components/uploadImage/UploadImage';
import Button from '../components/button/Button';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import http from '../config/axiosConfig';
import axios from 'axios';

const PostAddPage = () => {
  const { user } = useAuth();
  const [imageFiles, setImageFiles] = useState([]);
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      content: '',
    },
  });
  useEffect(() => {
    const errorsList = Object.values(errors);
    if (errorsList.length > 0) {
      toast.error('Content required');
    }
  }, [errors]);
  const addPost = (values) => {
    const formData = new FormData();

    imageFiles.forEach((item) => {
      formData.append('attachments', item.file);
    });
    formData.append('content', values.content);
    formData.append('userId', user._id);
    const token = localStorage.getItem('token');
    console.log(token);
    axios
      .post('http://192.168.10.41:3000/api/v1/posts', formData, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast.success('success');
      })
      .catch((err) => {
        console.log(err);
        toast.error('error');
      });
  };

  return (
    <div className="w-full max-w-[600px] flex flex-col mt-10 shadow-lg  mx-auto rounded-lg mb-4">
      <div className="w-full">
        <div className="w-full py-5 border-b border-slate-300">
          <h1 className="text-2xl font-bold text-center">Create New Post</h1>
        </div>
        <div className="px-4 w-full pt-4">
          <div className="flex flex-row gap-3 items-center">
            <div className="w-10 h-10 rounded-full">
              <img
                src="https://images.unsplash.com/photo-1669058665299-d6f81125dce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="font-semibold">{user?.name}</span>
          </div>
          <form
            onSubmit={handleSubmit(addPost)}
            className="flex flex-col gap-5 mb-4"
          >
            <div className="mt-3">
              <textarea
                className="w-full h-[100px] outline-none min-h-[100px] px-3 py-3"
                placeholder="What are you thinking about?"
                name="content"
                {...register('content', { required: true })}
              ></textarea>
            </div>
            <UploadImage
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
            />
            <Button type="submit" styleClass="w-full">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostAddPage;
