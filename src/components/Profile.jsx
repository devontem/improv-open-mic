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
import Alert from './Alert';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const secondaryText = (item) => {
	return (<p>
				{item.body} <br />
				<a href={`/reviews/id/${item.id}`}>Read More & See Comments...</a>
				<small style={{color: 'black', float: 'right'}}>{new Date(item.date).toDateString()}</small>
			</p>);
}

const nestedItem = (item) => {
	return (
			 <ListItem	key={item.id}
	        			leftIcon={<Avatar src="images/ok-128.jpg" />} 
	        			primaryText={item.author_id}
	        			secondaryTextLines={2}
	      				secondaryText={secondaryText(item)}/>
	);
}

class Profile extends Component {
	render() {
		var imgUrl = (this.props.review.review) ? this.props.review.review.photo : '';
		return (
			<div>
				{this.props.review.error && <Alert error={true} message={this.props.review.errorMessage} />}

				{ this.props.profile.data && 
					(<Card style={{marginBottom: '20px'}}>
						<CardHeader
					      title={<CardTitle style={{paddingBottom: '0px'}} title={this.props.profile.data.username} />} 
					      subtitle={<Subheader>{`Joined: ${new Date(this.props.profile.data.join_date).toDateString()}`}</Subheader>}
					      avatar={<Avatar src={this.props.profile.data.photo} size={100} />}
					    />
					    <Divider />
					    <RaisedButton label={`Follow ${this.props.profile.data.username}`} type="submit" primary={true} style={{margin: '12px'}} />
					  </Card>) }

				<Card>
					<Subheader>Reviews</Subheader>
					{ this.props.openMics.reviews  &&
						(<List>
							{this.props.openMics.reviews.map(nestedItem)}
						</List>)
					}
				</Card>
			</div>
		);
	}
}

export default Profile;
