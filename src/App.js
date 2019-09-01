import React, {Component} from 'react';
import {createStore, combineReducers } from 'redux';
import uuid                            from 'uuid'; 

const addExpense = ({description='',note='', amount=0, createdAt=0})=>(
 {
   type:'ADD_EXPENSE',
   expense : {
        id : uuid(),
        description,
        note,
        amount,
        createdAt
   }

 }

);

const removeExpense = ({id} = {})=>(
    {
      type : 'REMOVE_EXPENSE',
      id
    }
   
);

const sortByText =({text= ''})=>({
    type : 'SORT_BY_DATE',
    text 
});

const sortByDate =()=>({
    type : 'SORT_BY_DATE' 
});

const sortByAmount =()=>({
    type : 'SORT_BY_AMOUNT' 
});

const expenseReducerDefaultState = [];

const expenseReducer = ((state=expenseReducerDefaultState , action)=>{
     switch(action.type){
          case 'ADD_EXPENSE' :
                return[
                        ...state,
                        action.expense    
                ];     
          case 'REMOVE_EXPENSE' :
                        return  state.filter(({id} ) => id !== action.id);    
           
          default:
               return state; 
     }
});

const filterReducerDefaultState = {
      text :'',
      sortBy:'',
      startDate : undefined,
      endDate :  undefined
};

 const filterReducer = ((state=filterReducerDefaultState , action)=>{
     switch(action.type){
          case "SET_TEXT_FILTER" :
            return{
                filters : {
                     ...state,
                     text : action.text   
                }   
             } 
             case "SORT_BY_DATE" :
            return{
                filters : {
                     ...state.filters   
                }   
             } 

       default:
          return state; 
      }
 });

const store = createStore(
     combineReducers({
        expenses : expenseReducer,
        filters  : filterReducer
     })
);



//const r1 = store.dispatch(removeExpense({id : e2.expense.id}))

const demoState ={
      expenses:[{
      }],
      filters:{
          text :'rent',
          sortBy:'amount',
          startDate : undefined,
          endDate :  undefined
      }
}

store.subscribe(()=>{
    console.log(store.getState());
});




class App extends Component {

    handleAddExpense=()=>{
       console.log("Add Expense");
       store.dispatch(addExpense(
                {
                    description :'January-2019 Electric Bill Paid for Software House',
                    note :'Electricity Bill Paid', 
                    amount:1500, 
                    createdAt:0
                }
       ));

       console.log(store.getState());  

    }

    handleDeleteExpense=()=>{
          console.log("Delete Expense");
          store.dispatch(removeExpense({id:'1234587a'}))
    }

    handleListExpense=()=>{
        console.log(store.getState());
    }

    handleEditExpense=()=>{
        console.log("Edit Expense");
    }

    render() { 
        
    return ( 
     <div>
        <div>
            <button className='btn btn-primary m-4' onClick={this.handleAddExpense}>Add Expense</button>
            <button className='btn btn-primary m-4' onClick={this.handleDeleteExpense}>Delete Expense</button>
            <button className='btn btn-primary m-4' onClick={this.handleEditExpense}>Edit Expense</button>
            <button className='btn btn-primary m-4' onClick={this.handleDeleteExpense}>Delete Expense</button>
        </div>
     </div>   
     );
  }
}

export default App;  