import React, { Component } from 'react';
import './AddBudgetForm.css';

class AddBudgetForm extends Component {

    state = {
        desc: '',
        amount: '',
        errorMsg: '',
        editing: false,
    }

    handleSubmit = e => {
        e.preventDefault();
        const {addBudgetItem, moneyType} = this.props;
        const {desc, amount, editing} = this.state;

        //don't allow users to submit NaN
        if(isNaN(amount)) {
            console.log('Can\'t add non-number');
            this.setState({desc: '', amount: ''});
            return;
        }

        const budgetItem = {
            desc,
            moneyType,
            amount: +amount, 
            editing
        }

        addBudgetItem(budgetItem);
        //update display tables
        this.setState({
            desc: '',
            amount: ''
        });
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {

        const {toggleMoneyType, moneyType} = this.props;

    return (
      <div className="add-budget-form-container">

        <select 
            onChange={toggleMoneyType}
            name="money-type" 
            className="add-budget-select"
        >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
        </select>

        <form className="add-budget-form" onSubmit={this.handleSubmit}>
            <input 
                className="desc-input"
                name="desc"
                value={this.state.desc}
                onChange={this.handleChange}
                placeholder="Description"
            />
            <input 
                className="amount-input"
                name="amount"
                value={this.state.amount}
                onChange={this.handleChange}
                placeholder="Amount"
            />
            <button 
                className={moneyType==='income' ? "add-income-btn" : "add-expense-btn"}
            >
                Add
            </button>
        </form>
      </div>
    )
  }
}

export default AddBudgetForm;
