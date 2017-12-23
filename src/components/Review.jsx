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

const secondaryText = (item) => {
	return (<p>
				{item.body} <br /> 
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

class Review extends Component {
	render() {
		console.log(this.props.review.review);
		var imgUrl = (this.props.review.review) ? this.props.review.review.photo : '';
		return (
			<div>
				{this.props.review.error && <Alert error={true} message={this.props.review.errorMessage} />}

				{ this.props.review.review && 
					(<Card>
					    <CardHeader
					      title={`User Review: ${this.props.review.author_id}`}
					      subtitle={`Open Mic Id: ${this.props.review.open_mic_id}`}
					      avatar="images/jsa-128.jpg"
					    />
					    <CardMedia
					      overlay={<CardTitle title={this.props.review.review.title} />}
					    >
					      <img src={imgUrl} alt="Jam Image" />
					    </CardMedia>
					    <CardText>
					      {this.props.review.review.body}
					    </CardText>
					  </Card>) }

				<Card>
					<Subheader>Comments</Subheader>
					{ this.props.review.review_replies  &&
						(<List>
							{this.props.review.review_replies.map(nestedItem)}
						</List>)
					}
				</Card>
			</div>
		);
	}
}

export default Review;
