import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Card, {CardTitle} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { Redirect } from 'react-router-dom';

class NewForumPost extends Component {
	componentWillMount(){
		if (!this.props.loggedIn) this.props.history.push('/login');
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.createForumPost({
			title: this.refs.title.getValue(),
			body: this.refs.body.getValue(),
			date: new Date()
		});
	}

	render(){
		if (this.props.forum.success) return (<Redirect to={`/forum/thread/${this.props.forum.createPost.insertId}`}/>)

		return (
			<div>
				<FlatButton href="/forum" label="GO BACK" labelPosition="after" primary={true} icon={<HardwareKeyboardArrowLeft />}/>
				<Card>
					<Subheader>Create a New Forum Post</Subheader>
					<div style={{padding: '0px 20px 20px'}}>
						<form onSubmit={this.handleSubmit.bind(this)}>
							<TextField
						      hintText="Enter Here"
						      floatingLabelText="Post Title"
						      floatingLabelFixed={true}
						      fullWidth={true}
						      ref="title"
						      errorText="This field is required"
						    />
						    <TextField
						      floatingLabelText="Post Body"
						      floatingLabelFixed={true}
						      multiLine={true}
						      ref="body"
						      rows={1}
						      rowsMax={6}
						      fullWidth={true}
						    />
						    <RaisedButton label="Submit" type="submit" primary={true} style={{margin: '12px'}} />
						</form>
						</div>
				</Card>
			</div>
		);
	}
}

export default NewForumPost;