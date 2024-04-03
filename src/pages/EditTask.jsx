import { useNavigate, useParams } from 'react-router-dom';
import LoadingSpinner from '../ui/LoadingSpinner';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { TextInput, Textarea } from 'flowbite-react';
import axios from 'axios';
import useFetchTasks from '../hooks/useFetchTasks';
import toast from 'react-hot-toast';

const EditTask = () => {
  const { id } = useParams();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['task'],
    queryFn: () =>
      fetch(`http://localhost:3000/api/tasks/id/${id}`).then(res => res.json()),
  });
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const { refetch } = useFetchTasks();

  const task = data?.payload;

  const handleEditTask = data => {
    const updatedTask = {
      title: data.title,
      description: data.description,
      date: data.date,
      isCompleted: task?.isCompleted,
      taskOf: task?.taskOf?._id,
    };

    axios
      .put(`http://localhost:3000/api/tasks/id/${id}`, updatedTask)
      .then(res => {
        if (res.status === 200) {
          reset();
          navigate('/');
          refetch();
          toast.success(`Task updated successfully`);
        }
      })
      .catch(err => {
        toast.error(`Could not update the task!`);
      });
  };

  if (isLoading || isFetching) return <LoadingSpinner />;

  return (
    <main className="bg-black min-h-screen">
      <div className="max-w-md mx-auto min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-white text-center font-bold text-2xl mb-5">Edit Task</h1>
        <form
          className="min-w-full"
          action=""
          onSubmit={handleSubmit(handleEditTask)}
        >
          <TextInput
            {...register('title')}
            className="my-2"
            sizing="sm"
            defaultValue={task?.title}
            placeholder="Title"
            required
          />
          <Textarea
            {...register('description')}
            className="my-2"
            defaultValue={task?.description}
            placeholder="Description"
            rows={4}
            required
          />

          <input
            {...register('date')}
            className="w-full border border-gray-300 rounded-lg"
            type="date"
            defaultValue={task?.date}
            required
          />

          <div className="my-4">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditTask;
