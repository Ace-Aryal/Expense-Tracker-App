// lessons from the ExpenseList component:
// 1. never use hook inside loops and inner functions , always use them at the top level of the component
// 2. always plan and design the component before writing the code
// 3. always use the correct syntax for the redux toolkit , dont forget to export reducers in two places, impoer reducers
//  and always use dispatch to call the reducers
//  4. try to make the component reusable and use the props to pass the data
//  5. always provide key to the list items
//  6. dont rush, make diagrams take time to understand the flow of the data, and then start coding

import React, { useState } from "react";
import { setBalance, updateItems } from "../../features/expenseSlice";
import { categoryList } from "../../pages/Addexpenses";
import { deleteItem } from "../../features/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateTotal } from "../../features/expenseSlice";
import { handleDataDelete } from "../../features/chartDataSlice";
import { createDatasFromExpenseData } from "../../features/chartDataSlice";
function ExpenseList({ item, showAllData, index }) {
  const [isEditable, setIsEditable] = useState(false);
  const [updatedData, setUpdatedData] = useState(item);

  const chartdata = useSelector((state) => state.chartData.datas.monthData);
  const dispatch = useDispatch();

  function handleDelete(e) {
    const adjustAmount = 0 - item.amount;

    e.preventDefault();
    dispatch(deleteItem(item.id)); // all the delete is handled by redux reducers
    dispatch(
      updateTotal({ id: item.id, adjustAmount: adjustAmount, date: item.date })
    );
    dispatch(setBalance());
    dispatch(handleDataDelete({ id: item.id, deleteAmount: item.amount }));
    // dispatch(createDatasFromExpenseData(7));
    // dispatch(createDatasFromExpenseData(30));
  }

  function handleChange(e) {
    const attributeKey = e.target.name;

    setUpdatedData((prevdata) => {
      return {
        ...prevdata,
        [attributeKey]: e.target.value,
      };
    });
  }

  function handleUpdate() {
    setIsEditable(!isEditable);

    if (isEditable) {
      const adjustAmount = updatedData.amount - item.amount;

      dispatch(updateItems(updatedData));
      dispatch(
        updateTotal({
          id: item.id,
          adjustAmount: adjustAmount,
          date: item.date,
        })
      );
      dispatch(setBalance());
    }
    // updating chart after the amount is updated
    // dispatch(createDatasFromExpenseData(7));
    // dispatch(createDatasFromExpenseData(30));
  }

  if (!showAllData && index > 2) {
    return;
  }
  return (
    <>
      <input
        type="text"
        id="expense"
        name="expense"
        readOnly={!isEditable}
        onChange={handleChange}
        className={`input bg-[#5763ab]  text-[#fbe6e4] px-2 py-0.5 ${item.id} ${isEditable ? "outline-[1.5px] outline-indigo-950 rounded" : ""} `}
        value={updatedData.expense}
      />
      <input
        type="number"
        id="amount"
        name="amount"
        readOnly={!isEditable}
        onChange={handleChange}
        className={`input bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5 ${item.id} ${isEditable ? "outline-[1.5px] outline-indigo-950 rounded" : ""} 
        value={updatedData.expense}  `}
        value={updatedData.amount}
      />
      <select
        id="category"
        name="category"
        onChange={handleChange}
        disabled={!isEditable}
        className={`input ${item.id} ${isEditable ? "outline-[1.5px] outline-indigo-950 rounded" : "appearance-none"} bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5`}
      >
        {categoryList.map((category, index) => (
          <option
            key={index}
            value={category}
            selected={item.category === category}
          >
            {category}
          </option>
        ))}
      </select>
      <input
        type="date"
        id="date"
        name="date"
        readOnly={!isEditable}
        onChange={handleChange}
        className={`input bg-[#5763ab] text-[#fbe6e4] px-2 py-0.5 ${item.id} ${isEditable ? "outline-[1.5px] outline-indigo-950 rounded" : ""} 
        value={updatedData.expense} `}
        value={updatedData.date}
      />
      <button
        className="bg-cyan-500 px-2 py-0.5 hover:bg-indigo-300"
        onClick={(e) => {
          e.preventDefault();
          handleUpdate();
        }} // updates the data on save
      >
        <i
          className={
            isEditable ? "fa-solid fa-floppy-disk" : "fa-solid fa-pen-to-square"
          }
        ></i>
      </button>
      <button
        type="submit"
        className="bg-red-500 px-2 py-0.5 hover:bg-orange-500"
        onClick={(e) => {
          e.preventDefault();
          handleDelete(e);
        }}
      >
        <i class="fa-solid fa-trash-can"></i>
      </button>
    </>
  );
}

export default ExpenseList;
