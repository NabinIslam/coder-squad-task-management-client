import axios from 'axios';
import { TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../validators/validators';

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();

  const handleSignUp = data => {
    axios
      .post(
        `https://coder-squad-task-management-server.onrender.com/api/auth/signup`,
        data
      )
      .then(res => {
        if (res.data.success) {
          navigate('/sign-in');
          toast.success(`Registration successful`);
        }
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <main className="h-screen bg-black pt-[150px] px-4">
      <div className="container py-10">
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="bg-[#323231] max-w-md mx-auto p-4 rounded-2xl shadow-2xl"
          action=""
        >
          <h2 className="text-white text-center font-bold mb-5 text-2xl">
            Sign Up
          </h2>
          <div className="mb-4">
            <TextInput
              {...register('name', { required: 'Name is required' })}
              type="text"
              placeholder="Name"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1 mb-3 ml-1">
                {errors.name.message}
              </p>
            )}
          </div>
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
            Already have an account?{' '}
            <Link className="font-bold" to="/sign-in">
              Sign In
            </Link>
          </p>
          <div className="flex justify-center items-center mt-5">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 font-semibold text-white px-5 py-2 rounded-full duration-150"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp;
