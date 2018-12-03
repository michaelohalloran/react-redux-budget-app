import React, { Component } from 'react';
import './App.css';
import LiveUpdate from './LiveUpdate';
import AddBudgetForm from './AddBudgetForm';
// import IncomeTable from './IncomeTable';
// import ExpenseTable from './ExpenseTable';



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

  render() {

    const {items, moneyType, netTotal} = this.state;

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
        {/* <IncomeTable /> */}
        {/* <ExpenseTable /> */}
      </div>
    );
  }
}

export default App;
