import { memo } from 'react';
import { TData } from '../lib/types/types';
import Task from './Task';

const TaskHolder = memo(function ({
  title,
  data,
}: {
  title: string;
  data: TData[];
}) {
  return (
    <div className="flex w-full max-w-[260px] flex-col items-center gap-3 rounded-lg bg-white">
      <h1
        className={`h-16 w-full rounded-t-lg  pt-5 text-center uppercase text-white
        ${
          (title === 'pending' && 'bg-gray-400') ||
          (title === 'in progress' && 'bg-orange-400') ||
          (title === 'completed' && 'bg-green-400') ||
          (title === 'deployed' && 'bg-violet-600') ||
          (title === 'deffered' && 'bg-[#F68871]')
        }
      `}
      >
        {title}
      </h1>
      {data.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
});

export default TaskHolder;
