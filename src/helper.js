
// https://stackoverflow.com/questions/44402937/how-to-make-columns-in-table-sortable-in-both-ways-using-reactjs

export const arraySorter = (arr, sortKey, direction) => {
    let copy = [...arr];
    return copy.sort((a,b)=> {
      switch(direction) {
        case 'ascending':
          return a[sortKey] < b[sortKey] ? -1 : 1;
        case 'descending':
          return b[sortKey] < a[sortKey] ? -1 : 1;
        default: 
          return copy;
      }
    });
}
