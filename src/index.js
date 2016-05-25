import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './Calculator';
import DragWindow from './DragWindow';

ReactDOM.render(
	(
		<div>
			<DragWindow
				title="Calculator"
				module={new Calculator({className:"calculator"})} />
			<DragWindow
				title="Another window" 
				content={<strong>Hey</strong>} />
			<Calculator className="calculator" />
		</div>
	), 
	document.getElementById('container')
);