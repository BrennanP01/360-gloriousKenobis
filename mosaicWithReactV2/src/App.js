import React, { Component, useState, useEffect, useRef} from 'react';
import './App.css';
import Sound from 'react-sound';
import facedraw from './facedraw.png';
import soundToPlay from './whistle.mp3';
import {randomNumber, randomizeColor} from './Functions.js';

/************************************************************
* This class is responsible of building the business logic  *
* The class build the header, body and footer of the mosaic *
************************************************************/
export default function App () {
	const [newRendering, SetNewRendering] = useState(false);
	const [numberCells] = useState(12);
	const [numberShapes] = useState(2);

	/*********************************************
	* Function to create a table with:           *
	*		The shape                            *
	*		Code to print in the foreground      *
	*********************************************/
	function createTable () {
		let table = [];

		for (let i = 1; i < (numberCells*numberCells + 1); i++) {
			let randShape = randomNumber(0, numberShapes);
			let randCode = randomNumber(65, 91);
			let randLetter = String.fromCharCode (randCode);
			let indexString = i.toString();
			let shapeForm = 'shape' + randShape.toString();
			table.push(<Shape
					key = {indexString}
					id = {indexString}
					name = {shapeForm}
					size = {numberCells}
					value = {randLetter} />);
		}
		return table;
	}
	
	/******************************************************
	* Function to refresh the complete mosaic with random *
	* shapes, characters and colors                       *
	******************************************************/
	function forceRandom() {
		if (newRendering) {
			SetNewRendering (false);
		} else {
			SetNewRendering (true);
		}
	}

	let table = createTable ();

	return (
		<div className='base'>
			<div className='header'>
				<button
					className='circle1'
					style={{backgroundColor: 'red', color: 'red'}}
				></button>
				<button
					className='circle1'
					style={{backgroundColor: 'green', color: 'green'}}
				></button>
				<button
					className='circle1'
					style={{backgroundColor: 'yellow', color: 'yellow'}}
				></button>
			</div>
			<div className='mosaic'>
				{table}
			</div>
			<Footer 
				forceRandom={forceRandom}
			/>
		</div>
	);
}

/*********************************************************************
* This class is responsible of building the footer of our mosaic app *
* The footer includes the button to start/stop the timer             *
* and the current timer value                                        *
*********************************************************************/
function Footer ({forceRandom}) {
	const [startCount, SetStartCount] = useState(false);
	const [counter, SetCounter] = useState(60);
	const [isPlaying, SetIsPlaying] = useState(false);
	const countRef = useRef(counter);
	countRef.current = counter;

	/**********************************************
	* Function to refresh the current timer value *
	**********************************************/
	useEffect(() => {
		let interval;
		if (startCount) {
			const el = document.getElementById('counter');
			interval = setInterval(() => {
				SetCounter (currCounter => currCounter - 1);
				let currCounter = countRef.current;
				//console.log('In setInterval', currCounter);
				el.innerHTML = currCounter;
			}, 1000);
		} else {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [startCount]);

	/**********************************************************************
	* Function to manage the timer and the label of the start/stop button *
	**********************************************************************/
	const ManageCounter = () => {
		const btn = document.getElementById('start_stop');
		if (startCount) {
			btn.innerHTML = 'Start Timer';
		} else {
			btn.innerHTML = 'Stop Timer';
		}
		SetStartCount(!startCount);
	}

	/*******************************************************************
	* Function to reset the timer and prepare for next temporization   *
	* Also, it launches a sound when the timer reach the value of zero *
	*******************************************************************/
	const ResetCounter = () => {
		SetCounter(60);
		SetStartCount(!startCount);
		const btn = document.getElementById('start_stop');
		btn.innerHTML = 'Start Timer';
		forceRandom();
	}

	/***************************************************************
	* Function fired when the music ends to avoid restarting again *
	***************************************************************/
	const handleSongFinishedPlaying = () => {
		SetIsPlaying(!isPlaying);
	}
		
	let currCounter = countRef.current;
	let backColor;
	if (currCounter === 0) {
		ResetCounter();
		SetIsPlaying(!isPlaying);
	} else if (currCounter <= 10) {
		backColor = 'red';
	} else {
		backColor = '#dddddd';
	}
	return (
		<div className='footer'>
			<button
				id='randbutton'
				className='randbutton'
				onClick={() => forceRandom()}
			>
				Randomize!
			</button>
			<button
				id='start_stop'
				className='randbutton'
				onClick={() => ManageCounter()}
			>
				Start Timer
			</button>
			<label className='count_label'>
				Timer:
			</label>
			<label
				id='counter'
				className='counter'
				style={{backgroundColor: backColor}}
			>{counter}</label>
			<Sound
				url = {soundToPlay}
				playStatus = {isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
				onFinishedPlaying = {handleSongFinishedPlaying}
			/>
		</div>
	);
}

/********************************************************************
* This class is responsible for building every cell of the mosaic   *
* The class receive the shape and the foreground character to print *
* and calculate random color codes for these elements               *
********************************************************************/
class Shape extends Component {
	constructor(props) {
		super(props);
		this.refButton = React.createRef();
		this.clickShape = this.clickShape.bind (this);
		this.state = {
			value: null,
			innerHTML: null,
		};
	}

	/***********************************************************
	* Function to update a single shape. Everytime is accessed *
	* the character is swapped to an image and when accessed   *
	* again, recovers the character associated to the shape    *
	* Shape and colors are not updated                         *
	***********************************************************/
/*	clickShape = () => { */
	clickShape () {
/*		console.log (this.refButton);*/
		if (this.refButton.current.innerText === "") {
			this.refButton.current.innerHTML = this.innerHTML;
		} else {
			/* Computes the relative size of the facedraw */
			const shapeSizeInt = 100. / this.props.size;
			const charSizeInt = 1.1*shapeSizeInt / 2;
			const imageWidth = charSizeInt.toString() + "vmin";
			this.innerHTML = this.refButton.current.innerHTML;
			this.refButton.current.innerHTML = 
				"<img class='image' src='" + facedraw + "' style='width:" + imageWidth + "' alt='5'/>";
		}
	}

	render() {
		const baseColor = "#dddddd";
		const backColor = randomizeColor (baseColor);
		const fontColor = randomizeColor (backColor);
		const characterInside = this.props.value;
		const keyValue = this.props.id;
		const className = this.props.name;
		/* Computes the relative size of the shapes and characters */
		const shapeSizeInt = 100. / this.props.size;
		const charSizeInt = 1.128*shapeSizeInt / 2;
		const shapeSizeStr = shapeSizeInt.toString() + "%";
		const charSizeStr = charSizeInt.toString() + "vmin";
		//console.log (charSizeStr);
		return (
			<button
				key={keyValue}
				ref={this.refButton}
				id={keyValue}
				value={characterInside.toString()}
				className={className}
				style={{backgroundColor: backColor, color: fontColor, 
						width: shapeSizeStr, height: shapeSizeStr,
						fontSize: charSizeStr}}
				onClick={this.clickShape}
			>
				{characterInside}
			</button>
		);
	}
}
