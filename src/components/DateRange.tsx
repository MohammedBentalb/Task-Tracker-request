import { addDays, format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
//  @ts-expect-error just meh
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useDataContext from '../hooks/useDataContext';

type itemProp = {
  selection: { startDate: Date; key: string; endDate: Date; startDay: Date };
};

function DateRangeComp() {
  const [open, setOpen] = useState(false);
  // @ts-expect-error idk
  const { setDateOptions } = useDataContext();
  const refOne = useRef<null | HTMLDivElement>(null);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 4),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    document.addEventListener('click', handleClose);
    return () => {
      document.removeEventListener('click', handleClose);
    };
  }, []);

  useEffect(() => {
    setDateOptions({
      startDate: range[0].startDate,
      endDate: range[0].endDate,
    });
  }, [range, setDateOptions]);

  const handleClose = (e: Event) => {
    if (refOne.current && !refOne.current.contains(e.target as Node))
      setOpen(false);
  };

  return (
    <div className="relative" ref={refOne}>
      <input
        value={`${format(range[0]?.startDate, 'dd/MM/yy')} to ${format(range[0].endDate, 'dd/MM/yy')}`}
        readOnly
        onClick={() => setOpen((open) => !open)}
        className="h-7 rounded text-center max-sm:hidden"
      />
      <input
        value={`${format(range[0]?.startDate, 'dd/MM')} to ${format(range[0].endDate, 'dd/MM')}`}
        readOnly
        onClick={() => setOpen((open) => !open)}
        className="input-S-F h-7 rounded text-center sm:hidden"
      />
      <div>
        {open && (
          <DateRange
            onChange={(item: itemProp) => {
              setRange([item.selection]);
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={1}
            direction="horizontal"
            className="absolute -right-1/2 top-10 z-40 max-sm:right-[-115%] max-sm:top-[-10px] max-sm:scale-[.8]"
          />
        )}
      </div>
    </div>
  );
}

export default DateRangeComp;
