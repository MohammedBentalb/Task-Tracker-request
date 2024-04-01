import { TData } from '../types/types';

const dataSpreader = (data: TData[]) => {
  const categories: { [key: string]: TData[] } = {
    pending: [],
    progress: [],
    completed: [],
    deployed: [],
    deffered: [],
  };
  data.forEach((task) => {
    const status = task.status.toLowerCase();
    if (categories[status]) categories[status].push(task);
  });
  return categories;
};

export { dataSpreader };
