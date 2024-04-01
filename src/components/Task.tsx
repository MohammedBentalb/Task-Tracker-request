import { TData } from '../lib/types/types';
import Settings from './Settings';

function Task({ task }: { task: TData }) {
  return (
    <div className="task-width m-3 flex flex-col gap-2 rounded bg-gray-300 p-2">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">{task.title}</h1>
        <p className="flex size-6 items-center justify-center rounded bg-blue-600 text-[13px] uppercase text-white">
          {(task.priority === 0 && 'P0') ||
            (task.priority === 1 && 'P1') ||
            (task.priority === 2 && 'P2')}
        </p>
      </div>
      <hr />
      <p className="text-justify text-[14px]">{task.desc}</p>
      <div className="flex items-center justify-between">
        <h2 className="font-semibold capitalize">@{task.assignee}</h2>
        <Settings taskId={task.id} />
      </div>
      <p className="w-fit rounded  bg-blue-600 px-5 py-0.5 text-[13px] capitalize text-white">
        {task.status === 'progress'
          ? 'in progress'
          : task.status === 'pending'
            ? 'assign'
            : task.status}
      </p>
    </div>
  );
}

export default Task;
