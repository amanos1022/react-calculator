import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './Calculator';
import DragWindow from './DragWindow';

ReactDOM.render(
	(
		<div>
			<Calculator className="calculator" />
			<DragWindow title="Calculator">
				<Calculator className="calculator" />
			</DragWindow>
		</div>
	), 
	document.getElementById('container')
);