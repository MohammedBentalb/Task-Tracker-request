import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { TAssigneeName, TData } from '../lib/types/types';
import { PrevData } from '../constants';

type ContextProps = {
  filtered: TData[];
  assigneeNames: TAssigneeName[];
  taskId: string;
  isDeleteOpen: boolean;
  isEditOpen: boolean;
  setAssignee: (val: string) => void;
  setPriority: (val: string) => void;
  setSortOption: (val: string) => void;
  setDateOptions: (val: { startDate: Date; endDate: Date }) => void;
  addNewTask: (task: TData) => void;
  DeleteTask: (id: string) => void;
  setTaskId: (id: string) => void;
  setIsDeleteOpen: (val: boolean) => void;
  setIsEditOpen: (val: boolean) => void;
  findTask: (id: string) => TData | null;
  EditTask: (task: TData) => void;
};

export const DataContext = createContext<ContextProps>({
  filtered: [],
  assigneeNames: [],
  taskId: '',
  isDeleteOpen: false,
  isEditOpen: false,
  setAssignee: () => {},
  setPriority: () => {},
  setSortOption: () => {},
  setDateOptions: () => {},
  addNewTask: () => {},
  DeleteTask: () => {},
  setTaskId: () => {},
  setIsEditOpen: () => {},
  setIsDeleteOpen: () => {},
  findTask: () => null,
  EditTask: () => {},
});

const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(PrevData);

  const [assignee, setAssignee] = useState('');
  const [priority, setPriority] = useState('');
  const [assigneeNames, setAssigneeNames] = useState<TAssigneeName[]>([]);
  const [sortOption, setSortOption] = useState<string>('');
  const [dateOptions, setDateOptions] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [taskId, setTaskId] = useState('');
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  // adding new task
  const addNewTask = (task: TData) => {
    setData((prev) => [...prev, task]);
  };

  // finder
  const findTask = (id: string) => {
    return data.find((task) => task.id === id) || null;
  };

  // delete task
  const DeleteTask = (id: string) => {
    setData((prev) => {
      return prev.filter((task) => task.id !== id);
    });
  };

  // edit a task
  const EditTask = (task: TData) => {
    setData((prev) =>  prev.map(pr => pr.id === task.id ? task : pr ))
  };

  // filtering data
  const filtered = useMemo(() => {
    let result = [...data];
    if (
      Object.keys(dateOptions).length > 0 &&
      dateOptions.endDate &&
      dateOptions.startDate
    )
      result = result.filter((task) => {
        const taskDate = new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        const startDay = new Date(dateOptions.startDate);
        startDay.setHours(0, 0, 0, 0);
        const endDay = new Date(dateOptions.endDate);
        endDay.setHours(0, 0, 0, 0);
        return taskDate >= startDay && taskDate <= endDay;
      });
    if (assignee) result = result.filter((task) => task.assignee === assignee);
    if (priority)
      result = result.filter((task) => task.priority === parseInt(priority));
    if (sortOption) {
      result.sort((a, b) => {
        if (parseInt(sortOption) === 1) return a.priority - b.priority;
        if (parseInt(sortOption) === 0) return b.priority - a.priority;
        return 0;
      });
    }
    return result;
  }, [data, assignee, priority, sortOption, dateOptions]);

  // generating assignee names from the data present
  useEffect(() => {
    const namesSet = new Set();
    const assignees: TAssigneeName[] = [];
    data.forEach((task) => {
      if (namesSet.has(task.assignee)) return;
      namesSet.add(task.assignee);
      assignees.push({
        title: task.assignee,
        value: task.assignee,
      });
    });
    setAssigneeNames(assignees);
  }, [data]);

  return (
    <DataContext.Provider
      value={{
        filtered,
        setAssignee,
        setPriority,
        assigneeNames,
        setSortOption,
        setDateOptions,
        addNewTask,
        setTaskId,
        DeleteTask,
        isDeleteOpen,
        setIsDeleteOpen,
        taskId,
        findTask,
        setIsEditOpen,
        isEditOpen,
        EditTask
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
