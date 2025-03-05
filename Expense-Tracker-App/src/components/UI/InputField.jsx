import { NumberInput } from '@mantine/core';
import { useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { setBudget , setBalance} from '../../features/expenseSlice';

function InputField({submitBudget , isInputOn }) {
   const dispatch = useDispatch() 
   const monthlyBudget = useSelector(state=> state.expense.budget.monthlyBudget)
   const [value, setValue] = useState(monthlyBudget || 0);
   if(submitBudget){
    dispatch(setBudget(value))
    dispatch(setBalance())
   }
   
  
  
   

  return (
    <NumberInput
    className={`font-semibold text-2xl transition transform ease-in-out ${isInputOn? "" : "hidden"}`}
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