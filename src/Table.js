import React from 'react';
import './Tables.css';
import {arraySorter} from './helper';

class Table extends React.Component {

  state = {
    sortAscending: false,
    sortDescending: false,
    sortKey: null,
  }

  handleToggleSort = (e) => {
    const {sortAscending, sortDescending, sortKey} = this.state;
    const field = e.target.value;
    const key = e.target.name;
    let bool = (field === 'sortAscending') ? sortAscending : sortDescending;
    //when clicked, toggle sorted property in state
    //also sort up or down based on field value
    //let sorted = sortTable(props.items DESTRUCTURE THIS ABOVE)
    //this.setState({sortedItems: sorted});

    this.setState({
      [field]: !bool,
      sortKey: key,
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

    const {items, sortTable, moneyType} = this.props;
    const {sortAscending, sortDescending, sortKey} = this.state;

    //set sortDirection before rendering items array
    let sortDirection;
    if(sortAscending) {
      sortDirection = 'ascending';
    } else if (sortDescending) {
      sortDirection = 'descending';
    } else {
      sortDirection = null;
    }

    //arraySort takes arr, sortKey ('desc' or 'amount') and direction ('ascending' or 'descending')
    const sortedItems = arraySorter(items, sortKey, sortDirection);

    //if items have been sorted, show those; otherwise show unsorted items array
    let tableDisplay = sortedItems ? this.makeDisplay(sortedItems) : this.makeDisplay(items);
    console.log('table Cells: ', tableDisplay);



      return (
        <div className={`${moneyType}-table-container`}>
          <table>
              <tbody>
                <tr>
                    <th className="table-header-">{moneyType.toUpperCase()} 
                      <button
                        name="desc" 
                        value="sortAscending"
                        className="sort-btn"
                        onClick={this.handleToggleSort}
                      >
                        &#8593;
                      </button>
                      <button
                        name="desc" 
                        value="sortDescending"
                        className="sort-btn"
                        onClick={this.handleToggleSort}
                      >
                        &#8595;
                      </button>
                    </th>
                    <th className="table-header-">Amount 
                      <button
                        name="amount" 
                        value="sortAscending"
                        className="sort-btn"
                        onClick={this.handleToggleSort}
                      >
                        &#8593;
                      </button>
                      <button
                        name="amount" 
                        value="sortDescending"
                        className="sort-btn"
                        onClick={this.handleToggleSort}
                      >
                        &#8595;
                      </button>
                    </th>
                </tr>
                {tableDisplay}
              </tbody>
          </table>
        </div>
      );
  }
}


export default Table;