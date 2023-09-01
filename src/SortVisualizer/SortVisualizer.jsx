import React from 'react'; //import the core React library
import './SortVisualizer.css';
import { mergeSort } from '../Algorithms/mergeSort';
import { quickSort } from '../Algorithms/quickSort';

export default class SortVisualizer extends React.Component { // allows class to be imported and used in other files without requiring explicit names for the import
    constructor(props) {
        super(props); // ensure that the parent class's constructor is called
        this.state = {
            array: [], // initialize state of the component 
            allBars: [],
            sliderValue: 75, // set initial slider val 
            speed: -200,
            barWidth: 0.8 // initial bar width
        };
    }

    componentDidMount() { // when it loads for the first time
        this.resetArray();
    }

    generateRandomNumber() {
        return Math.floor(Math.random() * 600); // generate a random number btwn 0 and 599
    }

    resetArray() {
        const { sliderValue } = this.state; // "destructuring assignment" -> extract the slider value
        const array = [];
        for (let i = 0; i < sliderValue; i++) {
            array.push(this.generateRandomNumber());
        }
        // set the state of array with the randomly generated one
        this.setState({ array });
    }

    handleSliderChange = (event) => {
        const sliderValue = event.target.value;
        this.setState({ sliderValue });

        // debouncer delays the execution of this.resetArray
        //if slider moves too quickly, will not impact performace
        clearTimeout(this.debouncer);
        this.debouncer = setTimeout(() => {
            this.resetArray();
        }, 0.5);
    };

    handleSpeedSlider = (event) => {
        const speed = event.target.value;
        this.setState({ speed });
    }

    handleButtonClick = (click) => { // generates a different random array when clicked
        this.resetArray();
    }

    handleMergeButton = (click) => {
       const allBars = document.getElementsByClassName("array-bar");
       const { speed } = this.state;
         mergeSort(allBars, speed);
    }

    handleQuickButton = (click) => {
        const allBars = document.getElementsByClassName("array-bar");
        quickSort(allBars);
    }

    handleHeapButton = (click) => {
        mergeSort(this.array);
    }





    render() {
        const { array, sliderValue, speed } = this.state;
        const barWidth = 30 / sliderValue * 25; // ensures the barwidth decreases as the slidervalue increases
        const allBars = document.getElementsByClassName("array-bar");

        return (
            <div style={{ display: 'flex', height: '100vh' }}>
                <div className='vertical-div' style={{ width: '300px', height: '100vh', justifyContent: 'center' }}>
                    <div style={{ marginLeft: '10%', padding: '0%' }}>
                        <p> SIZE OF ARRAY: </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '-10px' }}>
                        <input // slider
                            type="range"
                            min="3"
                            max="200"
                            value={sliderValue}
                            onChange={this.handleSliderChange}
                            className="slider-properties"
                        />
                        <span>{sliderValue}</span>
                    </div>

                    <div style={{ marginLeft: '10%', padding: '0%' }}>
                        <p> SPEED: </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '-10px' }} className= '.slider-speed'>
                        <input // slider
                            type="range"
                            min="-400"
                            max="-5"
                            value={speed}
                            onChange={this.handleSpeedSlider}
                            className="slider-properties"
                            orient="vertical"
                        />
                    </div>
                    
                    <div>
                        <button className='button-properties' onClick={this.handleButtonClick}>
                            Generate Different Array
                        </button>

                        <button className='button-properties' onClick={this.handleMergeButton}>
                            MERGE SORT
                        </button>
                        <button className='button-properties' onClick={this.handleQuickButton}>
                            QUICK SORT
                        </button>
                        <button className='button-properties' onClick={this.handleHeapButton}>
                            HEAP SORT
                        </button>
                    </div>



                </div>
                <div style={{ flex: '1' }}>
                    {/* Content for the right div */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <h1 style={{ color: 'white', fontSize: '45px', fontFamily: 'Roboto ,san-serif' }} className='center'> Sorting Visualizer</h1>
                    </div>
                    <div className="array-container" style={{ minHeight: '700px', minWidth: `900px` }} >
                        {array.map((value, index) => ( //iterates over the array and creates a div for each iteraction
                            <div
                                className="array-bar"
                                key={index}
                                style={{ height: `${value}px`, width: `${barWidth}px` }}>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        );
    }

}

function renr(myArray) {
    const tempArray = [...myArray];

}