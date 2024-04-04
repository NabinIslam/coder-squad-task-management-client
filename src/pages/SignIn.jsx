import axios from 'axios';
import { TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import useFetchTasks from '../hooks/useFetchTasks';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from '../validators/validators';
import { useState } from 'react';

const SignIn = () => {
  const { isSubmitting, setIsSubmitting } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const { storeToken } = useAuth();
  const navigate = useNavigate();
  const { refetch } = useFetchTasks();

  const handleSignIn = data => {
    setIsSubmitting(true);
    axios
      .post(
        `https://coder-squad-task-management-server.onrender.com/api/auth/signin`,
        data
      )
      .then(res => {
        if (res.status === 200) {
          storeToken(res.data.token);
          navigate('/');
          toast.success(`Login successful`);
          refetch();
        }
      })
      .catch(err => {
        toast.error(err?.response?.data?.message);
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <main className="h-screen bg-black pt-[150px] px-4">
      <div className="container py-10">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="bg-[#323231] max-w-md mx-auto p-4 rounded-2xl shadow-2xl"
          action=""
        >
          <h2 className="text-white text-center font-bold mb-5 text-2xl">
            Sign In
          </h2>
          <div className="mb-4">
            <TextInput
              {...register('email')}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1 mb-3 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <TextInput
              {...register('password')}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-sm text-red-600 mt-1 mb-3 ml-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <p className="text-center text-white mt-4">
            Don&apos;t have an account?{' '}
            <Link className="font-bold" to="/sign-up">
              Sign Up
            </Link>
          </p>
          <div className="flex justify-center items-center mt-5">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 font-semibold text-white px-5 py-2 rounded-full duration-150"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
