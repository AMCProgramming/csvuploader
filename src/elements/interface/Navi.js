import React, { Component } from 'react';
import '../../App.css';
import NaviIcons from './NaviIcons.js';

/*
	Navi
	
	This is the navigation menu at the top
	
	Props:
		title (what should it say?)

*/

class Navi extends Component
{	
	//Component did mount
		componentDidMount = async()  => {
			/*
				The navigation menu always displays at the top of the screen, even in scrolling
				
				Therefore, we should calculate the height of the navigation menu so it doesn't
				block anything.
			*/

			await this.props.base.naviHeight();
		}

	//This class renders the navigation menu at the top
	render() {		

		//Get the base file and that file's state
		var baseState = this.props.baseState;
		var base = this.props.base;

		return(
			<div>
				<div className="navi" ref={(Navi) => base.Navi = Navi} className="navi">
					{/* Navi inner: this is a flexbox */}
					<div className="naviInner">
						{/* Left content */}
						<div className="naviLeft">
							{/* Site title */}
							<div className="naviTitle" style={{fontSize: baseState.titleSize + 'px'}}>
								{this.props.title}
							</div>
						</div>
						
						{/* Centre content */}
						<div className="naviCentre">
							
						</div>

						{/* Right content */}
						<div className="naviRight">
							<div className="naviRightInner">
								<NaviIcons base={base} baseState={baseState}/>
							</div>
						</div>
					</div>
				</div>
				{/* Spacing for initial navigation position (ie we don't want the navi to block the page content */}
				<div style={{height: base.state.naviHeight}}></div>
				</div>
				);
			}
			
		
	}

//Export for use
export default Navi;