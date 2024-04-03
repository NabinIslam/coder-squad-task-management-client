import useFetchTasks from '../hooks/useFetchTasks';
import TaskCard from '../components/TaskCard';
import { FaPlusCircle } from 'react-icons/fa';
import { useState } from 'react';
import AddTaskModal from '../modals/AddTaskModal';
import TaskSkeleton from '../ui/TaskSkeleton';
import { Pagination } from 'flowbite-react';
import ReactPaginate from 'react-paginate';

const AllTasks = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, refetch, isLoading } = useFetchTasks(pageNumber);
  const [openAddTaskModal, setOpenAddTaskModal] = useState(false);

  const tasks = data?.payload?.tasks;
  const pagination = data?.payload?.pagination;

  const handlePageClick = event => {
    console.log(event.selected);
    setPageNumber(event.selected + 1);
    refetch();
  };

  return (
    <main>
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-2xl">All task</h4>
        <FaPlusCircle
          className="text-2xl hover:text-gray-400 duration-150 cursor-pointer"
          onClick={() => {
            setOpenAddTaskModal(true);
          }}
        />
      </div>
      <div className="w-[50px] h-[2px] rounded-full my-2 bg-blue-500"></div>

      {isLoading ? (
        <TaskSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mt-5 gap-5">
          {tasks?.map(task => (
            <TaskCard key={task._id} task={task} refetch={refetch} />
          ))}

          <div
            className="rounded-xl p-5 bg-[#323231] flex  justify-center items-center min-h-[200px] cursor-pointer hover:scale-105 duration-200"
            onClick={() => {
              setOpenAddTaskModal(true);
            }}
          >
            <FaPlusCircle className="text-4xl" onClick={() => {}} />
          </div>
        </div>
      )}
      <div className="flex justify-center items-center mt-10">
        <ReactPaginate
          className="bg-white flex items-center gap-2 text-black p-4 rounded-xl font-semibold"
          pageLinkClassName="border px-4 py-2 rounded-lg hover:bg-black hover:text-white cursor-pointer duration-150"
          previousLinkClassName="border px-4 py-2 rounded-lg hover:bg-black hover:text-white cursor-pointer duration-150"
          nextLinkClassName="border px-4 py-2 rounded-lg hover:bg-black hover:text-white cursor-pointer duration-150"
          activeLinkClassName="bg-black text-white"
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={Math.ceil(pagination?.totalPages)}
          pageCount={Math.ceil(pagination?.totalPages)}
          previousLabel="Previous"
          renderOnZeroPageCount={null}
        />
      </div>

      {/* <div className="flex overflow-x-auto sm:justify-center mt-10">
        <Pagination
          currentPage={pagination?.currentPage}
          totalPages={pagination?.totalPages}
          onPageChange={() => {}}
          showIcons
        />
      </div> */}
      <AddTaskModal
        openAddTaskModal={openAddTaskModal}
        setOpenAddTaskModal={setOpenAddTaskModal}
        refetch={refetch}
      />
    </main>
  );
};

export default AllTasks;
