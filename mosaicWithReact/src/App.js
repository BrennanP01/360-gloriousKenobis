import React, { Component } from 'react';
import './App.css';
import facedraw from './facedraw.png';
import {randomNumber, randomizeColor} from './Functions.js';

/************************************************************
* This class is responsible of building the business logic  *
* The class build the header, body and footer of the mosaic *
************************************************************/
export default class App extends Component {
	constructor(props) {
		super(props);
		this.forceRandom = this.forceRandom.bind (this);
		this.state = {
/*			value: null,*/
			newRendering: false
		};
	}

	/*********************************************
	* Function to create a table with:           *
	*		The shape                            *
	*		Code to print in the foreground      *
	*********************************************/
	createTable () {
		let table = [];

		for (let i = 1; i < 145; i++) {
			let randShape = randomNumber(0, 2);
			let randCode = randomNumber(65, 91);
			let randLetter = String.fromCharCode (randCode);
			if (randShape === 0) {
				table.push(<Shape
					key={i.toString()}
					id={i.toString()}
					name='square'
					value={randLetter} />);
			} else {
				table.push(<Shape
					key={i.toString()}
					id={i.toString()}
					name='circle'
					value={randLetter} />);
			}
		}
		return table;
	}

	/******************************************************
	* Function to refresh the complete mosaic with random *
	* shapes, characters and colors                       *
	******************************************************/
	forceRandom() {
		const newRendering = this.state.newRendering;
		if (newRendering) {
			this.setState ({newRendering: false});
		} else {
			this.setState ({newRendering: true});
		}
	}
	
	render() {
		let table = this.createTable ();
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
				<div className='footer'>
					<button
						className='randbutton'
						onClick={this.forceRandom}
					>
						Randomize!
					</button>
				</div>
			</div>
		);
	}
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
	* the character is swapped to a number and when accessed   *
	* again, recovers the character associated to the shape    *
	* Shape and colors are not updated                         *
	***********************************************************/
/*	clickShape = () => { */
	clickShape () {
/*		console.log (this.refButton);*/
		if (this.refButton.current.innerText === "") {
			this.refButton.current.innerHTML = this.innerHTML;
		} else {
			this.innerHTML = this.refButton.current.innerHTML;
			this.refButton.current.innerHTML = 
					"<img class='image' src='"+facedraw+"' alt='5'/>";
		}
	}

	render() {
		/*const baseColor = rgb2hex (170, 170, 170);*/
		/*const baseColor = rgb2hex (221, 221, 221);*/
		const baseColor = "#dddddd";
		let backColor = randomizeColor (baseColor);
		let fontColor = randomizeColor (backColor);
		let characterInside = this.props.value;
		let keyValue = this.props.id;
		let className = this.props.name;
		return (
			<button
				key={keyValue}
				ref={this.refButton}
				id={keyValue}
				value={characterInside.toString()}
				className={className}
				style={{backgroundColor: backColor, color: fontColor}}
				onClick={this.clickShape}
			>
				{characterInside}
			</button>
		);
	}
}
