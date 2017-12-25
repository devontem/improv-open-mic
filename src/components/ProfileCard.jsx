import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';

const ProfileCard = (props) =>{

	return (
		<div>
			{ props.profile.data && 
				(<Card style={{marginBottom: '20px'}}>
					<Subheader>Profile Page</Subheader>
					<CardHeader
				      title={<CardTitle href={`/profile/${props.profile.data.author_id}`} style={{paddingBottom: '0px'}} title={props.profile.data.username} />} 
				      subtitle={<Subheader>{`Joined: ${new Date(props.profile.data.join_date).toDateString()}`}</Subheader>}
				      avatar={<Avatar src={props.profile.data.photo} size={100} />}
				    />
				    <Divider />
				    <RaisedButton label={`Follow ${props.profile.data.username}`} type="submit" primary={true} style={{margin: '12px'}} />
				  </Card>) }
		</div>
	)
}

export default ProfileCard;