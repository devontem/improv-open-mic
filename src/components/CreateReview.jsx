import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Card, {CardTitle} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone'

class CreateReview extends Component {
	componentWillMount(){
		this.state = {
			accepted: [],
			rejected: []
		}
	}
	handleSubmit(e){
		e.preventDefault();

		// handling form data
		var form = new FormData();
		form.append('title', this.refs.title.getValue());
		form.append('body', this.refs.body.getValue());
		form.append('open_mic_id', 1);
		form.append('author_id', 1);
  		form.append('photo', this.state.accepted[0]);

  		// creating post request
		this.props.createReview(form);
	}

	onDrop(files) {
		this.setState({
			files
		});
		console.log(this.state.files);
	}

	render(){
		if (this.props.forum.success) return (<Redirect to={`/forum/thread/${this.props.forum.createPost.insertId}`}/>)

		return (
			<div>
				<FlatButton href="/reviews" label="GO BACK" labelPosition="after" primary={true} icon={<HardwareKeyboardArrowLeft />}/>
				<Card>
					<Subheader>Create a New Review</Subheader>
					<div style={{padding: '0px 20px 20px'}}>
						<form onSubmit={this.handleSubmit.bind(this)} ref="form">
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
						    <h3>Add Images</h3>
						    <section>
						        <div className="dropzone">
						          <Dropzone
						            accept="image/jpeg, image/png"
						            onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
						          >
						            <p>Try dropping some files here, or click to select files to upload.</p>
						            <p>Only *.jpeg and *.png images will be accepted</p>
						          </Dropzone>
						        </div>
						        <aside>
						          <h2>Accepted files</h2>
						          <ul>
						            {
						              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
						            }
						          </ul>
						          <h2>Rejected files</h2>
						          <ul>
						            {
						              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
						            }
						          </ul>
						        </aside>
						    </section>
						    <RaisedButton label="Submit" type="submit" primary={true} style={{margin: '12px'}} />
						</form>
						</div>
				</Card>
			</div>
		);
	}
}

export default CreateReview;