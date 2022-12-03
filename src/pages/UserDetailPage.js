import React, { useEffect, useState } from 'react';
import http from '../config/axiosConfig';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Button from '../components/button/Button';
import Field from '../components/field/Field';
import Input from '../components/input/Input';
import Label from '../components/label/Label';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth-context';

const UserDetailPage = () => {
  const schema = yup
    .object({
      name: yup.string().required('Please enter your name'),
    })
    .required();
  const navigate = useNavigate();

  const { user } = useAuth();
  const [info, setFnfo] = useState({
    name: 'Van Hung',
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onSubmit',
    defaultValues: {
      name: '',
    },
  });
  const onSubmit = (e) => {
    console.log(e);
    update(e);
  };
  function update(value) {
    http
      .post('users/update', value)
      .then((res) => {
        console.log('Update success: ', res);
        localStorage.setItem('token', res.data.token);
      })
      .then(() => {
        http.get('/me').then((resUser) => {
          setFnfo(resUser.data);
          navigate('/');
        });
      })
      .catch((err) => {
        console.log('error: ', err);
      });
  }
  useEffect(() => {
    http
      .get('posts/of/me')
      .then((res) => {
        console.log(res);
        setFnfo(res?.data);
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
      </div>
      <div className="h-[1px] w-full bg-slate-200 mt-10"></div>
      <div className="w-[500px] mx-auto pt-10 flex flex-col gap-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field>
            <Label name="username">Name</Label>
            <Input type="text" name="name" control={control}></Input>
            {errors.name && (
              <p className="text-sm text-red-500 color-red">
                {errors.name.message}
              </p>
            )}
          </Field>
        </form>
        <Button type="submit" styleClass="ml-auto w-40">
          Update
        </Button>
      </div>
    </div>
  );
};

export default UserDetailPage;
