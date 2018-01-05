import React, { Component } from "react";
import {blue500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Card from 'material-ui/Card';
import Alert from './Alert';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon/>
  </IconButton>
);

class Forum extends Component {
	render() {
		// loader
		if (this.props.forum.pending) {
			return (<div style={{marginTop: '100px', textAlign: 'center'}}><CircularProgress size={130} thickness={20} /></div>);
		}

		return (
			<div>
				{this.props.forum.error && <Alert error={true} message={this.props.forum.errorMessage} />}
				<Card>
					<List>
				        <Subheader >Forum</Subheader>
						<RaisedButton href="/forum/new" icon={<ContentAddBox />} label="Add New Post" primary={true} style={{margin: '0px 10px 10px 10px'}} />
				      	{ this.props.forum.posts && this.props.forum.posts.map((item) => {
				      		return (
				      			<div key={item.id}>
				      				<Divider/>
				      				<ListItem
								        leftAvatar={<Avatar icon={<ActionAssignment />} 
								        backgroundColor={blue500} />}
								        primaryText={<h4 style={{margin: '0px'}}><a href={`/forum/thread/${item.id}`}>{item.title}</a></h4>}
								        secondaryText={new Date(item.date).toDateString()}
								        {...this.props.loggedIn && parseInt(this.props.loggedInUser,10) === item.author_id && {rightIconButton: 
					        				(<IconMenu iconButtonElement={iconButtonElement}>
												   	<MenuItem onClick={this.props.deletePost.bind(this, item.id)}>Delete</MenuItem>
												  </IconMenu>)
					        			}}
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
