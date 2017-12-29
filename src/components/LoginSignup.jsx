import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Dropzone from 'react-dropzone';
import swal from 'sweetalert';

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

	validate(){
		if (this.props.signUp){
			return this.refs.email.getValue() && this.refs.password.getValue()
					&& this.refs.username.getValue() && this.refs.city.getValue();
		} else {
			return this.refs.email.getValue() && this.refs.password.getValue();
		}
	}

	login(){
		if (this.validate()){
			this.props.dispatchLogin({
	  			email: this.refs.email.getValue().trim(),
	  			password: this.refs.password.getValue()
	  		});
		} else {
			swal("Oops!", "Please fill out all fields!", "error");
		}
	}

	signup(){
		if (this.validate()){
			// handling form data
			var form = new FormData();
			form.append('email', this.refs.email.getValue().trim());
			form.append('password', this.refs.password.getValue());
			form.append('username', this.refs.username.getValue());
			form.append('city', this.refs.city.getValue());
	  		form.append('photo', this.state.accepted[0]);

	  		this.props.dispatchSignUp(form);
	  	} else {
	  		swal("Oops!", "Please fill out all fields!", "error");
	  	}
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
		if (this.props.auth.error) swal("Oops!", this.props.auth.errorMessage, "error");
		if (this.props.auth.success) swal("Welcome!", "Successfully logged in.", "success");

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
						      type="password"
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

						    { (this.props.signUp) ?
						    	<p style={{marginTop: '30px'}}>Already registered? Click <a href='login'>here</a> to log in</p> :
						    	<p style={{marginTop: '30px'}}>Not registered? Click <a href='login?signup=true'>here</a> to sign up</p> }
						</form>
						</div>
				</Card>
			</div>
		);
	}
}

export default LoginSignup;