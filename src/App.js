import React, { Component } from 'react';
import './App.css';
import LiveUpdate from './LiveUpdate';
import AddBudgetForm from './AddBudgetForm';
// import IncomeTable from './IncomeTable';
// import ExpenseTable from './ExpenseTable';
import Table from './Table';
// import {arraySorter} from './helper';

//LATER: wrap in <BrowserRouter>, then put <Route path="" component={}></Route> around inside components, and put <Link to="/"> in the other files


class App extends Component {

  state = {
    items: [],
    netTotal: 0,
    moneyType: 'income',
    sortedAscending: false,
    sortedDescending: false,
  }

  addBudgetItem = newItem => {
    this.setState((prevState)=> {
      return {
        items: [...prevState.items, newItem],
        netTotal: newItem.moneyType === 'income' ? prevState.netTotal + newItem.amount : prevState.netTotal - newItem.amount,
      }
    });
  }

  toggleMoneyType = e => {
    // console.log('toggleMoneyType event: ', e.target.value);
    this.setState({
        moneyType: e.target.value,
    })
  }

  toggleSortType = sortedItems => {
    // console.log('sortType from toggleSortType: ', sortType);
    console.log('hit toggleSortType in app.js');
    // const {sortedAscending, sortedDescending} = this.state;
    // let setSortType = (sortType === 'sortedAscending') ? : ;
    // this.setState({items: sortedItems});
  }


  //generalize .desc part also, to allow for amounts
  sortTable = (arr, sortType) => {
    let copy = arr.slice();
    const sorted = copy.sort((a,b) => {
      if(sortType === 'ascending') {
        return a.desc < b.desc ? -1 : 1;
      } else if(sortType === 'descending') {
        return a.desc < b.desc ? 1 : -1;
      }
    });

    //setState here???
    //or toggle sorted state here via function in Table?
  }


  editItem = (e) => {
    console.log('hit editItem, evt: ', e);
    //check item's editing property; if false, toggle to true
    //open up input and submit button in the view
    //placeholder text should be the budget item's text property
    //locate this by grabbing event's id or index, searching array for object with that id/idx
    //then fire handleSubmit after this; 
  }


  render() {

    const {moneyType, netTotal} = this.state;
    let {items} = this.state;

    const incomeDisplay = items.some(item => item.moneyType === 'income') ? (
      <Table 
        sortTable={this.sortTable} 
        items={items}
        moneyType='income'
        toggleSortType={this.toggleSortType} 
      />
    ) : null;

    const expenseDisplay = items.some(item => item.moneyType === 'expense') ? (
      <Table 
        sortTable={this.sortTable} 
        items={items}
        moneyType='expense'
        toggleSortType={this.toggleSortType} 
      />
    ): null;

    return (
      <div className="App">
        <LiveUpdate 
          items={items}
          netTotal={netTotal}
        />
        <AddBudgetForm 
          addBudgetItem={this.addBudgetItem}
          toggleMoneyType={this.toggleMoneyType}
          moneyType = {moneyType}
        />
        <div className="table-container">
          {incomeDisplay}
          {expenseDisplay}
        </div>
      </div>
    );
  }
}

export default App;
