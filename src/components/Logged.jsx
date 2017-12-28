import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Redirect } from 'react-router-dom';

class Logged extends Component {
  componentWillMount(){
    this.state = {
      redirect: false
    };
  }
  signout(){
    localStorage.removeItem('imp-uid');
    localStorage.removeItem('imp-tok');
    this.setState({redirect: true})
  }
  render(){
    if (this.state.redirect) return (<Redirect to={`/`}/>);
  	return (
  		<IconMenu
      {...this.props}
      iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
      <MenuItem primaryText="Account" href="/account" />
      <MenuItem primaryText="Sign out" onClick={this.signout.bind(this)} />
    </IconMenu>
  	);
  }
};

export default Logged;