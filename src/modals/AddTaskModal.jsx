import { Dialog, Transition } from '@headlessui/react';
import { Label, TextInput, Textarea } from 'flowbite-react';
import { Fragment } from 'react';
import { useAuth } from '../context/auth';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { addTaskSchema } from '../validators/validators';

const AddTaskModal = ({ openAddTaskModal, setOpenAddTaskModal, refetch }) => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(addTaskSchema),
  });
  const navigate = useNavigate();

  const handleAddTask = data => {
    const task = {
      title: data.title,
      description: data.description,
      date: data.date,
      taskOf: user?._id,
    };

    axios
      .post(`http://localhost:3000/api/tasks`, task)
      .then(res => {
        if (res.status === 200) {
          reset();
          setOpenAddTaskModal(false);
          navigate('/');
          refetch();
          toast.success(`Task added successfully`);
        }
      })
      .catch(err => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <Transition appear show={openAddTaskModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpenAddTaskModal(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Add task
                </Dialog.Title>
                <div className="mt-2">
                  <form action="" onSubmit={handleSubmit(handleAddTask)}>
                    <TextInput
                      {...register('title')}
                      className="mt-2"
                      sizing="sm"
                      type="text"
                      placeholder="Title"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-600 ml-1">
                        {errors.title.message}
                      </p>
                    )}
                    <Textarea
                      {...register('description')}
                      className="mt-2"
                      placeholder="Description"
                      rows={4}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-600 ml-1">
                        {errors.description.message}
                      </p>
                    )}
                    <input
                      {...register('date')}
                      className="w-full border border-gray-300 rounded-lg mt-2 cursor-pointer"
                      type="date"
                    />
                    {errors.date && (
                      <p className="text-sm text-red-600 ml-1">
                        {errors.date.message}
                      </p>
                    )}
                    <div className="my-4 flex items-center gap-2">
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      >
                        {isSubmitting ? 'Adding task' : 'Add task'}
                      </button>
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={() => setOpenAddTaskModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddTaskModal;
