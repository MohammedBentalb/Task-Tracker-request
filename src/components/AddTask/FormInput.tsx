import { memo } from 'react';
import { TFormInput } from '../../lib/types/types';

const FormInput = memo(function ({
  register,
  title,
  value,
  className,
  name,
}: TFormInput) {
  return (
    <label htmlFor="title" className={className}>
      <div>
        <span>{title}:</span>
      </div>

      {value ? (
        <input id={name} value={value} disabled />
      ) : (
        <input id={name} {...register(name, { required: 'required' })} />
      )}
    </label>
  );
});

export default FormInput;
