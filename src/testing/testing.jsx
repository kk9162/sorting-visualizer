import React, { useState, useEffect } from 'react';

function RandomArray() {
  const [array, setArray] = useState([]);

  const generateRandomArray = (length) => {
    const newArray = [];
    for (let i = 0; i < length; i++) {
      newArray.push(Math.floor(Math.random() * 100) + 10); // Adjust the range and scaling factor as needed
    }
    setArray(newArray);
  };

  useEffect(() => {
    generateRandomArray(10); // Specify the desired length of the array
  }, []);

  return (
    <div>
      {array.map((value, index) => (
        <div
          key={index}
          style={{
            width: '20px',
            height: `${value * 5}px`, // Adjust the scaling factor as needed
            background: 'blue',
            marginRight: '5px',
          }}
        ></div>
      ))}
    </div>
  );
}

export default RandomArray;
