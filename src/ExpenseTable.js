import React from 'react'

const ExpenseTable = props => {
  return (
    <div className="expense-table-container">
      <table>
        <tr>
            <th>Expense</th>
            <th>Amount</th>
        </tr>
        <tr>
            <td>Car</td>
            <td>$8</td>
        </tr>
      </table>
    </div>
  )
}


export default ExpenseTable;