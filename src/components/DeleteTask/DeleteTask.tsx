import { memo } from 'react';
import useDataContext from '../../hooks/useDataContext';
import { TData } from '../../lib/types/types';
import { close } from '../../assets/icons';

const DeleteTask = memo(function () {
  // @ts-expect-error idk
  const { findTask, taskId, setTaskId, DeleteTask, setIsDeleteOpen } =
    useDataContext();

  const task: TData = findTask(taskId);
  const handleAgree = () => {
    DeleteTask(taskId);
    setIsDeleteOpen(false);
  };
  const handleDisagree = () => {
    setIsDeleteOpen(false);
    setTaskId('');
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/30"></div>
      <div className="max-width fixed right-1/2 top-20 max-w-[300px] translate-x-1/2 rounded bg-white">
        <div className="flex items-center justify-between px-5 py-1">
          <h1 className="text-[1.2rem] font-semibold uppercase">Delete Task</h1>
          <img
            role="button"
            src={close}
            alt="close button"
            className="w-5"
            onClick={() => setIsDeleteOpen(false)}
          />
        </div>
        <div className="gradient-bg w-full space-y-2 p-5">
          <p className="text-[14px]">Do you wish to delete task</p>
          <div className="flex items-center justify-between">
            <h2>{task.title}</h2>
            <div className="flex gap-2">
              <button
                className="h-5 rounded bg-blue-500 px-3  text-[13px] capitalize"
                onClick={handleAgree}
              >
                yes
              </button>
              <button
                className="h-5 rounded bg-blue-500 px-3 text-[13px] capitalize"
                onClick={handleDisagree}
              >
                no
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default DeleteTask;
