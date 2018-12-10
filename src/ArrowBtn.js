import React from 'react';

const ArrowBtn = (props) => {

    const {name, value, className, onClick, text} = props;
    console.log('props: ', props);

  return (
    <button
        name={name} 
        value={value} 
        className={className} 
        onClick={onClick}
    >
        {props.text}
    </button>
  )
}


export default ArrowBtn;