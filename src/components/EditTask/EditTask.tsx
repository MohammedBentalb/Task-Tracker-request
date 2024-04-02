import { FormEvent, useState } from 'react';
import { close } from '../../assets/icons';
import { priorityOptions } from '../../constants';
import useDataContext from '../../hooks/useDataContext';
import { TData } from '../../lib/types/types';
import ValidatedEditInput from './validatedEditInput';

function EditTask() {
  // @ts-expect-error idk
  const { findTask, taskId, setIsEditOpen, EditTask } = useDataContext();
  const task: TData = findTask(taskId);
  const [priority, setPriority] = useState(task.priority);
  const [status, setStatus] = useState(task.status);
  const Status = [
    { title: 'pending', value: 'pending' },
    { title: 'completed', value: 'completed' },
    { title: 'progress', value: 'progress' },
    { title: 'deployed', value: 'deployed' },
    { title: 'deffered', value: 'deffered' },
  ];
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === task.status && priority === task.priority) {
      setIsEditOpen(false);
      return;
    }
    EditTask({
      id: task.id,
      title: task.title,
      desc: task.desc,
      date: new Date(task.date),
      team: task.team,
      assignee: task.assignee,
      status,
      priority,
    });
    setIsEditOpen(false);
  };
  const handleReset = () => {
    setStatus(task.status);
    setPriority(task.priority);
  };
  return (
    <>
      <div className="fixed inset-0 bg-black/30"></div>
      <form
        onSubmit={handleSubmit}
        method="post"
        className="max-width fixed right-1/2 top-20 max-w-[300px] translate-x-1/2 rounded bg-white"
      >
        <div className="flex items-center justify-between px-5 py-1">
          <h1 className="text-[1.2rem] font-semibold uppercase">Edit Task</h1>
          <img
            role="button"
            src={close}
            alt="close button"
            className="w-5"
            onClick={() => {
              setIsEditOpen(false);
            }}
          />
        </div>
        <div className="gradient-bg space-y-3 p-5">
          <ValidatedEditInput
            className="edit-inputs"
            title="Title"
            value={task.title}
            name="title"
            key={task.title}
          />
          <div className=" flex flex-col items-start justify-start gap-2">
            <label htmlFor="desc" className="font-semibold">
              Description:
            </label>
            <p className="cursor-not-allowed rounded border border-black bg-gray-300 p-1 text-[15px]">
              {task.desc}
            </p>
          </div>
          <ValidatedEditInput
            className="edit-inputs"
            title="Team"
            value={task.team}
            name="team"
            key={task.team}
          />
          <ValidatedEditInput
            className="edit-inputs"
            title="Assignee"
            value={task.assignee}
            name="team"
          />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center justify-start gap-2">
              <label htmlFor="priority" className="text-[15px] font-semibold">
                Priority:
              </label>
              <select
                name={'priority'}
                id={'priority'}
                className={'rounded'}
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value))}
              >
                {priorityOptions.map((option, index) => (
                  <option value={option.value} key={index}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <label htmlFor="status" className="font-semibold">
                Status:
              </label>
              <select
                name={'status'}
                id={'status'}
                className={'rounded'}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {Status.map((state, index) => (
                  <option
                    value={state.value}
                    key={index}
                    className="text-[15px]"
                  >
                    {state.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="my-2 flex items-center justify-center gap-5">
          <button className="submit-btn">Submit</button>
          <button
            type="button"
            onClick={handleReset}
            className="submit-btn !bg-blue-500"
          >
            reset
          </button>
        </div>
      </form>
    </>
  );
}

export default EditTask;
