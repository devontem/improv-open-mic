import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { Redirect } from 'react-router-dom';
import swal from 'sweetalert';

class CreateJam extends Component {
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
		
  		// creating post request
  		if (this.validate()) {
  			this.props.createJam({
				title: this.refs.title.getValue(),
				venue: this.refs.venue.getValue(),
				day_of_week: this.refs.day_of_week.getValue(),
				start_time: this.refs.start_time.getValue(),
				end_time: this.refs.end_time.getValue(),
				city: this.refs.city.getValue(),
				country: this.refs.country.getValue()
			});
  		} else {
  			swal("Oops!", "Please fill out all fields!", "error");
  		}
	}

	render(){
		if (this.props.openMics.success) {
			swal("Success!", "Your jam has been created.", "success");
			return (<Redirect to={`/jams/id/${this.props.openMics.items.insertId}`}/>);
		}
		if (this.props.openMics.error) swal("Error!", "There was a problem with your submission. Please try again later.", "error");
		return (
			<div>
				<FlatButton href="/jams" label="GO BACK" labelPosition="after" primary={true} icon={<HardwareKeyboardArrowLeft />}/>
				<Card>
					<Subheader>Create a New Jam Page</Subheader>
					<div style={{padding: '0px 20px 20px'}}>
						<form onSubmit={this.handleSubmit.bind(this)}>
							<TextField
						      hintText="Enter Here"
						      floatingLabelText="Title"
						      floatingLabelFixed={true}
						      fullWidth={true}
						      ref="title"
						    />
						    <TextField
						      floatingLabelText="Venue"
						      hintText="The Improv Comedy Theatre"
						      floatingLabelFixed={true}
						      multiLine={true}
						      ref="venue"
						      rows={1}
						      rowsMax={6}
						      fullWidth={true}
						    />
						    <TextField
						      floatingLabelText="Day of The Week"
						      floatingLabelFixed={true}
						      multiLine={true}
						      ref="day_of_week"
						      hintText="Tuesday"
						      rows={1}
						      rowsMax={6}
						      fullWidth={true}
						    />
						    <TextField
						      floatingLabelText="Start Time"
						      floatingLabelFixed={true}
						      multiLine={true}
						      ref="start_time"
						      hintText="6:00pm"
						      rows={1}
						      rowsMax={6}
						      fullWidth={true}
						    />
						    <TextField
						      floatingLabelText="End Time"
						      floatingLabelFixed={true}
						      multiLine={true}
						      ref="end_time"
						      hintText="10:00pm"
						      rows={1}
						      rowsMax={6}
						      fullWidth={true}
						    />
						    <TextField
						      floatingLabelText="City"
						      floatingLabelFixed={true}
						      multiLine={true}
						      ref="city"
						      hintText="Hatfield"
						      rows={1}
						      rowsMax={6}
						      fullWidth={true}
						    />
						    <TextField
						      floatingLabelText="Country"
						      floatingLabelFixed={true}
						      multiLine={true}
						      ref="country"
						      hintText="United Kingdom"
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

export default CreateJam;