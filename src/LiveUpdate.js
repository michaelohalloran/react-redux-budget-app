import React from 'react'

const LiveUpdate = props=> {

  const {netTotal, items} = props;

  console.log('items: ', items);

  const itemsCopy = items.slice();

  const latestIncomeItem = itemsCopy.filter(item => item.moneyType === 'income').pop();
  const latestExpenseItem = itemsCopy.filter(item => item.moneyType === 'expense').pop();

  console.log('latest income: ', latestIncomeItem);

  const incomeDisplay = latestIncomeItem ? (
      <div className="live-update-income">{latestIncomeItem.desc} : {latestIncomeItem.amount}</div>
  ) : null;

  const expenseDisplay = latestExpenseItem? (
    <div className="live-update-expense">{latestExpenseItem.desc} : {latestExpenseItem.amount}</div>
  ) : null;

  return (
    <div className="live-update-display">
      <h4 className="live-update-h4">Net Amount: {netTotal}</h4>
        {incomeDisplay}
        {expenseDisplay}
    </div>
  )
}

export default LiveUpdate;