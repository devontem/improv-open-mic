import React, { Component } from "react";
import {blue500, yellow600, deepOrange500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Card, {CardTitle} from 'material-ui/Card';
import Alert from './Alert';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon/>
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Reply</MenuItem>
    <MenuItem>Forward</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>
);

class Forum extends Component {
	render() {
		console.log(this.props.forum);
		return (
			<div>
				{this.props.forum.error && <Alert error={true} message={this.props.forum.errorMessage} />}

				<Card>
					<List>
				      <Subheader inset={true}>Forum</Subheader>
				      { this.props.forum.posts && this.props.forum.posts.map((item) => {
				      		return (
				      			<div key={item.id}>
				      				<Divider inset={true}/>
				      				<ListItem
								        leftAvatar={<Avatar icon={<ActionAssignment />} 
								        backgroundColor={blue500} />}
								        rightIcon={rightIconMenu}
								        primaryText={item.title}
								        secondaryText={new Date(item.date).toDateString()}
								    />
				      			</div>
				      		);
				      }).reverse()}
				    </List>
				</Card>
			</div>
		);
	}
}

export default Forum;
