import React, { Component } from 'react';
import '../../App.css';

/*
	CSV Column
	
    A column in the CSV table

    Props:
        text:   what does the column say?
*/

class CSVcolumn extends Component
{
    //Render the component
	render() {		

            return(
                <td className="tableColumn">
                    {/* What does the column say? */}
                    {this.props.text}							
                </td>
                );
        
		
	}
}

//Output for use
export default CSVcolumn;