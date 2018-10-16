import React, { Component } from 'react';
import '../../App.css';
import NaviIcon from './NaviIcon.js';

/*
	Navi icons
	
    Icons as displayed on the RHS of the navi

	Props:
        base (base activity)
        baseState (base state)

*/

class NaviIcons extends Component
{	

    /*
        - - Note about the icons - -

        At the moment, the home icon and the refresh icon do the same thing
        (They wipe the screen clean for a new upload)

        However, the refresh icon only appears after a file is uploaded
        - this is because the refresh icon can better visualise that it is how the user should refresh

        In a "full" version, of course the home icon and refresh icon would probably do different things
        (given that there'd probably be account signups etc before any CSV uploading, as well as about screen etc)


    */

    //Refresh (reload)
	refreshIcon = async() => {
		await this.props.base.setState({
			refreshed: true,
		});
    }

    //Home
    homeIcon = async() => {
        await this.refreshIcon();
    }

    //Contact (send Aaron an email - for now, it uses a mailto link)
    contactIcon = () => {
        window.open("mailto:aaron.mccarthy2@mycit.ie", "_blank");
    }
       
        

	render() {		
       
        var base = this.props.base;
        var baseState = this.props.baseState;

        //Check if small screen (if so, show menu icon)
        
                return(
                    <div>
                        {/* Refresh (only shows when a CSV has been loaded) */}
                        <NaviIcon base={base} text={baseState.Texts_Refresh} icon="fas fa-sync" action={this.refreshIcon} visible={baseState.showRefreshIcon}></NaviIcon>

                        {/* Home */}
                        <NaviIcon base={base} text={baseState.Texts_Home} action={this.homeIcon} icon="fas fa-home"></NaviIcon>
        
                        {/* Contact */}
                        <NaviIcon base={base} text={baseState.Texts_Contact} action={this.contactIcon} icon="fas fa-envelope"></NaviIcon>
                    </div>
                );
            
      
	}
}

export default NaviIcons;