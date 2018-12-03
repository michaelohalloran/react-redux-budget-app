import React, { Component } from 'react';
import './App.css';
import LiveUpdate from './LiveUpdate';
import AddBudgetForm from './AddBudgetForm';
import IncomeTable from './IncomeTable';
import ExpenseTable from './ExpenseTable';



//LATER: wrap in <BrowserRouter>, then put <Route path="" component={}></Route> around inside components, and put <Link to="/"> in the other files


class App extends Component {

  state = {
    items: [],
    netTotal: 0,
    moneyType: 'income',
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

  // sortAlpha = () => {
  //   const {items} = this.state;
  //   const sortedItems = items.sort((a, b) => {
  //     return a.desc < b.desc ? -1 : 1;
  //   });
  //   return sortedItems;
  // }

  sortAlpha = arr => {
    let copy = arr.slice();
    const sorted = copy.sort((a, b) => {
      return a.desc < b.desc ? -1 : 1;
    });
    return sorted;
  }

  reverseSortAlpha = arr => {
    let copy = arr.slice();
    const sorted = copy.sort((a, b) => {
      return a.desc < b.desc ? 1 : -1;
    });
    return sorted;
  }

  render() {

    const {items, moneyType, netTotal} = this.state;

    //if some items are income, show the incomeDisplay
    const incomeDisplay = items.some(item => item.moneyType === 'income') ? (
      <IncomeTable 
        sortAlpha={this.sortAlpha}
        reverseSortAlpha={this.reverseSortAlpha} 
        items={items}
      />
    ) : null;

    const expenseDisplay = items.some(item => item.moneyType === 'expense') ? (
      <ExpenseTable items={items} />
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
