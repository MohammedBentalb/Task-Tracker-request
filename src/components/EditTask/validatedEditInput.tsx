import { memo } from 'react';
import { TEditInput } from '../../lib/types/types';

const ValidatedEditInput = memo(function ({
  title,
  value,
  className,
  name,
}: TEditInput) {
  return (
    <label htmlFor="title" className={className}>
      <div>
        <span>{title}:</span>
      </div>
      <input id={name} value={value} disabled className='w-full p-1'/>
    </label>
  );
});

export default ValidatedEditInput;
