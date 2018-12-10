import React from 'react';
import './DivTable.css';
import {arraySorter} from '../helper';
import ArrowBtn from '../ArrowBtn';

class DivTable extends React.Component {

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

  handleDelete = id => {
    //pass this to top-level delete
    //this.props.onDeleteClick(id);
  }

  makeDisplay = arr => {

    const {moneyType} = this.props;

    return (
      arr
        .filter(item => item.moneyType === moneyType)
        .map((item, i) => (
          <div className="table-row" key={i}>
            <div>{item.desc}</div>
            <div>{item.amount}</div>
            <span value="btn" onClick={(e)=> console.log('span event and idx: ', e.target.value, i)}>X</span>
          </div>
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
            {tableDisplay}
        </div>
      );
  }
}


export default DivTable;