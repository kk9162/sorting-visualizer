import React from 'react';
import './App.css';
import SortVisualizer from './SortVisualizer/SortVisualizer';
import Test from'./testing/testing';




function App() {

  return ( // return the visualizer component
    <div className='container' style={{ overflow: 'auto' }}>
      <div className="App">
        <SortVisualizer /> 
      </div>
    </div>
  );
};

function Testr(){
  return( 
    <div className='container'>
    
    </div>
  );
};
export default App;
