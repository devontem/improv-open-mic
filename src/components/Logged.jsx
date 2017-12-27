import React, {Component} from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class Logged extends Component {
  signout(){
    localStorage.removeItem('imp-uid');
    localStorage.removeItem('imp-tok');
    this.props.history.push('/');
  }
  render(){
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