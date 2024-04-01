import { ChangeEvent, memo, useEffect, useState } from 'react';
import { TSelectInput } from '../lib/types/types';

const SelectInput = memo(function ({
  className,
  title,
  options,
  name,
  cb,
}: TSelectInput) {
  const [value, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    cb(value);
  }, [value, cb]);

  return (
    <>
      <select
        name={name}
        id={name}
        className={className}
        onChange={handleChange}
        value={value}
      >
        <option value={''}>{title}</option>
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.title}
          </option>
        ))}
      </select>
    </>
  );
});
export default SelectInput;
