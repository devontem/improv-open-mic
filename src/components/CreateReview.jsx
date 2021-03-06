import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import swal from 'sweetalert';
import CircularProgress from 'material-ui/CircularProgress';

class CreateReview extends Component {
	componentWillMount(){
		this.state = {
			accepted: [],
			rejected: [],
			select: null,
			tagOne: null,
			tagTwo: null
		}

		if (!this.props.loggedIn) {
			swal("Oops!", "Please log in or sign up", "error");
			this.props.history.push('/login');
		}
	}

	handleJamSelect(e, i, value){
		this.setState({select: value});
	}
	handleTagOne(e, i, value){
		this.setState({tagOne: value});
	}
	handleTagTwo(e, i, value){
		this.setState({tagTwo: value});
	}
	handleSubmit(e){
		e.preventDefault();

		if (this.validate()){
			// handling form data
			var form = new FormData();
			form.append('title', this.refs.title.getValue());
			form.append('body', this.refs.body.getValue());
			form.append('open_mic_id', this.state.select);
	  		form.append('photo', this.state.accepted[0]);
	  		form.append('tagOne', this.state.tagOne);
	  		form.append('tagTwo', this.state.tagTwo);
	  		// creating post request
		 	this.props.createReview(form);
		 } else {
		 	swal("Oops!", "Please fill out all fields!", "error");
		 }
	}

	validate(){
		return Object.keys(this.refs).every((key)=>{
			return this.refs[key].getValue();
		}) 
		&& this.state.tagOne 
		&& this.state.tagTwo 
		&& this.state.select;
	}

	onDrop(files) {
		this.setState({
			files
		});
	}

	render(){
		if (this.props.review.success) {
			swal("Success!", "Your review has been created.", "success");
			return (<Redirect to={`/reviews/id/${this.props.review.data.insertId}`}/>)
		}
		if (this.props.review.error) swal("Error!", "There was a problem with your submission. Please try again later.", "error");
		if (this.props.openMics.error || this.props.tags.error ) swal("Error!", "There was a problem with this request. Please try again later.", "error");

		// loader
		if (this.props.openMics.pending || this.props.tags.pending) {
			return (<div style={{marginTop: '100px', textAlign: 'center'}}><CircularProgress size={130} thickness={20} /></div>);
		}

		return (
			<div>
				<FlatButton href="/" label="GO BACK" labelPosition="after" primary={true} icon={<HardwareKeyboardArrowLeft />}/>
				{ this.props.openMics.items && this.props.tags.data &&
					<Card>
						<Subheader>Create a New Review</Subheader>
						<div style={{padding: '0px 20px 20px'}}>
							<form onSubmit={this.handleSubmit.bind(this)}>
								<SelectField
									value={this.state.select}
							        maxHeight={200}
							        fullWidth={true}
							        floatingLabelText="Select Jam to Review"
							        onChange={this.handleJamSelect.bind(this)}
							      >
							        {this.props.openMics.items.map((item) => <MenuItem value={item.id} key={item.id} primaryText={item.title} /> )}
							      </SelectField>
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
							    <section>
							    	<SelectField
									value={this.state.tagOne}
							        maxHeight={200}
							        fullWidth={false}
							        floatingLabelText="Pick a tag"
							        onChange={this.handleTagOne.bind(this)}
							      	>
										{this.props.tags.data.map((item) => <MenuItem value={item.id} key={item.id} primaryText={item.title} /> )}
									</SelectField>
									<SelectField
									value={this.state.tagTwo}
									maxHeight={200}
									fullWidth={false}
									floatingLabelText="Pick a tag"
									onChange={this.handleTagTwo.bind(this)}
									>
										{this.props.tags.data.map((item) => <MenuItem value={item.id} key={item.id} primaryText={item.title} /> )}
									</SelectField>
							    </section>
							    <h3>Add One (1) Review Image</h3>
							    <section>
							        <div className="dropzone">
							          <Dropzone
							            accept="image/jpeg, image/png"
							            onDrop={(accepted, rejected) => { this.setState({ accepted, rejected }); }}
							          >
							            <p>Drop your image here, or click to select image to upload.</p>
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
					</Card> }
			</div>
		);
	}
}

export default CreateReview;