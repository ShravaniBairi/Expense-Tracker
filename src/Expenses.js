import React , {useState, useEffect} from 'react';
import ExpenseSlider from './ExpenseSlider';
import Modal from './Modal';
import PieChartComponent from './Components/PieChartComponent';
import './App.css';

const Expenses = () => {

    const [title, setTitle] = useState()
    const [amount, setAmount] = useState()
    const [date, setDate] = useState()
    const [category, setCategory] = useState()
    const [walletBalance, setWalletBalance] = useState(5000)
    const [expenseAmount, setExpenseAmount] = useState(0)
    const [localExpensesList, setLocalExpensesList] = useState()
    const [expensesList, setExpensesList] = useState([])

    const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
    const [isAddExpensesOpen, setIsAddExpensesOpen] = useState(false)
    const [walletInput, setWalletInput] = useState()
    const [aggregatedData, setAggregatedData] = useState([])

    function addExpenseList(expense){
        
        //expensesList.push(expense)
        if(walletBalance - expense?.amount > 0){
            segregateData(expense)
        setExpensesList([...expensesList, expense])
       //setLocalExpensesList([...localExpensesList, expense])
        setWalletBalance(walletBalance - expense?.amount)
        setExpenseAmount(expenseAmount + +expense?.amount)
        }
        else{
            window.alert("Your balance is not sufficient to do add this expense")
        }
        }

    useEffect(() => {
        const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
        const storedWalletBalance = parseFloat(localStorage.getItem("walletBalance")) || 5000;
        const storedExpenseAmount = parseFloat(localStorage.getItem("expenseAmount")) || 0;

        setExpensesList(storedExpenses);
        setWalletBalance(storedWalletBalance);
        setExpenseAmount(storedExpenseAmount);
        segregateData(storedExpenses);
    }, []);


    useEffect(() => {
        localStorage.setItem("expenses", JSON.stringify(expensesList))
        localStorage.setItem("walletBalance", walletBalance)
        localStorage.setItem("expenseAmount", expenseAmount)
        segregateData(expensesList)
       
    }, [expensesList, walletBalance, expenseAmount])

    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("expenses"));
        segregateData(expensesList)
        if(Object?.keys(data)?.length > 0){
            setLocalExpensesList(data);
            
            
        }
        
    }, [expensesList])

    const handleSubmitExpense =(e) =>{
        e.preventDefault()
       
        const newExpense = { title: title,
              amount: parseFloat(amount),
              date: date,
              category : category
            }
        addExpenseList(newExpense)
        setAmount('')
        setTitle('')
        setDate('')
        setCategory('')
        setIsAddExpensesOpen(false)
    }

    function handleSubmitWallet(e){
        e.preventDefault()
        const data= parseFloat(walletInput)
        const updatedWalletBalance = walletBalance + data
        setWalletBalance(updatedWalletBalance)
        setIsWalletModalOpen(false)
        setWalletInput('')

    }

    
    function updateExpenseList(updatedExpenseList, editedAmount, deletedAmount){
            segregateData(updatedExpenseList)
        
            if(walletBalance - editedAmount <= 0){
                window.alert("Your balance is not sufficient to do add this expense")
            }
            else if(editedAmount === 0) {
                setExpensesList(updatedExpenseList);
            setLocalExpensesList(updatedExpenseList);
                setWalletBalance(walletBalance + deletedAmount)
            setExpenseAmount(expenseAmount - deletedAmount)
            }
            else if(deletedAmount === 0){
                setExpensesList(updatedExpenseList);
            setLocalExpensesList(updatedExpenseList);
            setWalletBalance(walletBalance - editedAmount)
            setExpenseAmount(expenseAmount + editedAmount)
    }
    
        }
    
    const addWalletBalance =() => {
        setIsWalletModalOpen(true)
    }
    function addExpensesAmount(){
        setIsAddExpensesOpen(true)
    }

    function segregateData(data){
        if(data?.length > 0){
            
        const SegregatedData = data.reduce((acc, item) => {
            if (acc[item?.category]) {
                acc[item?.category] += item?.amount;
            }
            else{
                acc[item?.category] = item?.amount;
            }
            return acc;
        }, {})
        
        setAggregatedData(SegregatedData);
    }
    else{
        setAggregatedData([])

    }
    

    }

    return(
        <div>
        <div className="expenseTracker">
        <h1>Expense Tracker App</h1>
        <div className="container">
            <div className="walletBalance"> 
                <h2>Wallet Balance: <span className='walletValue' id="walletBalance">{walletBalance}</span></h2>
                <button className='WalletButton' onClick={addWalletBalance}>Add WalletBalance</button>
            </div>
            <div className="expenseAmount">
                <h2>Expense Amount: <span className="expenseValue" id="expenseAmount">{expenseAmount}</span></h2>
                <button className="ExpenseButton" onClick={addExpensesAmount}>Add Expenses</button>
            </div>
            <div className="pieChart">
            <PieChartComponent data={aggregatedData} />
            </div>
        </div>
    </div>
        
       <div >
        <Modal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)}>
                <form onSubmit={handleSubmitWallet}>
                    <input
                        type="number"
                        placeholder="Add Wallet Amount"
                        value={walletInput}
                        onChange={(e) => setWalletInput(e.target.value)}
                        required
                    />
                    <button type="submit">Submit</button>
                    <button type='button' onClick={()=> setIsWalletModalOpen(false)}>Close</button>
                </form>
            </Modal>

       
        <Modal  isOpen={isAddExpensesOpen} onClose={()=> setIsAddExpensesOpen(false)} >
        
            <form  onSubmit={handleSubmitExpense}>
                <div className="EditBlock"> 
                <input type="text" placeholder='Add Expense title' name= "title" value= {title} onChange={(e)=>{setTitle(e.target.value)}} required/>
                <input type="number" placeholder='Add Expense Amount' name= "amount"  onChange={(e)=>{setAmount(e.target.value)}} value= {amount} required/>
                <input type="date" placeholder='Add Expense Date' name= "date"  onChange={(e)=>{setDate(e.target.value)}} value= {date} required/>
                <input type="text" placeholder='category' name= "category" onChange={(e)=>{setCategory(e.target.value)}} value= {category} required/>
                <button type='submit'>Submit</button>
                <button type='button' onClick={()=> setIsAddExpensesOpen(false)}>Close</button>
                </div>


            </form>
            </Modal>
            </div>
            

            
            <ExpenseSlider  aggregatedData={aggregatedData} localExpenseList = {localExpensesList}  updateExpenseList= {updateExpenseList} />
            
            <div>

        </div>

        </div>
    )
}

export default Expenses