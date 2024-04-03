import { Dialog, Transition } from '@headlessui/react';
import { Button, Modal, TextInput, Textarea } from 'flowbite-react';
import { Fragment, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

const EditTaskModal = ({
  openEditTaskModal,
  setOpenEditTaskModal,
  refetch,
  taskData,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  // const { data, isLoading } = useQuery({
  //   queryKey: [taskData],
  //   queryFn: () =>
  //     fetch(`http://localhost:3000/api/tasks/id/${taskData?._id}`).then(res =>
  //       res.json()
  //     ),
  // });

  const handleAddTask = data => {
    console.log(data);
    const task = {
      title: data.title,
      description: data.description,
      date: data.date,
      taskOf: taskData?._id,
    };
    axios.put(`http://localhost:3000/api/tasks`, task).then(res => {
      if (res.status === 200) {
        reset();
        setOpenEditTaskModal(false);
        navigate('/');
        refetch();
        toast.success(`Task added successfully`);
      }
    });
  };

  return (
    <Modal
      show={openEditTaskModal}
      onClose={() => {
        setOpenEditTaskModal(false);
        refetch();
      }}
      popup
    >
      <Modal.Header>Edit Task</Modal.Header>
      <Modal.Body>
        <form action="" onSubmit={handleSubmit(handleAddTask)}>
          <TextInput
            {...register('title')}
            className="my-2"
            sizing="sm"
            defaultValue={taskData?.title}
            placeholder="Title"
            required
          />
          <Textarea
            {...register('description')}
            className="my-2"
            defaultValue={taskData?.description}
            placeholder="Description"
            rows={4}
            required
          />

          <input
            {...register('date')}
            className="w-full border border-gray-300 rounded-lg"
            type="date"
            defaultValue={taskData?.date}
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
      </Modal.Body>
    </Modal>

    // <Transition appear show={openEditTaskModal} as={Fragment}>
    //   <Dialog
    //     as="div"
    //     className="relative z-10"
    //     onClose={() => {
    //       setOpenEditTaskModal(false);
    //     }}
    //   >
    //     <Transition.Child
    //       as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-black/25" />
    //     </Transition.Child>

    //     <div className="fixed inset-0 overflow-y-auto">
    //       <div className="flex min-h-full items-center justify-center p-4 text-center">
    //         <Transition.Child
    //           as={Fragment}
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 scale-95"
    //           enterTo="opacity-100 scale-100"
    //           leave="ease-in duration-200"
    //           leaveFrom="opacity-100 scale-100"
    //           leaveTo="opacity-0 scale-95"
    //         >
    //           <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
    //             <Dialog.Title
    //               as="h3"
    //               className="text-lg font-medium leading-6 text-gray-900"
    //             >
    //               Add task
    //             </Dialog.Title>
    //             <div className="mt-2">
    //               <form action="" onSubmit={handleSubmit(handleAddTask)}>
    //                 <TextInput
    //                   {...register('title')}
    //                   className="my-2"
    //                   sizing="sm"
    //                   defaultValue={taskData?.title}
    //                   placeholder="Title"
    //                   required
    //                 />
    //                 <Textarea
    //                   {...register('description')}
    //                   className="my-2"
    //                   defaultValue={taskData?.description}
    //                   placeholder="Description"
    //                   rows={4}
    //                   required
    //                 />

    //                 <input
    //                   className="w-full border border-gray-300 rounded-lg"
    //                   {...register('date')}
    //                   type="date"
    //                   defaultValue={taskData?.date}
    //                 />

    //                 <div className="my-4">
    //                   <button
    //                     type="submit"
    //                     className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    //                     onClick={() => {
    //                       setOpenEditTaskModal(false);
    //                       setTaskData(null);
    //                     }}
    //                   >
    //                     Update
    //                   </button>
    //                 </div>
    //               </form>
    //             </div>
    //           </Dialog.Panel>
    //         </Transition.Child>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition>
  );
};

export default EditTaskModal;
