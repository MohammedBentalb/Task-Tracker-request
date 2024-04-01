import { memo } from 'react';
import { priorityOptions } from '../constants';
import useDataContext from '../hooks/useDataContext';
import DateRangeComp from './DateRange';
import SelectInput from './SelectInput';

const FilterBar = memo(function () {
  // @ts-expect-error idk
  const { setPriority, assigneeNames, setAssignee } = useDataContext();

  return (
    <div className="flex justify-center gap-5 max-[820px]:flex-col ">
      <h2 className="whitespace-nowrap text-[1.2rem] font-semibold max-[480px]:text-center">
        Filter by:
      </h2>
      <div className="flex gap-5 max-[480px]:flex-col">
        <SelectInput
          className="input-S-F rounded pr-5"
          name="assignee name"
          title="Assignee name"
          options={assigneeNames}
          cb={setAssignee}
        />
        <SelectInput
          className="input-S-F rounded pr-5"
          name="priority"
          title="Priority"
          options={priorityOptions}
          cb={setPriority}
        />
        <DateRangeComp />
      </div>
    </div>
  );
});

export default FilterBar;
