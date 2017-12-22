import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentAdd from 'material-ui/svg-icons/content/add';
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
		      <ListItem primaryText="Forum" leftIcon={<CommunicationForum />} />
		      <ListItem primaryText="Search" leftIcon={<ActionSearch />} />
		      <ListItem primaryText="Tags" leftIcon={<ActionViewModule />} />
		      <ListItem primaryText="Countries" leftIcon={<SocialPublic />} />
		      <ListItem primaryText="Venues" leftIcon={<ActionStore />} />
		      <ListItem primaryText="Social" leftIcon={<SocialPeople />} />
		      <Divider />
		      <ListItem primaryText="Add Jam" leftIcon={<ContentAdd />} />
		    </List>

		    { (props.loggedIn) ?
		    	<div>
			    	<Divider />
			    	<List>
				      <ListItem primaryText="Home" leftIcon={<ContentInbox />} />
				      <ListItem primaryText="Forum" leftIcon={<ActionGrade />} />
				      <ListItem primaryText="Search" leftIcon={<ContentSend />} />
				      <ListItem primaryText="Tags" leftIcon={<ContentSend />} />
				      <ListItem primaryText="Countries" leftIcon={<ContentDrafts />} />
				      <ListItem primaryText="Venues" leftIcon={<ContentInbox />} />
				      <ListItem primaryText="Social" leftIcon={<ContentInbox />} />
				      <Divider />
				      <ListItem primaryText="Add Jam" leftIcon={<ContentInbox />} />
				    </List>
				</div> : '' }
	    </Card>
	);
}

export default Menu;
