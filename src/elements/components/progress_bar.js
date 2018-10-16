import React, { Component } from 'react';
import '../../App.css';

/*
	Progress bar
	
    This component renders the progress bar (how far along is the upload process?)

	Props:
		progress (how far along the progress is)

*/

class ProgressBar extends Component
{	
	render() {		

        //Only show if progress is greater than zero
        if (this.props.progress > 0)
        {
            return(
                <div className="progressHolder">
                    {/* The bar itself */}
                    <div className="progressBar" style={{width: this.props.progress + 'px'}}></div>
                </div>
                );
        }
        else
        {
            //Don't show anything
            return null;
        }
            
        
		
	}
}

export default ProgressBar;