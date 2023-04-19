import React from 'react';
import "../Game.css";

const GameCircle = ({id,children,className,onCircleClicked}) => {

  return (
    <div 
      className = {`gameCircle ${className}`} 
      onClick = {() => onCircleClicked(id)}>
      {children}
    </div>
  )
  // here the onCircleClicked function (defined in the parent component) is called with updated (id) as parameter

}

export default GameCircle;