import React from 'react'

const ExpenseTable = props => {

  const {items} = props;

  const tableCells = items
    .filter(item => item.moneyType === 'expense')
    .map((item, i) => (
      <tr key={i}>
        <td style={{display: 'table-cell'}}>{item.desc}</td>
        <td style={{display: 'table-cell'}}>{item.amount}</td>
      </tr>
    ));

  return (
    <div className="expense-table-container">
      <table>
        <tbody>
          <tr>
              <th>Expense</th>
              <th>Amount</th>
          </tr>
          {tableCells}
        </tbody>
      </table>
    </div>
  )
}


export default ExpenseTable;