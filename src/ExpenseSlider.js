import React, {useState} from "react";

import Modal from './Modal';
import BarChartComponent from "./Components/BarChartComponent";
import "./ExpenseSlider.css"

const ExpenseSlider = ({localExpenseList, updateExpenseList, aggregatedData}) => {

    
    const [isEditExpensesOpen, setIsEditExpensesOpen] = useState(false);
    const [editIndex, setEditindex] = useState()
    const [newTitle, setNewTitle] = useState()
    const [newAmount, setNewAmount] = useState()
    const [newDate, setNewDate] = useState()
    const [newCategory, setNewCategory] = useState()


    
   

   function handleEditClick(index){
    const ExpenseToEdit= Object?.values(localExpenseList)
    setNewTitle(ExpenseToEdit[index]?.title)
    setNewAmount(ExpenseToEdit[index]?.amount)
    setNewDate(ExpenseToEdit[index]?.date)
    setNewCategory(ExpenseToEdit[index]?.category)
    setEditindex(index);
    setIsEditExpensesOpen(true)
   }

    function editExpenseSubmit(e){
        e.preventDefault()
       
        const newExpense = { title: newTitle,
              amount: parseFloat(newAmount),
              date: newDate,
              category : newCategory
            }
            addEditedExpenseList(newExpense)
            setNewAmount('')
            setNewTitle('')
            setNewDate('')
            setNewCategory('')
            setIsEditExpensesOpen(false)

    }
   
   function addEditedExpenseList(editedExpense)
   {
    if (editedExpense?.title !== null & editedExpense?.category !== null & editedExpense?.date !== null & editedExpense?.amount !== null) {
        const old = Object.values(localExpenseList)
        const oldAmount = parseFloat(old[editIndex]?.amount)
        const editedAmount = parseFloat(editedExpense?.amount)-oldAmount;
        console.log("editedAmount", parseFloat(editedAmount))
        const deletedAmount = 0
        
        const updatedExpenses = Object.values(localExpenseList).map((expense, idx) =>
            idx === editIndex ? { ...expense, title: editedExpense?.title, amount: editedExpense?.amount, date: editedExpense?.date, category: editedExpense?.category } : expense
          );
          console.log("updated expense", updatedExpenses)
          localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
          updateExpenseList(updatedExpenses, editedAmount, deletedAmount)
          
          

       
    }

   }

    
    

   
   
   function handleDeleteClick(index){
    const editedAmount = 0;
    const old = Object?.values(localExpenseList)
    const deletedAmount = parseFloat(old[index]?.amount)

    const updatedExpenses = Object?.values(localExpenseList)?.filter((element, idx) => index!== idx) 
    console.log("updated expense", updatedExpenses)
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses))
    updateExpenseList(updatedExpenses, editedAmount, deletedAmount )
    localExpenseList = updatedExpenses
          console.log("updated lEL", localExpenseList )
          


   }
 
   
   if(!localExpenseList)  return ( <div> </div> ) 
    else return  (
        <div>
            
        <div className="expense-tracker-app">
        
        <div className="content-container">
            
                
                <Modal isOpen={isEditExpensesOpen} onClose={() => setIsEditExpensesOpen(false)}>
                                    <form className="EditBlock" onSubmit={editExpenseSubmit}>
                                        <input
                                            type="text"
                                            placeholder="Add Expense title"
                                            name="title"
                                            value={newTitle}
                                            onChange={(e) => setNewTitle(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="number"
                                            placeholder="Add Expense Amount"
                                            name="amount"
                                            value={newAmount}
                                            onChange={(e) => setNewAmount(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="date"
                                            placeholder="Add Expense Date"
                                            name="date"
                                            value={newDate}
                                            onChange={(e) => setNewDate(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="category"
                                            name="category"
                                            value={newCategory}
                                            onChange={(e) => setNewCategory(e.target.value)}
                                            required
                                        />
                                        <button type="submit">Submit</button>
                                        <button type="button" onClick={() => setIsEditExpensesOpen(false)}>Close</button>
                                    </form>
                </Modal>
        <div className="expenseList">
            <h1>Recent Transcations</h1>
            <ul className="expense-list">
                {Object.values(localExpenseList).map((eachExpense, index) => (
                    <li key={index} className="expense-item">
                        <div className="expense-sublist3">
                            <div className="expense-sublist2">
                        <div >{eachExpense?.title}</div>
                        <div>{eachExpense?.date}</div>
                        </div>
                        <div>{eachExpense?.category}</div>
                        </div>
                        <div className="expense-sublist3">
                        <div>{eachExpense?.amount}$</div>
                        <div className="expense-sublist3">
                        <button className="edit-button" onClick={() => handleEditClick(index)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDeleteClick(index)}>Delete</button>
                        </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
                
                <BarChartComponent className="bar-chart-component" data={aggregatedData} />
            </div>
        </div>
            

        </div>
    )
}

export default ExpenseSlider