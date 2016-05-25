import React from 'react';
import Calculator from './Calculator';

class DragWindow extends React.Component{
	constructor(props){
		super(props);
		this.state = {top:0, left:0};
	}
	drag(e){
		this.setState({top:e.pageY, left:e.pageX});
	}
	startDrag(e){
		var _this = this;

		var pos = e.target.getBoundingClientRect();
		var dragOffsetX = e.pageX - pos.left;
		var dragOffsetY = e.pageY - pos.top;

		const drag = function(e){

			_this.setState({top:e.pageY-dragOffsetY, left:(e.pageX - dragOffsetX)});
		}

		document.addEventListener('mousemove',drag);
		document.addEventListener('mouseup', function(){
			document.removeEventListener('mousemove', drag);
			if(_this.state.top < 0){
				_this.setState({top:0});
			}
			if(_this.state.left < 0){
				_this.setState({left:0});
			}
		})
	}
	close(e){
		console.log(e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode));
	}
	render(){
		return (
			<div className="drag-window" style={this.state}>
				<div className="bar" onMouseDown={(e) => this.startDrag(e)}>
					{this.props.title}
					<div className="close-btn" onClick={(e) => this.close(e)}>x</div>
				</div>
				{this.props.children}
			</div>
		);
	}
}

export default DragWindow;