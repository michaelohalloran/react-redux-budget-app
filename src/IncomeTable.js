import React from 'react'

const IncomeTable = props => {
  return (
    <div className="income-table-container">
      <table>
          <tr>
              <th>Income</th>
              <th>Amount</th>
          </tr>
          <tr>
              <td>Walk dog</td>
              <td>$10</td>
          </tr>
      </table>
    </div>
  )
}


export default IncomeTable;