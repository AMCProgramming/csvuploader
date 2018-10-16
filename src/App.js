import React, { Component } from 'react';
import './App.css';
import './Fonts.css';
import Navi from './elements/interface/Navi.js';
import CSVuploader from './elements/components/csv_uploader.js';


/*
	- - This is the main file - -

	State:
		title:					title of the app - shown on the navigation menu
		windowWidth:			width of screen - handy for optimising the app for different screen sizes
		windowHeight:			height of screen - to optimise for different screen sizes
		isSmallScreen:			is it a small screen?
		isMediumScreen:			is it a medium-sized screen?
		titleSize:				how big should the title on the navigation menu be?
		pageBackgroundColour:	what colour is the page?
		Texts_Refresh:			used in the label for the refresh icon
		Texts_Home:				used in the label for the home icon
		Texts_Contact:			used in the label for the contact icon
		Texts_Upload:			the text on the upload button
		showRefreshIcon:		should the refresh icon be displayed?
		refreshed:				has the app been refreshed?
*/


class App extends Component {
	
	//Set the states
		constructor(props) {
			super(props)
			this.state = {
				title: 'CSV Uploader',
				windowWidth: '',
				windowHeight: '',
				isSmallScreen: false,
				isMediumScreen: false,
				titleSize: 28,
				pageBackgroundColour: '#FFFFFF',
				Texts_Refresh: "Refresh",
				Texts_Home: "Home",
				Texts_Contact: "Email Aaron",
				Texts_Upload: "Upload a CSV file",
				showRefreshIcon: false,
				refreshed: false,
			}
		}

	
	//When component updates
		componentDidMount = async() => {
			await this.windowDimensions();
			await window.addEventListener('resize', this.windowDimensions);
		}

	//When component unmounts
		componentWillUnmount = async() => {
			await window.removeEventListener('resize', this.windowDimensions);
		}

	//Get window dimensions and determine if it is big or small screen
		windowDimensions = async() => {
			var width = window.innerWidth;
			var height = window.innerHeight;
			var isSmallScreen = '';
			var isMediumScreen = '';
			var titleSize = '';

			//Check width
			if (width < 700)
			{
				//If width is under 700 it is a small screen
				isSmallScreen = await true;

				//Set title size to 20
				titleSize = await 20;
			}
			else if (width < 1180)
			{
				//If width is greater than / equal to 700 and less than 1180, it is a medium-sized screen
				isMediumScreen = await true;

				//Not a small screen
				isSmallScreen = await false;

				//Set title size to 24
				titleSize = await 24;
			}
			else
			{
				//Otherwise, it is a big screen
				//Not a small screen
				isSmallScreen = await false;

				//Not a medium screen
				isMediumScreen = await false;

				//Set title size to 28
				titleSize = await 28;
			}


			//Set these changes
			await this.setState({
				windowWidth: width,
				windowHeight: height,
				isSmallScreen: isSmallScreen,
				isMediumScreen: isMediumScreen,
				titleSize: titleSize,
			});

			try {
				//Try to get the height of the navigation menu so that it won't block any content initially
				await this.naviHeight();
			}
			catch(err)
			{
				//Output why it couldn't get the navigation menu's height
				console.log(err);
			}
		}
	
	//Get navi height (so it doesn't block content initially)
		naviHeight = async() => {
			var height = await this.Navi.clientHeight;
			height = await height;
			await this.setState({
				naviHeight: height,
			});
		}


//Output
  render() {
    return (
		<div className="body">
			{/* Navi */}
			<Navi title={this.state.title} base={this} baseState={this.state}/>
	
			{/* Page holder (has room here to potentially include a sidebar later) */}
			<div class="pageHolder">
			
				{/* Page content */}
				<div class="page">
					{/* CSV uploader */}
					<CSVuploader base={this} baseState={this.state} />
				</div>
			</div>
		</div>
    );
  }
}


//Export for use
export default App;
