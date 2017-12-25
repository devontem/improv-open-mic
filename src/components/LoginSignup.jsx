import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Card, {CardTitle} from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import { Redirect } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import Alert from './Alert';

class LoginSignup extends Component {
	componentWillMount(){
		this.state = {
			accepted: [],
			rejected: []
		}

		// redirect on login
		if (this.loggedIn()){
			var id = localStorage.getItem('imp-uid');
			this.props.history.push('/profile/' + id);
		}
	}

	// runs on every re-render
	componentDidUpdate(){
		if (this.props.auth.success){

			// Setting the token & user is
			localStorage.setItem('imp-tok', this.props.auth.token);
			localStorage.setItem('imp-uid', this.props.auth.user.id);

			//showing the confirmation message
			// swal("Welcome Back", "You are now logged in", "success")

			// redirecting to the user's home page
			var id = this.props.auth.user.id;
			this.props.history.push('/profile/' + id);
		}
	}

	handleSubmit(e){
		e.preventDefault();

		if (this.props.signUp){
			this.signup();
		} else {
			this.login();
		}
	}

	login(){
		this.props.dispatchLogin({
  			email: this.refs.email.getValue(),
  			password: this.refs.password.getValue()
  		});
	}

	signup(){
		// handling form data
		var form = new FormData();
		form.append('email', this.refs.email.getValue());
		form.append('password', this.refs.password.getValue());
		form.append('username', this.refs.username.getValue());
		form.append('city', this.refs.city.getValue());
  		form.append('photo', this.state.accepted[0]);

  		this.props.dispatchSignUp(form);
	}

	onDrop(files) {
		this.setState({
			files
		});
	}

	loggedIn(){
		return localStorage.getItem('imp-tok') && localStorage.getItem('imp-uid');
	}


	render(){
		{this.props.auth.error && <Alert error={true} message={this.props.auth.errorMessage} />}

		return (
			<div>
				<Card>
					<Subheader>{(this.props.signUp) ? 'Sign Up' : 'Login'}</Subheader>
					<div style={{padding: '0px 20px 20px'}}>
						<form onSubmit={this.handleSubmit.bind(this)}>
							<TextField
						      hintText="Enter Here"
						      floatingLabelText="Email"
						      floatingLabelFixed={true}
						      fullWidth={true}
						      ref="email"
						    />
						    <TextField
						      hintText="Enter Here"
						      floatingLabelText="Password"
						      floatingLabelFixed={true}
						      fullWidth={true}
						      ref="password"
						    />

						    { this.props.signUp && 
						    	<div>
						    		<TextField
								      floatingLabelText="Username"
								      floatingLabelFixed={true}
								      fullWidth={true}
								      ref="username"
								    />
							    	<TextField
								      floatingLabelText="City"
								      floatingLabelFixed={true}
								      fullWidth={true}
								      ref="city"
								    />
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
							    </div>

						    }
						    <RaisedButton label="Submit" type="submit" primary={true} style={{margin: '12px'}} />
						</form>
						</div>
				</Card>
			</div>
		);
	}
}

export default LoginSignup;