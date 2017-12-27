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
import TextField from 'material-ui/TextField';
import HappyFaceIcon from 'material-ui/svg-icons/social/sentiment-very-satisfied';

const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon />
  </IconButton>
);

const secondaryText = (item) => {
	return (<p>
				{item.body} <br /> 
				<small style={{color: 'black', float: 'right'}}>{new Date(item.date).toDateString()}</small>
			</p>);
}

class Review extends Component {
	handleClick(e){
		e.preventDefault();
		this.props.submitComment({
			author_id: 3,
			review_id: this.props.match.params.id,
			body: this.refs.body.getValue(),
		});
		this.refs.form.reset();
	}

	render() {
		var imgUrl = (this.props.review.review) ? this.props.review.review.photo : '';
		return (
			<div>
				{this.props.review.error && <Alert error={true} message={this.props.review.errorMessage} />}

				{ this.props.review.review && 
					(<Card>
						<Subheader>Review Page</Subheader>
					    <CardHeader
					      title={`Reviewed By: ${this.props.review.review.username}`}
					      subtitle={`Jam Reviewed: ${this.props.review.review.jamTitle} in ${this.props.review.review.city}`}
					      avatar={<Avatar src={this.props.review.review.userPhoto} />}
					    />
					    <Divider />
					    <RaisedButton href={`/profile/${this.props.review.review.author_id}`} label={`Visit ${this.props.review.review.username}'s Profile`} type="submit" primary={true} style={{margin: '12px'}} />
					    <RaisedButton href={`/jams/id/${this.props.review.review.open_mic_id}`} label={`Visit Jam Page`} type="submit" primary={true} style={{margin: '12px'}} />
					    <CardMedia
					      overlay={<CardTitle title={'Review: ' + this.props.review.review.title} />}
					    >
					      <img src={imgUrl} alt="Jam Image" />
					    </CardMedia>
					    <Subheader>Review Body</Subheader>
					    <CardText>
					      {this.props.review.review.body}
					    </CardText>
					  </Card>) }

				<Card style={{margin: '20px 0px'}}>
					<Subheader>Comments</Subheader>
					{ this.props.review.review_replies  &&
						(<List>
							{this.props.review.review_replies.map(item => {
								return (<ListItem	key={item.id}
										        			leftIcon={<Avatar src={item.photo} />} 
										        			primaryText={<h4 style={{margin: '0px'}} ><a href={`/profile/${item.author_id}`}>{item.username}</a></h4>}
										        			secondaryTextLines={2}
										        			secondaryText={secondaryText(item)}
										        			{...this.props.loggedIn && this.props.loggedInUser == item.userId && {rightIconButton: 
										        				(<IconMenu iconButtonElement={iconButtonElement}>
																	   	<MenuItem onClick={this.props.deleteComment.bind(this, item.id, this.props.review.review.id)}>Delete</MenuItem>
																	  </IconMenu>)
										        			}}
										      				/>)
							})}
						</List>)
					}
					<Divider  />
					<div style={{margin: '0px 15px'}}>
						<form ref="form">
							<TextField
							  floatingLabelText="Reply to Review"
							  floatingLabelFixed={true}
							  hintText="Enter reply here"
							  multiLine={true}
							  rows={1}
							  rowsMax={6}
							  fullWidth={true}
							  ref='body'
							/>
							<RaisedButton onClick={this.handleClick.bind(this)} label="Submit" type="submit" primary={true} style={{margin: '12px'}} />
						</form>
					</div>
				</Card>
			</div>
		);
	}
}

export default Review;
