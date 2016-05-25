import React from 'react';
import ReactDOM from 'react-dom';

class OperatorButton extends React.Component{
	render(){
		return (
			<button className={this.props.className} onClick={e => this.props.addEquation(this.props.display, this.props.operation)}>{this.props.operation}</button>
		);
	}
}
export default OperatorButton;