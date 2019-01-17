import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

// to shuffle elements of an array

Alphabets.sort(() =>
{ return 0.5 - Math.random() 
});

let count = 0;
let flag = 0;

class Square extends React.Component {
	
	render() {
		return (
		<div>
		<button className="square" onClick={this.props.onClick}>
		{this.props.values}
		</button>
		
		</div>
		);
	}
}

class Board extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			squares: Array(16).fill(null),
			selected: [],
			correct: []
		};
		this.handleClick = this.handleClick.bind(this);
		this.onReset = this.onReset.bind(this);
	}
	
	
	handleClick(currIndex) {
		
		let square = this.state.squares.slice();

		let selected = this.state.selected;
		let correct = this.state.correct;
		
		if(currIndex === selected[0] || currIndex === correct || square[currIndex] === ':)') {
			return;
		}
		
		if(correct.length === Alphabets.length && square[currIndex] === ':)') {
			alert('Start a new game!!!');
			this.onReset();
		}
		
		if(selected.length === 0) {
			
			square[currIndex] = Alphabets[currIndex]
			console.log(currIndex);
			console.log(square[currIndex]);
			this.setState({
				selected: [currIndex],
				squares: square
			});
			
		} else if(selected.length === 1) {
			square[currIndex] = Alphabets[currIndex]
			console.log(currIndex);
			console.log(square[currIndex]);
			this.setState({
				squares: square
			});
			
			if(Alphabets[selected[0]] === Alphabets[currIndex]) {
				console.log('match');
				square[selected[0]] = ':)'
				square[currIndex] = ':)'
				count = count + 1;
				flag = flag + 2;
				this.setState({
					correct: correct.concat([selected[0], currIndex]),
					squares: square,
					selected: []
				});
			}
			else {
				console.log('not match');
				square[selected[0]] = Alphabets[selected[0]];
				square[currIndex] = Alphabets[currIndex];
				this.setState({
					selected: [selected[0], currIndex],
					squares: square
				});
				
				flag = flag + 2;
				setTimeout(() => {
					square[selected[0]] = [];
					square[currIndex] = [];
					this.setState({
						selected: [],
						squares: square
						})
				}, 1500);
			}
		}		
	}
	
	onReset() {
		count = 0;
		flag = 0;
		this.setState({
			squares: Array(16).fill(null),
			selected: [],
			correct: []
		});
	}
	
	
	renderSquare(i) {
		return (
		<Square 
		values={this.state.squares[i]}
		onClick = {() => {
			{this.handleClick(i)}
		}} 
		/>
		)
	}
	
	render() {
		return (
			<div>
				<h1>Lets play a game!!!</h1>
				<div className="board-row">
				{this.renderSquare(0)}
				{this.renderSquare(1)}
				{this.renderSquare(2)}
				{this.renderSquare(3)}
				</div>
				<div className="board-row">
				{this.renderSquare(4)}
				{this.renderSquare(5)}
				{this.renderSquare(6)}
				{this.renderSquare(7)}
				</div>
				<div className="board-row">
				{this.renderSquare(8)}
				{this.renderSquare(9)}
				{this.renderSquare(10)}
				{this.renderSquare(11)}
				</div>
				<div className="board-row">
				{this.renderSquare(12)}
				{this.renderSquare(13)}
				{this.renderSquare(14)}
				{this.renderSquare(15)}
				</div> <br />
				
				<h2>Score: {count}</h2>
				<h2>No. of Clicks: {flag}</h2>
				<button onClick={this.onReset}>Reset</button>
				
			</div>
		);
	}
}


ReactDOM.render(
<Board />, document.getElementById('root')
);
