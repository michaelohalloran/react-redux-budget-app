import React from 'react';
import './Tables.css';

class IncomeTable extends React.Component {

  state = {
    sortAscending: false,
    sortDescending: false,
  }

  toggleSort = (e) => {
    console.log('button val: ', e.target.value);
    const {sortAscending, sortDescending} = this.state;
    const field = e.target.value;
    let bool = (field === 'sortAscending') ? sortAscending : sortDescending;
    //when clicked, toggle sorted property in state
    this.setState({
      [field]: !bool,
    });
    //also render with sortedCells
    console.log('called toggleSort, sorted is: ', e.target.value);
  }

  makeDisplay = arr => {
    return (
      arr
        .filter(item => item.moneyType === 'income')
        .map((item, i) => (
          <tr key={i}>
            <td>{item.desc}</td>
            <td>{item.amount}</td>
          </tr>
        ))
    );
  }

  render() {

    const {items, sortAlpha, reverseSortAlpha} = this.props;
    const {sortAscending, sortDescending} = this.state;
    
    const sortedArr = sortAlpha(items);
    const reverseSortedArr = reverseSortAlpha(items);
    const sortedCells = this.makeDisplay(sortedArr);
    const reverseSortedCells = this.makeDisplay(reverseSortedArr);
    //unsorted cells:
    const tableCells = this.makeDisplay(items);

    //SORTING LOGIC:
    let tableDisplay;

    if(sortAscending) {
      tableDisplay = sortedCells;
    } else if (sortDescending) {
      tableDisplay = reverseSortedCells;
    } else {
      tableDisplay = tableCells;
    }

      return (
        <div className="income-table-container">
          <table>
              <tbody>
                <tr>
                    <th className="table-header-">Income 
                      <button value="sortAscending"
                        onClick={this.toggleSort}
                      >
                        Sort Ascending
                      </button>
                      <button value="sortDescending"
                        onClick={this.toggleSort}
                      >
                        Sort Descending
                      </button>
                    </th>
                    <th>Amount</th>
                </tr>
                {tableDisplay}
              </tbody>
          </table>
        </div>
      );
  }
}


export default IncomeTable;