import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';

export default function useDataContext() {
  const context = useContext(DataContext);
  if (!context) return new Error('Data context outside of context');
  return context;
}
