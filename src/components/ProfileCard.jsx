import React, {Component} from 'react';
import {Card, CardHeader, CardTitle} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

class ProfileCard extends Component {

	isFollowing(){
		return (this.props.user.following) ? this.props.user.following.map(item => item.followee).includes(parseInt(this.props.match.params.id, 10)) : false;
	}

	handleClick(e){
		e.preventDefault();
		var profileId = this.props.match.params.id;

		console.log(this.props)

		if (this.props.isFollowing){
			this.props.unfollow({
				follower: localStorage.getItem('imp-uid'),
				followee: profileId
			});
		} else {
			this.props.follow({
				follower: localStorage.getItem('imp-uid'),
				followee: profileId
			});
		}
	}
	
	render(){
		var showFollowButton = this.props.match.params.id !== localStorage.getItem('imp-uid');
		return (
			<div>
				{ this.props.profile.data && 
					(<Card style={{marginBottom: '20px'}}>
						<Subheader>Profile Page</Subheader>
						<CardHeader
					      title={<CardTitle href={`/profile/${this.props.profile.data.author_id}`} style={{paddingBottom: '0px'}} 
					      title={this.props.profile.data.username} />} 
					      subtitle={<Subheader>{`Joined: ${new Date(this.props.profile.data.join_date).toDateString()}`}</Subheader>}
					      avatar={<Avatar src={this.props.profile.data.photo} size={100} />}
					    />
					    <Divider />

					    { showFollowButton && 
					    <RaisedButton   label={`${(this.props.isFollowing) ? 'Unfollow' : 'Follow' } ${this.props.profile.data.username}`} 
					    				type="submit" primary={true} 
					    				onClick={this.handleClick.bind(this)}
					    				style={{margin: '12px'}} />}
					  </Card>) }
			</div>
		);
	}
}

export default ProfileCard;