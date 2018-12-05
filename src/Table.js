import React from 'react';
import './Tables.css';

class Table extends React.Component {

  state = {
    sortAscending: false,
    sortDescending: false,
  }

  toggleSort = (e) => {
    const {sortAscending, sortDescending} = this.state;
    const field = e.target.value;
    let bool = (field === 'sortAscending') ? sortAscending : sortDescending;
    //when clicked, toggle sorted property in state
    //also sort up or down based on field value
    this.setState({
      [field]: !bool,
    });
    //also render with sortedCells
  }

  makeDisplay = arr => {

    const {moneyType} = this.props;
    console.log('props: ', this.props);

    return (
      arr
        .filter(item => item.moneyType === moneyType)
        .map((item, i) => (
          <tr key={i}>
            <td>{item.desc}</td>
            <td>{item.amount}</td>
          </tr>
        ))
    );
  }

  render() {

    const {items, sortAlpha, reverseSortAlpha, moneyType} = this.props;
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
        <div className={`${moneyType}-table-container`}>
          <table>
              <tbody>
                <tr>
                    <th className="table-header-">Income 
                      <button 
                        value="sortAscending"
                        className="sort-btn"
                        onClick={this.toggleSort}
                      >
                        &#8593;
                        {/* <i className="up"></i> */}
                      </button>
                      <button 
                        value="sortDescending"
                        className="sort-btn"
                        onClick={this.toggleSort}
                      >
                        &#8595;
                        {/* <i className="down"></i> */}
                        {/* Sort Descending */}
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


export default Table;