import AddButton from './components/AddButton';
import DeleteTask from './components/DeleteTask/DeleteTask';
import EditTask from './components/EditTask/EditTask';
import FilterBar from './components/FilterBar';
import Navbar from './components/Navbar';
import SortComponent from './components/SortComponent';
import TaskHolder from './components/TaskHolder';
import useDataContext from './hooks/useDataContext';
import { dataSpreader } from './lib/functions/dataSpreader';

function App() {
  // @ts-expect-error no idea why type error
  const { filtered: data, isDeleteOpen, isEditOpen } = useDataContext();
  const categories = dataSpreader(data);

  return (
    <>
      <Navbar />
      <section className="max-width shadow-over rounded-3xl border-2 border-white p-5">
        <div className="flex justify-between max-[480px]:justify-center">
          <FilterBar />
          <AddButton />
        </div>
        <AddButton
          mobile
          className="relative -right-1/2 mt-5 -translate-x-1/2"
        />
        <div className="mt-5 flex gap-7 max-[480px]:flex-col max-[480px]:items-center max-[450px]:gap-5">
          <SortComponent />
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-5">
          {Object.keys(categories).map((category, index) => {
            if (categories[category].length === 0) return null;
            return (
              <TaskHolder
                title={category === 'progress' ? 'in progress' : category}
                key={index}
                data={categories[category]}
              />
            );
          })}
        </div>
      </section>
      {isDeleteOpen && <DeleteTask />}
      {isEditOpen && <EditTask />}
    </>
  );
}

export default App;
