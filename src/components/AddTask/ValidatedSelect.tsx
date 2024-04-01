import { memo } from 'react';
import { TValidatedSelect } from '../../lib/types/types';

const ValidatedSelect = memo(function ({
  className,
  options,
  register,
}: TValidatedSelect) {
  return (
    <>
      <select
        id={'priority'}
        className={className}
        {...register('priority', { required: 'required' })}
      >
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.title}
          </option>
        ))}
      </select>
    </>
  );
});
export default ValidatedSelect;
