import React, { Component } from 'react';
import './App.css';
import LiveUpdate from './LiveUpdate';
import AddBudgetForm from './AddBudgetForm';
// import IncomeTable from './IncomeTable';
// import ExpenseTable from './ExpenseTable';
import Table from './Table';
// import DivTable from './DivTable';
// import {arraySorter} from './helper';

//LATER: wrap in <BrowserRouter>, then put <Route path="" component={}></Route> around inside components, and put <Link to="/"> in the other files


class App extends Component {

  state = {
    items: [],
    netTotal: 0,
    moneyType: 'income',
    sortedAscending: false,
    sortedDescending: false,
    textToUpdate: '',
    amountToUpdate: '',
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


  onEditClick = idx => {
    const {items} = this.state;
    console.log('hit editItem, evt: ', idx);
    const itemToEdit = items[idx];
    const textToUpdate = itemToEdit.desc;
    const amountToUpdate = itemToEdit.amount;
    //check item's editing property; if false, toggle to true
    itemToEdit.editing = (itemToEdit.editing === true) ? false : true;
    //put this editableItem back in items


    this.setState({
      items: [...items.slice(0,idx), itemToEdit, items.slice(idx+1)],
      textToUpdate,
      amountToUpdate,
    });
    //open up EditItem input and submit button in the view
    //placeholder text should be the budget item's text property
    //locate this by grabbing event's id or index, searching array for object with that id/idx
    //then fire handleSubmit after this; 
  }

  handleUpdate = (updates, idx) => {
    console.log('hit handleUpdate');
    console.log('handleUpdate idx: ', updates);
    const {items} = this.state;
    let updatedItem = items[idx];
    //put updates in items
    let start = items.slice(0,idx);
    let end = items.slice(idx+1);
    const updatedItems = [...start, updatedItem, ...end];
    this.setState({items: updatedItems});
  }
  
  handleUpdateFields = ({amountToUpdate = '', descToUpdate = '', idxToUpdate = null} = {}) => {
    // console.log('updates from App: ', updates);
    const {items} = this.state;
    let start = items.slice(0, idxToUpdate);
    let end = items.slice(idxToUpdate + 1);
    let updatedItem = {
      ...items[idxToUpdate],
      amount: amountToUpdate,
      descToUpdate: descToUpdate,
      editing: false,
    };

    console.log('updatedItem: ', updatedItem);

    let updatedItems = [...start, updatedItem, ...end];

    this.setState({
      items: updatedItems,
    });


  }

  onDeleteClick = idx => {
    const {items} = this.state;
    let removeIndex = idx;
    let first = items.slice(0,removeIndex);
    let second = items.slice(removeIndex + 1);
    let updatedItems = [...first, ...second];
    this.setState({items: updatedItems});
  }


  render() {

    const {moneyType, netTotal, textToUpdate, amountToUpdate} = this.state;
    let {items} = this.state;

    const incomeDisplay = items.some(item => item.moneyType === 'income') ? (
      <Table 
        sortTable={this.sortTable} 
        items={items}
        moneyType='income'
        toggleSortType={this.toggleSortType}
        textToUpdate={textToUpdate} 
        amountToUpdate={amountToUpdate}
        handleUpdateFields={this.handleUpdateFields}
        handleUpdate={this.handleUpdate}
        onEditClick={this.onEditClick} 
        onDeleteClick={this.onDeleteClick} 
      />
    ) : null;

    const expenseDisplay = items.some(item => item.moneyType === 'expense') ? (
      <Table 
        sortTable={this.sortTable} 
        items={items}
        moneyType='expense'
        toggleSortType={this.toggleSortType}
        textToUpdate={textToUpdate} 
        amountToUpdate={amountToUpdate}
        handleUpdateFields={this.handleUpdateFields}
        handleUpdate={this.handleUpdate}
        onEditClick={this.onEditClick} 
        onDeleteClick={this.onDeleteClick} 
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
