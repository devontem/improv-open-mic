import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Card, {CardTitle} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

class NewForumPost extends Component {
	handleSubmit(e){
		e.preventDefault();
		this.props.createForumPost({
			title: this.refs.title.getValue(),
			body: this.refs.body.getValue(),
			date: new Date()
		});
	}

	render(){
		return (
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
		);
	}
}

export default NewForumPost;