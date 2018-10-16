import React, { Component } from 'react';
import '../../App.css';
import ReactFileReader from 'react-file-reader';
import CSVcolumn from './csv_column.js';
import ProgressBar from './progress_bar';


/*
	CSV Uploader
	
	This component enables the upload and processing of CSV files
	
	Props:
        base (base "this")
        baseState (base state)


    States:
        csvOutput:      Hold the CSV content that should be outputted
        columnWidth:    How wide should columns be?
        progress:       Keep track of how much progress has been done in terms of uploading
*/

class CSVuploader extends Component
{	
    //Constructor
        constructor(props)
        {
            super(props);
            this.state = {
                csvOutput: "notset",
                columnWidth: 0,
                progress: "notset",
            };
        }

    
    //Get column width
        columnWidth = (columns) => {
            //Get number of columns
                var count = columns.length;
                var divider;
                var width;

            //If columns are less than 5, divider should be 50
                if (count < 5)
                {
                    divider = 50;
                } 
                else
                {
                    divider = 100;
                }

                return (width / divider);
        }

    //Output column
        outputColumns = (item) => {

            //Get column width
                var count = item.length;
                var divider;
                var width;

            //Get divider
                divider = 1000;
                

                width = divider / count;
                var index = 0;
                var key;

            return item.map((column) => {

                index ++;
                key = 'column' + key;

                //Remove double quotes
                    column = column.replace(/['"]+/g, '');                    

                return(
                    <CSVcolumn text={column} width={width} key={key} />
                );
            });
        }
    
    //Output
        output = () => {
            var csv = this.state.csvOutput;
            var index = 0;
            var key;
            return csv.map((item) => {    
                index ++;
                key = 'row' + index;
                //Render columns
                  return(
                    <tr className="tableRow" key={key}>
                        {/* Output columns */}
                        {this.outputColumns(item)}
                    </tr>
                  );
            });
        }

    //Component did update
        componentDidUpdate() {
            //Show / hide refresh icon
            if (this.props.baseState.refreshed == true)
            {
                this.props.base.setState({
                    refreshed: false,
                    showRefreshIcon: false,
                });

                this.setState({
                    progress: "notset",
                    csvOutput: "notset",
                });
            }
            if (this.state.progress != "notset" && this.state.csvOutput != "notset" && this.props.baseState.showRefreshIcon === false)
            {
                this.props.base.setState({
                    showRefreshIcon: true,
                });
            }
            else if ((this.state.progress === "notset" || this.state.csvOutput === "notset") && this.props.baseState.showRefreshIcon === true)
            {
                this.props.base.setState({
                    showRefreshIcon: false,
                });
            }
        }

    //Process CVS data
        processCVS = async(r) => {
            //Declare variables that will be used
                var result;
                var output = [];

            //Process result
                result = r.result;

 
            //First, split by new line
            result.split("\n").forEach(function(row) {

                var newLine;

                //Trim
                    newLine = row.trim();

                //Make sure not blank
                    if (newLine.replace(/ /g,'').length > 0)
                    {
                        //Create columns array
                            var columns = [];

                        //Split into each column (,)
                            row.split(",").forEach(function(column) {
                                columns.push(column);
                            });

                        //Add to output array
                            output.push(columns);
                    }
           
            });

                //Set as cvsOutput state
                    await this.setState({
                        csvOutput: output,
                    });
        }
        
    //Uploader function
    uploader = async(files) => {
         
        //Create new FileReader
            var r = new FileReader();

            await this.setState({
                progress: "Uploading ...",
            });

    
    //Percentage tracker
          r.onprogress = (async(e) => { 

            if (e.lengthComputable) {
                //Set the progress %
                    var percentage = Math.round((e.loaded * 100) / e.total);
                    var progress = percentage * 3;
                    console.log('Loaded : '+percentage+'%');
                    this.setState({
                        progress: progress,
                    })
            }                                           
        
          });


        //When loaded
        r.onload = (async() => {
                this.processCVS(r);
          });

        //Read file
        var extension = files[0].name.split('.').pop();

        if (extension != "csv")
        {
            //Not a valid CSV file
            alert("Invalid CSV file");
            return false;
        }
        else
        {
            r.readAsText(files[0]);
        }
    }

	//Render the uploader
    render() 
    {	
        var baseState = this.props.baseState;
        
        //Check if progress is not set
        if (this.state.progress === "notset" || this.props.baseState.refreshed === true)
        {
            return(
                <div className="uploadHolder">
                    {/* Use the ReactFileReader */}
                    <ReactFileReader handleFiles={this.uploader} fileTypes={".csv"}>
                        <div className="uploadButton">
                            {/* "Upload file" text */}
                            {baseState.Texts_Upload}
                        </div>
                    </ReactFileReader>
                </div>
		    );		
        }
        else if (this.state.csvOutput === "notset")
        {
            return(
                <div className="uploadHolder">
                    {/* Use the ReactFileReader */}
                    <ReactFileReader handleFiles={this.uploader} fileTypes={".csv"}>
                        <div className="uploadButton">
                            {/* "Upload file" text */}
                            {baseState.Texts_Upload}
                        </div>
                    </ReactFileReader>

                    {/* Upload progress */}
                    <div>
                        <ProgressBar progress={this.state.progress} />
                    </div>
                </div>
		    );	
        }
        else
        {
            return(
                <div>
                     {/* Upload progress (full) */}
                     <div>
                        <ProgressBar progress="300" />
                    </div>

                    {/* Table of CSV data */}
                    <table>
                        <tbody>
                            {/* Output the data */}
                            {this.output()}
                        </tbody>
                    </table>
                </div>
		    );	
        }
			
		
	}
}

//Export for use
export default CSVuploader;
