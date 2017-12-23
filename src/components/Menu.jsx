import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import CommunicationForum from 'material-ui/svg-icons/communication/forum';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialPublic from 'material-ui/svg-icons/social/public';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionStore from 'material-ui/svg-icons/action/store';
import ActionViewModule from 'material-ui/svg-icons/action/view-module';
import Divider from 'material-ui/Divider';


import ActionInfo from 'material-ui/svg-icons/action/info';
import Card from 'material-ui/Card';

const Menu = (props) => {
	return (
		<Card>
			<List>
		      <ListItem primaryText="Home" leftIcon={<ActionHome />} />
		      <ListItem primaryText="Find Jams" 
		      			leftIcon={<ActionStore />} 
		      			nestedItems={[
		      					<ListItem primaryText="Search" href="/search" leftIcon={<ActionSearch />} />,
		      					<ListItem primaryText="Tags" leftIcon={<ActionViewModule />} />,
		      					<ListItem primaryText="Countries" leftIcon={<SocialPublic />} />,
		      				]}/>
		      <ListItem primaryText="Forum" href="/forum" leftIcon={<CommunicationForum />} />
		      <Divider />
		      <ListItem primaryText="Add Jam" leftIcon={<ContentAddCircle />} />
		      <ListItem primaryText="Add Review" leftIcon={<ActionNoteAdd />} />
		    </List>

		    { (props.loggedIn) ?
		    	<div>
			    	<Divider />
			    	<List>
				      <ListItem primaryText="My Profile" leftIcon={<ContentInbox />} />
				      <ListItem primaryText="My Venues" leftIcon={<ActionGrade />} />
				      <ListItem primaryText="Following" leftIcon={<ContentSend />} />
				      <ListItem primaryText="Followers" leftIcon={<ContentSend />} />
				      <ListItem primaryText="My Reviews" leftIcon={<ContentDrafts />} />
				      <Divider />
				      <ListItem primaryText="Add Jam" leftIcon={<ContentInbox />} />
				    </List>
				</div> : '' }
	    </Card>
	);
}

export default Menu;
