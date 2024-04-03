import React from 'react';

const TaskSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
      {/* card  */}
      <div className="rounded-xl p-5 bg-[#323231] flex flex-col justify-between items-start gap-5 min-h-[200px] animate-pulse"></div>
      {/* card  */}
      <div className="rounded-xl p-5 bg-[#323231] flex flex-col justify-between items-start gap-5 min-h-[200px] animate-pulse"></div>
      {/* card  */}
      <div className="rounded-xl p-5 bg-[#323231] flex flex-col justify-between items-start gap-5 min-h-[200px] animate-pulse"></div>
    </div>
  );
};

export default TaskSkeleton;
