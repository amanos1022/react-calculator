import React from 'react';
import ReactDOM from 'react-dom';
import OperatorButton from './OperatorButton';
import CalculatorNumberButton from './CalculatorNumberButton';

class Calculator extends React.Component{
	constructor(props){
		super(props);

		this.state = {display:0, nextOperation:null};

		this.equationStack =[];
		this.postOperation =false;
		this.nextOperation =null;
		this.postEquals  = true; //after equals button pressed
		this.init = true;
	}
	buttonClick(e, num){
		this.init = false;

		if(this.postEquals != true && this.postOperation != true){
			this.setState({display:this.state.display+""+num}); // append numbers
		}else{
			if(this.postEquals){
				console.log('postEquals');
				this.equationStack = [];
			}
			this.postEquals = false;
			this.postOperation = false;
			
			this.setState({display:num});
		}
	}
	equate(){
		var _this = this;
		var solution = 0;

		if(!this.postEquals){
			this.addEquation(this.state.display, this.nextOperation);

			this.equationStack.forEach(function (equation){
				switch(equation.operation){
					case '+' :
						solution += equation.value;
						break;
					case '-' :
						solution -= equation.value;
						break;
					case 'x' :
						solution = solution * equation.value;
						break;
					case '\/' :
						solution = solution / equation.value;
						break;
					default : //null
						solution = equation.value;
						break;
				}
			});

			this.nextOperation = null; this.setState({nextOperation: null})
			this.postEquals = true;
			this.setState({display:solution});
		}
		console.log(this.equationStack);
	}
	addEquation(value, operation){
		this.equationStack.push({value:parseFloat(value), operation:operation});
	}
	clear(){
		this.setState({display:'0'});
		this.equationStack = [];
		this.postEquals = true;
		this.postOperation = false;
		this.nextOperation = null; this.setState({nextOperation: null})
		this.init = true;
	}
	operatorClick(display, operation){
		if(!this.init){
			if(this.postEquals != true && this.postOperation != true){
				if(this.nextOperation == null){
					this.addEquation(display, null);
				}else{
					this.equate();
					// this.addEquation(display, operation);
				}
			}

			this.nextOperation = operation; this.setState({nextOperation: operation})
			this.postOperation = true;
			this.postEquals = false;
		}
	}
	render(){
		return (
			<div className={this.props.className}>
				<h1>{this.props.title}</h1>

				<div className="calculator__display">
					{this.state.display}
					<div className="operator">{this.nextOperation || ''}</div>
				</div>

				<div className="numbers">
					<div className="numbers-container">
						<CalculatorNumberButton  onClickButton={this.buttonClick.bind(this)} value={1} />
						<CalculatorNumberButton  onClickButton={this.buttonClick.bind(this)} value={2} />
						<CalculatorNumberButton  onClickButton={this.buttonClick.bind(this)} value={3} />
						<CalculatorNumberButton  onClickButton={this.buttonClick.bind(this)} value={4} />
						<CalculatorNumberButton  onClickButton={this.buttonClick.bind(this)} value={5} />
						<CalculatorNumberButton  onClickButton={this.buttonClick.bind(this)} value={6} />
						<CalculatorNumberButton  onClickButton={this.buttonClick.bind(this)} value={7} />
						<CalculatorNumberButton  onClickButton={this.buttonClick.bind(this)} value={8} />
						<CalculatorNumberButton  onClickButton={this.buttonClick.bind(this)} value={9} />
						<CalculatorNumberButton  onClickButton={this.buttonClick.bind(this)} className="zero-btn" value={0} />
						<CalculatorNumberButton  onClickButton={this.buttonClick.bind(this)} value="." />
						<div className="button-container">
							<button className="equals-btn" onClick={this.equate.bind(this)}>=</button>
						</div>
					</div>

					<div className="operators">
						<button className="clear-btn" onClick={this.clear.bind(this)}>C</button>
						<OperatorButton addEquation={this.operatorClick.bind(this)} display={this.state.display} operation="/" />
						<OperatorButton addEquation={this.operatorClick.bind(this)} display={this.state.display} operation="x" />
						<OperatorButton addEquation={this.operatorClick.bind(this)} display={this.state.display} operation="-" />
						<OperatorButton className="plus-btn" addEquation={this.operatorClick.bind(this)} display={this.state.display} operation="+" />
					</div>
				</div>
				<div className="clear"></div>
			</div>
		);
	}
}
export default Calculator;