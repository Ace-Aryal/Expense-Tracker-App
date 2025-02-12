import { NumberInput } from '@mantine/core';
import { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
function InputField({handle}) {
   const dispatch = useDispatch() 
   const [value, setValue] = useState<string | number>('');


  return (
    <NumberInput
    className='font-semibold text-2xl transition transform ease-in-out'
      label="Budget"
      placeholder="Input Monthly Budget"
      min="0"
      thousandSeparator=","
      prefix='$'
      value={value}
      onChange={setValue}
      
    />
  );
}

export default InputField