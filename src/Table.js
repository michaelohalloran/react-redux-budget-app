import React from 'react';
import './Tables.css';
import {arraySorter} from './helper';
import ArrowBtn from './ArrowBtn';

class Table extends React.Component {

  state = {
    sortAscending: false,
    sortDescending: false,
    sortKey: null,
  }

  handleToggleSort = (e) => {
    const {sortAscending, sortDescending} = this.state;
    const field = e.target.value;
    const key = e.target.name;
    //if button has value of ascending, set that as state sort direction; otherwise use descending
    let bool = (field === 'sortAscending') ? sortAscending : sortDescending;

    //when clicked, toggle sorted property in state
    this.setState({
      [field]: !bool,
      sortKey: key,
    });
  }

  handleDelete = idx => {
    const {onDeleteClick} = this.props;
    //pass this to top-level delete
    onDeleteClick(idx);
  }

  makeDisplay = arr => {

    const {moneyType} = this.props;

    return (
      arr
        .filter(item => item.moneyType === moneyType)
        .map((item, idx) => (
          <tr key={idx}>
            <td>{item.desc}</td>
            <td>{item.amount}</td>
            <td onClick={()=> this.handleDelete(idx)}>X</td>
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

      return (
        <div className={`${moneyType}-table-container`}>
          <table>
              <tbody>
                <tr>
                    <th className="table-header-">{moneyType.toUpperCase()}
                      <ArrowBtn 
                        name="desc"
                        value="sortAscending"
                        className="sort-btn"
                        onClick={this.handleToggleSort}
                        text="&#8593;"
                      /> 
                      <ArrowBtn 
                        name="desc"
                        value="sortDescending"
                        className="sort-btn"
                        onClick={this.handleToggleSort}
                        text="&#8595;"
                      /> 
                    </th>
                    <th className="table-header-">AMOUNT 
                    <ArrowBtn 
                        name="amount"
                        value="sortAscending"
                        className="sort-btn"
                        onClick={this.handleToggleSort}
                        text="&#8593;"
                      /> 
                      <ArrowBtn 
                        name="amount"
                        value="sortDescending"
                        className="sort-btn"
                        onClick={this.handleToggleSort}
                        text="&#8595;"
                      />
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