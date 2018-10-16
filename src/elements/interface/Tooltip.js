import React, { Component } from 'react';
import '../../App.css';

/*
	Tooltip
	
    This component renders a tooltip for things like icon labels

	Props:
		text (what should it say?)

*/

class Tooltip extends Component
{	
	//Render the tooltip
	render() {		
		//Only show if the tooltip is visible
		if (this.props.visible == true)
		{
			return(
				<div className="tooltip">{this.props.text}</div>
			);
		}
		else
		{
			//Otherwise, don't show
			return null;
		}
		
	}
}

//Export for use
export default Tooltip;