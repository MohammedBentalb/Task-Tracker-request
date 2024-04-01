import { memo, useEffect, useRef, useState } from 'react';
import { dots } from '../assets/icons';
import useDataContext from '../hooks/useDataContext';

const Settings = memo(function ({ taskId }: { taskId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const closeSettings = useRef<null | HTMLButtonElement>(null);
  // @ts-expect-error idk
  const { setTaskId, setIsDeleteOpen, setIsEditOpen } = useDataContext();

  const handleDeleteProcess = () => {
    setTaskId(taskId);
    setIsDeleteOpen(true);
  };

  const handleEditProcess = () => {
    setTaskId(taskId);
    setIsEditOpen(true);
  };
  useEffect(() => {
    const handleClose = (e: MouseEvent) => {
      if (
        closeSettings.current &&
        !closeSettings.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener('click', handleClose);
    return () => document.addEventListener('click', handleClose);
  });
  return (
    <>
      <div
        className={`${isOpen ? 'fixed' : 'hidden'} inset-0 bg-black/20`}
      ></div>

      <div className="relative">
        <button
          className="rounded bg-blue-600 p-1 hover:bg-blue-300"
          onClick={() => setIsOpen((prev) => !prev)}
          ref={closeSettings}
        >
          <img src={dots} alt="dots" className="dots w-4 select-none" />
        </button>
        <div
          className={`${isOpen ? 'absolute' : 'hidden'} -right-full z-40 flex flex-col rounded bg-gray-300 p-1`}
        >
          <button
            className=" rounded pl-1 pr-10 text-left hover:bg-gray-400"
            onClick={handleEditProcess}
          >
            Edit
          </button>
          <hr className="border-white" />
          <button
            className=" rounded pl-1 pr-10 text-left hover:bg-gray-400"
            onClick={handleDeleteProcess}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
});

export default Settings;
