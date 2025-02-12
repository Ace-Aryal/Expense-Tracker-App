import { NumberInput } from '@mantine/core';
import { useState } from 'react';

function InputField() {
    

  return (
    <NumberInput
    className='font-semibold text-2xl transition transform ease-in-out'
      label="Budget"
      placeholder="Input Monthly Budget"
      min="0"
      thousandSeparator=","
      prefix='$'
      
    />
  );
}

export default InputField