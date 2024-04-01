import { useForm } from 'react-hook-form';
import FormInput from './FormInput';
import { TAddTask } from '../../lib/types/types';
import { close } from '../../assets/icons';
import { priorityOptions } from '../../constants';
import ValidatedSelect from './ValidatedSelect';
import { memo, useEffect, useRef } from 'react';
import useDataContext from '../../hooks/useDataContext';
// @ts-expect-error idk
import { v4 as uuidv4 } from 'uuid';

const AddTask = memo(function ({
  setIsOpen,
}: {
  setIsOpen: (val: boolean) => void;
}) {
  // @ts-expect-error idk
  const { addNewTask } = useDataContext();
  const refOne = useRef<HTMLDivElement>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TAddTask>();

  const onSubmit = (e: TAddTask) => {
    addNewTask({
      id: uuidv4(),
      title: e.title,
      assignee: e.assignee,
      desc: e.desc,
      priority: parseInt(e.priority.toString()),
      status: 'pending',
      date: new Date(),
    });
    console.log({
      id: uuidv4(),
      title: e.title,
      assignee: e.assignee.toLowerCase(),
      priority: e.priority,
      status: 'pending',
      date: new Date(),
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClose = (e: Event) => {
      if (refOne.current && refOne.current.contains(e.target as Node))
        setIsOpen(false);
    };
    document.addEventListener('click', handleClose);
    return () => document.addEventListener('click', handleClose);
  });

  return (
    <>
      <div ref={refOne} className="fixed inset-0 bg-black/20"></div>
      <div className="adjustable-w absolute right-1/2 top-20 z-50 flex w-full max-w-[335px] translate-x-1/2 flex-col bg-white">
        <div className="flex items-center justify-between px-5 py-1">
          <h1 className="text-[1.2rem] font-semibold uppercase">Create Task</h1>
          <img
            role="button"
            src={close}
            alt="close button"
            className="w-5"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <form
          action="POST"
          className="gradient-bg flex flex-col gap-3 px-5 py-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="error-form">
            {errors.title && errors.title.message?.toString()}
          </p>
          <FormInput
            register={register}
            name={'title'}
            title={'Title'}
            value={''}
            className={'create-inputs'}
          />
          <p className="error-form ">
            {errors.desc && errors.desc.message?.toString()}
          </p>
          <div className=" flex items-start">
            <label htmlFor="desc">Description:</label>
            <textarea
              className="text-area"
              id="desc"
              {...register('desc', {
                required: 'required',
                min: { message: 'more letters', value: 10 },
              })}
            />
          </div>
          <p className="error-form ">
            {errors.team && errors.team.message?.toString()}
          </p>
          <FormInput
            register={register}
            name={'team'}
            title={'team'}
            value={''}
            className={'create-inputs'}
          />
          <p className="error-form ">
            {errors.assignee && errors.assignee.message?.toString()}
          </p>
          <FormInput
            register={register}
            name={'assignee'}
            title={'Assignee'}
            value={''}
            className={'create-inputs'}
          />
          <div className="flex gap-11">
            <label htmlFor="priority" className="font-semibold">
              Priority:
            </label>
            <ValidatedSelect
              options={priorityOptions}
              className="rounded border border-black bg-gray-300 pr-1"
              register={register}
            />
          </div>
          <input type="submit" value={'submit'} className="submit-btn" />
        </form>
      </div>
    </>
  );
});

export default AddTask;
