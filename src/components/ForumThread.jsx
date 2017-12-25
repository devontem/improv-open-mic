import React, {Component} from 'react';
import Alert from './Alert';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Card, {CardTitle} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

const secondaryText = (item) => {
	return (<p>
				{item.body} <br /> 
				<small style={{color: 'black', float: 'right'}}>{new Date(item.date).toDateString()}</small>
			</p>);
}

const nestedItem = (item) => {
	return (
			 <ListItem	key={item.id}
	        			leftIcon={<Avatar src={item.photo} />} 
	        			primaryText={item.username}
	        			secondaryTextLines={2}
	        			href={`/profile/${item.author_id}`}
	      				secondaryText={secondaryText(item)}/>
	);
}

class ForumThread extends Component {

	onChange(e) {
		this.setState({
			comment: e.target.value
		});
	}

	handleClick(){
		this.props.submitComment({
			author_id: 1,
			parent_post_id: this.props.match.params.id,
			body: this.state.comment
		});
		// clearing comments
		this.refs.form.reset();
	}

	render(){
		return (
			<div>
				{this.props.forum.error && <Alert error={true} message={this.props.forum.errorMessage} />}
				<FlatButton href="/forum" label="GO BACK" labelPosition="after" primary={true} icon={<HardwareKeyboardArrowLeft />}/>
				{ this.props.forum.thread && this.props.forum.thread.forum_post && 
					(<Card>
						<CardTitle title={`Forum Post: ${this.props.forum.thread.forum_post.title}`} />
						<List>
						<ListItem
						  leftAvatar={<Avatar src={this.props.forum.thread.forum_post.photo} />}
						  primaryText={this.props.forum.thread.forum_post.username}
						  secondaryText={secondaryText(this.props.forum.thread.forum_post)}
						  secondaryTextLines={2}
						  rows={4}
						  open={true}
						  href={`/profile/${this.props.forum.thread.forum_post.author_id}`}
						  nestedItems={this.props.forum.thread.forum_replies.map(nestedItem)}
						/>
						</List>
						<Divider  />
						<div style={{margin: '10px 15px'}}>
							<form ref="form">
								<TextField
								  floatingLabelText="Reply to thread"
								  floatingLabelFixed={true}
								  hintText="Enter reply here"
								  multiLine={true}
								  rows={1}
								  rowsMax={6}
								  fullWidth={true}
								  onChange={this.onChange.bind(this)}
								/>
							</form>
						</div>
						<RaisedButton onClick={this.handleClick.bind(this)} label="Submit" type="submit" primary={true} style={{margin: '12px'}} />
				    </Card>) }
			</div>
		);
	}
}

export default ForumThread;