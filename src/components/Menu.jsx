import React from 'react';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Card from 'material-ui/Card';

const Menu = (props) => {
	return (
		<Card>
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
