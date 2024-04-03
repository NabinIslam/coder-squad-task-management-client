import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';
import useFetchTasks from '../hooks/useFetchTasks';
import toast from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/auth';

const TaskCard = ({ task, refetch }) => {
  const { user } = useAuth();
  const { title, description, date, _id, isCompleted } = task;
  const { pathname } = useLocation();
  const { refetch: filteredTaskRefetch } = useFetchTasks();

  const handleDeleteTask = () => {
    axios
      .delete(
        `https://coder-squad-task-management-server.onrender.com/api/tasks/id/${_id}`
      )
      .then(res => {
        if (res.status === 200) {
          refetch();
          toast.success(`Task deleted successfully`);
        }
      })
      .catch(err => toast.error(`Could not delete the task`));
  };

  const handleCompletedTaskStatus = () => {
    const updatedTask = {
      title: task.title,
      description: task.description,
      date: task.date,
      isCompleted: false,
      taskOf: user._id,
    };

    axios
      .put(
        `https://coder-squad-task-management-server.onrender.com/api/tasks/id/${task._id}`,
        updatedTask
      )
      .then(res => {
        if (res.status === 200) {
          if (pathname === '/completed') {
            filteredTaskRefetch();
            toast.success(`Task marked as Incomplete`);
          } else {
            refetch();
            toast.success(`Task marked as Incomplete`);
          }
        }
      })
      .catch(err => {
        console.error(err);
        toast.error(`Could not mark the task as Incomplete`);
      });
  };

  const handleIncompleteTaskStatus = () => {
    const updatedTask = {
      title: task.title,
      description: task.description,
      date: task.date,
      isCompleted: true,
      taskOf: user._id,
    };

    axios
      .put(
        `https://coder-squad-task-management-server.onrender.com/api/tasks/id/${task._id}`,
        updatedTask
      )
      .then(res => {
        if (res.status === 200) {
          if (res.status === 200) {
            if (pathname === '/incomplete') {
              filteredTaskRefetch();
              toast.success(`Task marked as Completed`);
            } else {
              refetch();
              toast.success(`Task marked as Completed`);
            }
          }
        }
      })
      .catch(err => {
        console.error(err);
        toast.error(`Could not mark the task as Completed`);
      });
  };

  return (
    <div className="rounded-xl p-5 bg-[#323231] flex flex-col justify-between items-start gap-5 min-h-[200px]">
      <div>
        <h5 className="text-xl font-semibold">{title}</h5>
        <p className="text-sm">{description}</p>
      </div>
      <div className="w-full">
        <h6 className="my-2">{date}</h6>

        <div className="flex items-center justify-between w-full">
          {isCompleted ? (
            <button
              className="bg-green-700 px-3 py-2 rounded-full font-semibold hover:bg-green-800 duration-150"
              onClick={() => handleCompletedTaskStatus()}
            >
              Completed
            </button>
          ) : (
            <button
              className="bg-blue-700 px-3 py-2 rounded-full font-semibold hover:bg-blue-800 duration-150"
              onClick={() => handleIncompleteTaskStatus()}
            >
              Incomplete
            </button>
          )}
          <span className="flex items-center gap-4">
            {pathname === '/' && (
              <Link to={`/edit-task/${_id}`}>
                <MdEditSquare className="hover:text-blue-500 duration-150 text-xl cursor-pointer" />
              </Link>
            )}

            {pathname === '/' && (
              <FaTrash
                className="hover:text-blue-500 duration-150 text-xl cursor-pointer"
                onClick={() => handleDeleteTask()}
              />
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
