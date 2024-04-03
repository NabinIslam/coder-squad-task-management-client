import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import { MdEditSquare } from 'react-icons/md';
import TaskSkeleton from '../ui/TaskSkeleton';
import useFetchTasks from '../hooks/useFetchTasks';
import TaskCard from '../components/TaskCard';

const Incomplete = () => {
  const { data, refetch, isLoading, isFetching } = useFetchTasks();

  const tasks = data?.payload?.tasks;

  return (
    <main>
      <h4 className="font-bold text-2xl">Incomplete</h4>
      <div className="w-[50px] h-[2px] rounded-full my-2 bg-blue-500"></div>

      {/* task container  */}
      {isLoading ? (
        <TaskSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5 gap-5">
          {tasks
            ?.filter(task => task.isCompleted === false)
            .map(task => (
              <TaskCard key={task._id} task={task} />
            ))}
        </div>
      )}
    </main>
  );
};

export default Incomplete;
