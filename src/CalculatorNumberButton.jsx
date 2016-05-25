import React from 'react';

class CalculatorNumberButton extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className={"button-container "+(this.props.className || '')}>
				<button onClick={e => this.props.onClickButton(e, this.props.value)}>
					{this.props.value}
				</button>
			</div>
		);
	}
}
export default CalculatorNumberButton;