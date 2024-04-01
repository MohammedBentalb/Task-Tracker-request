import { UseFormRegister } from 'react-hook-form';

export type TData = {
  id: string;
  status: string;
  title: string;
  desc: string;
  priority: number;
  assignee: string;
  date: Date;
  team: string;
};

export type TSelectInput = {
  className: string;
  title: string;
  options: {
    value: string | number;
    title: string;
  }[];
  name: string;
  cb: (value: number | string) => void;
};

export type TAssigneeName = {
  title: string;
  value: string;
};

export type TAddTask = {
  id: string;
  title: string;
  desc: string;
  team?: string;
  priority: number;
  status: string;
  assignee: string;
};

export type TEditTask = {
  status: string;
  priority: number;
};

export type TValidatedSelect = {
  className: string;
  options: {
    value: string | number;
    title: string;
  }[];
  register: UseFormRegister<TAddTask>;
};

export type TFormInput = {
  register: UseFormRegister<TAddTask>;
  name: 'title' | 'desc' | 'team' | 'assignee';
  title: string;
  value: string;
  className: string;
};

export type TEditInput = {
  name: string;
  className: string;
  title: string;
  value: string;
};
