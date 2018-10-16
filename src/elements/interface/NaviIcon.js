import React, { Component } from 'react';
import '../../App.css';
import Tooltip from './Tooltip.js';

/*
	Navi icon
	
    > Outputs an individual icon
    > Handles the rendering of the icon's tooltip (label)
    > Processes clicks / presses of the icon and runs the desired function

    Props:
        icon:       What icon to show? Uses FontAwesome icons
        colour:     What colour (please note UK spelling) should the icon be?
        text:       What should the icon's tooltip say?
        action:     What function should be called when the user presses the icon?
        visible:    if visible is not false, the icon will be displayed

    State variables:
        showTooltip:    (defaults to false)     Should the icon's tooltip be displayed?
*/

class NaviIcon extends Component
{	
    //Construct the component
    constructor(props) {
        super(props)
        this.state = {
            showTooltip: false,
        }
    }


    //Show the tooltip
    showTooltip = () => {
        this.setState({
            showTooltip: true,
        });
    }

    //Hide the tooltip
    hideTooltip = () => {
        this.setState({
            showTooltip: false,
        });
    }

    //What happens when the user clicks / presses the icon?
    onClick = () => {
        //First, hide the tooltip
            this.hideTooltip();

        //Then, call the desired action
            //First, make sure that the icon actually has an action
                if (this.props.action != null)
                {
                    this.props.action();
                }
                else
                {
                    //Doesn't have an action - write the conosle
                        console.log("Icon pressed but no 'action' assigned to the icon");
                }
    }

    //Output the component
	render() {		
        //Only show if the icon is visible (ie visible is not false)
        if (this.props.visible != false)
        {
            return(
                <div className="inlineBlockIcon" onClick={this.onClick} onMouseOver={this.showTooltip} onMouseLeave={this.hideTooltip}>
                    {/* The icon itself */}
                    <i className={this.props.icon} style={{color: this.props.colour}}></i>									
                    {/* The tooltip */}
                    <Tooltip text={this.props.text} ref={(Tooltip) => (this.Tooltip = Tooltip)} visible={this.state.showTooltip}></Tooltip>
                </div>
                );
        }
        else
        {
            //The icon is not visible; don't show anything (render null)
            return null;
        }
            
        
		
	}
}

//Export for use
export default NaviIcon;