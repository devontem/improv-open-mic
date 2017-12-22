import React, { Component } from "react";
import {blue500, yellow600} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Card from 'material-ui/Card';

class Forum extends Component {

	render() {
		return (
			<Card>
				<List>
			      <Subheader inset={true}>Forum</Subheader>
			      <ListItem
			        leftAvatar={<Avatar icon={<ActionAssignment />} backgroundColor={blue500} />}
			        rightIcon={<ActionInfo />}
			        primaryText="Vacation itinerary"
			        secondaryText="Jan 20, 2014"
			      />
			      <Divider inset={true}/>
			      <ListItem
			        leftAvatar={<Avatar icon={<EditorInsertChart />} backgroundColor={yellow600} />}
			        rightIcon={<ActionInfo />}
			        primaryText="Kitchen remodel"
			        secondaryText="Jan 10, 2014"
			      />
			    </List>
			</Card>
		);
	}
}

export default Forum;
