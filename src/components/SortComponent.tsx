import { memo } from 'react';
import SelectInput from './SelectInput';
import useDataContext from '../hooks/useDataContext';
import { sortingOptions } from '../constants';

const SortComponent = memo(function () {
  // @ts-expect-error idk
  const { setSortOption } = useDataContext();
  return (
    <>
      <h2 className="text-[1.2rem] font-semibold">Sort by:</h2>
      <SelectInput
        className="rounded pr-5"
        name="sort"
        title="Priority"
        options={sortingOptions}
        cb={setSortOption}
      />
    </>
  );
});
export default SortComponent;
