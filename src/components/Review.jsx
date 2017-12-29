import React, { Component } from "react";
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Alert from './Alert';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

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
					      subtitle={<div>Reviewed By: <h3 style={{margin:'0px', display: 'inline-block'}}><a href={`/profile/${this.props.review.review.author_id}`}>{`${this.props.review.review.username}`}</a></h3></div>}
					      title={<div>Jam Reviewed: <h3 style={{margin:'0px', display: 'inline-block'}}><a href={`/jams/id/${this.props.review.review.open_mic_id}`}>{`${this.props.review.review.jamTitle}`}</a></h3></div>}
					      avatar={<Avatar src={this.props.review.review.userPhoto} />}
		      				/>)
					    />
					    <Divider />
					    <RaisedButton href={`/profile/${this.props.review.review.author_id}`} label={`Visit ${this.props.review.review.username}'s Profile`} type="submit" primary={true} style={{margin: '12px'}} />
					    <RaisedButton href={`/jams/id/${this.props.review.review.open_mic_id}`} label={`Visit Jam Page`} type="submit" primary={true} style={{margin: '12px'}} />
					    { this.props.loggedIn && parseInt(this.props.loggedInUser,10) === this.props.review.review.author_id && 
					    		<RaisedButton onClick={this.props.deleteReview.bind(this, this.props.review.review.id)} label={`Delete Review`} primary={false} style={{margin: '12px'}}/>}
					    <CardMedia
					      overlay={<CardTitle title={'Review: ' + this.props.review.review.title} />}
					    >
					      <img src={imgUrl} alt="" />
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
										        			{...this.props.loggedIn && parseInt(this.props.loggedInUser, 10) === item.userId && {rightIconButton: 
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
