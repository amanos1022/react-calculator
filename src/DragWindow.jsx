import React from 'react';
import Calculator from './Calculator';

class DragWindow extends React.Component{
	constructor(props){
		super(props);
		this.state = {top:0, left:0};
		this.content = ''; 
		if(typeof(props.module) !='undefined'){
			this.content = props.module.render();
		}else{
			this.content = props.content || '';
		}
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
	render(){
		return (
			<div className="drag-window" style={this.state}>
				<div className="bar" onMouseDown={(e) => this.startDrag(e)}>{this.props.title}</div>
				{this.content}
			</div>
		);
	}
}

export default DragWindow;