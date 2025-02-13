import { NumberInput } from '@mantine/core';
import { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { setBudget , setBalance} from '../../features/expenseSlice';

function InputField({submitBudget }) {
   const dispatch = useDispatch() 
   const budget = useSelector(state => state.expense.balance.monthlyBalance) || 0 // default Balance
   const [value, setValue] = useState(budget);
  console.log(submitBudget)
   if(submitBudget){
    dispatch(setBudget(value))
    dispatch(setBalance())
   }
   
  
  
   

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