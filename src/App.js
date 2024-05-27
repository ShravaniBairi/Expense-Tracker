import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';


function App() {

  const [data, setData] = useState({
    title : '',
    date:'',
    amount:''
  })

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getData("expenses")
    return savedExpenses ? JSON.parse(savedExpenses) : []
  })

  const [totalAmount, setTotalAmount] = useState(5000)
 
  localStorage.setItem('totalAmount', totalAmount)


  const handleSubmit = (e) => {

    const { name, value} = e.target

    setData((previousState) => ({
      ...previousState,
      [name] : value
    }))

    

  }




  const handleSave = (e) => {

    e.preventDefault()
    localStorage.setItem(data.title, JSON.stringify(data))
   
    
  }
  

  
   
  

  



  return (
    <div className="App">
      <form onSubmit={handleSave} >
      <input type="text" name='title' value= {data.title} placeholder='Add expense type' onChange={handleSubmit} required/>
      <input type="date" name='date' value = {data.date} placeholder ='select Date' onChange={handleSubmit} required/> 
      <input type="number" name='amount' value = {data.amount} placeholder ='Enter Amount' onChange={handleSubmit} required/>
      <input type='submit' ></input>

      </form>


      
    </div>
  );
}

export default App;
