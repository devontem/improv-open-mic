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
import ActionAccessibility from 'material-ui/svg-icons/action/accessibility';
import Divider from 'material-ui/Divider';



import ActionInfo from 'material-ui/svg-icons/action/info';
import Card from 'material-ui/Card';

const Menu = (props) => {
	var id = localStorage.getItem('imp-uid');
	return (
		<Card>
			<List>
		      <ListItem primaryText="Home" leftIcon={<ActionHome />} />
		      <ListItem primaryText="Forum" href="/forum" leftIcon={<CommunicationForum />} />
					<ListItem primaryText="Search" href="/search" leftIcon={<ActionSearch />} />
					<ListItem primaryText="All Jams" href="/jams" leftIcon={<ActionAccessibility />} />
					<ListItem primaryText="Tags" href="/tags"  leftIcon={<ActionViewModule />} />
					<ListItem primaryText="Countries" href="/jams?country=true" leftIcon={<SocialPublic />} />
		      <Divider />
		      <ListItem primaryText="Add Jam" href="/jams/new" leftIcon={<ContentAddCircle />} />
		      <ListItem primaryText="Add Review" href="/reviews/new" leftIcon={<ActionNoteAdd />} />
		    </List>

		    { (props.loggedIn) ?
		    	<div>
			    	<Divider />
			    	<List>
				      <ListItem primaryText="My Profile" href={`/profile/${id}`} leftIcon={<ContentInbox />} />
				      <ListItem primaryText="Following" href={`/profile/${id}?following=true`} leftIcon={<ContentSend />} />
				      <ListItem primaryText="Followers" href={`/profile/${id}?followers=true`} leftIcon={<ContentSend />} />
				      <ListItem primaryText="My Reviews" href={`/profile/${id}?reviews=true`} leftIcon={<ContentDrafts />} />
				    </List>
				</div> : '' }
	    </Card>
	);
}

export default Menu;
