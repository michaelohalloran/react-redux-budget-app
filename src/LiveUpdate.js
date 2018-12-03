import React from 'react';
import './LiveUpdate.css';

const LiveUpdate = props=> {

  const {netTotal, items, updateDisplayTables} = props;

  console.log('items: ', items);

  const itemsCopy = items.slice();

  const latestIncomeItem = itemsCopy.filter(item => item.moneyType === 'income').pop();
  const latestExpenseItem = itemsCopy.filter(item => item.moneyType === 'expense').pop();

  console.log('latest income: ', latestIncomeItem);

  const incomeDisplay = latestIncomeItem ? (
      <div className="live-update-income">{latestIncomeItem.desc} : +${latestIncomeItem.amount}</div>
  ) : null;

  const expenseDisplay = latestExpenseItem? (
    <div className="live-update-expense">{latestExpenseItem.desc} : -${latestExpenseItem.amount}</div>
  ) : null;

  return (
    <header className="live-update-display">
      <h4 className="live-update-header">Net Amount: {netTotal}</h4>
        {incomeDisplay}
        {expenseDisplay}
    </header>
  )
}

export default LiveUpdate;