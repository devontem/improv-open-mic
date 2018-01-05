import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import swal from 'sweetalert';
import CircularProgress from 'material-ui/CircularProgress';

class Account extends Component {
	handleSubmit(e){
		e.preventDefault();
		var id = localStorage.getItem('imp-uid');

		if (this.validate()){
			this.props.updateProfile(id, {
				username: this.refs.username.getValue(),
				email: this.refs.email.getValue(),
				password: this.refs.password.getValue()
			});
		} else {
			swal("Oops!", "Please fill out all fields!", "error");
		}
	}

	validate(){
		return Object.keys(this.refs).every((key)=>{
			return this.refs[key].getValue();
		});
	}

	render(){
		// loader
		if (this.props.profile.pending) {
			return (<div style={{marginTop: '100px', textAlign: 'center'}}><CircularProgress size={130} thickness={20} /></div>);
		}

		return (
			<div>
				{ this.props.profile.data &&
					<Card>
						<Subheader>Update Account</Subheader>
						<div style={{padding: '0px 20px 20px'}}>
							<form onSubmit={this.handleSubmit.bind(this)}>
								<TextField
							      hintText="Enter Here"
							      floatingLabelText="Username"
							      floatingLabelFixed={true}
							      fullWidth={true}
							      ref="username"
							      defaultValue={this.props.profile.data.username}
							    />
							    <TextField
							      floatingLabelText="Email"
							      floatingLabelFixed={true}
							      multiLine={true}
							      ref="email"
							      rows={1}
							      rowsMax={6}
							      fullWidth={true}
							      defaultValue={this.props.profile.data.email.replace(/'/g,'')}
							    />
							    <TextField
							      hintText="Enter Here"
							      floatingLabelText="Enter New or Old Password to Submit"
							      floatingLabelFixed={true}
							      fullWidth={true}
							      ref="password"
							      type="password"
							    />
							    <RaisedButton label="Submit" type="submit" primary={true} style={{margin: '12px'}} />
							</form>
							</div>
					</Card>
				}
			</div>
		);
	}
}

export default Account;