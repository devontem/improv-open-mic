import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class NewForumPost extends Component {
	componentWillMount(){
		if (!this.props.loggedIn) {
			swal("Oops!", "Please log in or sign up", "error");
			this.props.history.push('/login');
		}
	}

	validate(){
		return Object.keys(this.refs).every((key)=>{
			return this.refs[key].getValue();
		});
	}

	handleSubmit(e){
		e.preventDefault();

		if (this.validate()){
			this.props.createForumPost({
				title: this.refs.title.getValue(),
				body: this.refs.body.getValue(),
				date: new Date()
			});
		} else {
			swal("Oops!", "Please fill out all fields!", "error");
		}
	}

	render(){
		if (this.props.forum.success) {
			swal("Success!", "Your forum post has been created.", "success");
			return (<Redirect to={`/forum/thread/${this.props.forum.createPost.insertId}`}/>);
		}
		if (this.props.forum.success) swal("Error", "There was a problem with your submission. Please try again later.", "error");


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