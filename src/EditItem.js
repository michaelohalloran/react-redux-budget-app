import React from 'react'

class EditItemForm extends React.Component {

  constructor(props) {
    super(props); 

    this.state = {
      textToUpdate: '',
      amountToUpdate: '',
      editing: false,
    }
  }

  handleSubmit = e => {
      e.preventDefault();
      const {desc, amount} = this.state;
      const {handleUpdate, idx} = this.props;
      let updates = {
        desc,
        amount,
        editing: false,
      }
      //send updates to top level
      handleUpdate(updates, idx);
  }

  handleChange = e => {
      console.log('handleChange firing');
      //pass value up chain
      this.setState({
        [e.target.name]: e.target.value,
      });
  }

  render() {
    const {desc, amount, textToUpdate: t1, amountToUpdate: t2} = this.props;
    const {textToUpdate, amountToUpdate} = this.state;

    return (
      <td>
        <form onSubmit={this.handleSubmit}>
          <input
            name="textToUpdate" 
            // placeholder={textToUpdate}
            value={t1}
            onChange={this.handleChange}
          />
          <input
            name="amountToUpdate" 
            placeholder={amountToUpdate}
            value={t2}
            onChange={this.handleChange}
          />
          <button>Update</button>
        </form>
      </td>
    );
  }
  }

export default EditItemForm;