import { memo, useState } from 'react';
import AddTask from './AddTask/AddTask';

const AddButton = memo(function ({
  mobile = false,
  className = '',
}: {
  mobile?: boolean;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        className={`h-7 whitespace-nowrap rounded bg-blue-600 px-10 text-[15px] ${className} capitalize text-white hover:bg-blue-300 ${mobile ? 'md:hidden' : 'max-md:hidden'} `}
        onClick={() => setIsOpen(true)}
      >
        add new Task
      </button>

      {isOpen && <AddTask setIsOpen={setIsOpen}  />}
    </>
  );
});

export default AddButton;
