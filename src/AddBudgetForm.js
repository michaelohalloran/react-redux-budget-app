import React, { Component } from 'react';
import './AddBudgetForm.css';

class AddBudgetForm extends Component {

    state = {
        desc: '',
        amount: '',
    }


    handleSubmit = e => {
        e.preventDefault();
        const {addBudgetItem, moneyType} = this.props;
        const {desc, amount} = this.state;
        const budgetItem = {
            desc,
            moneyType,
            amount: +amount
        }

        console.log('handleSubmit event: ', e);
        addBudgetItem(budgetItem);
        // calcUpdatedTotal();
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

        const {toggleMoneyType} = this.props;

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
            />
            <input 
                className="amount-input"
                name="amount"
                value={this.state.amount}
                onChange={this.handleChange}
            />
            <button className="add-btn">Add</button>
        </form>
      </div>
    )
  }
}

export default AddBudgetForm;
