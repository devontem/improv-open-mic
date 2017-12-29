import React from 'react';
import {Card} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

const FollowerCard = (props) =>{

	return (
		<div>
			<Card style={{marginBottom: '20px'}}>
				<Subheader>Followers</Subheader>
				<Divider />
				{ props.profile.followers && 
					<div>
						{props.profile.followers.map((item) => {
							return (<div style={{margin: '20px', display: 'inline-block'}} key={item.id}>
										<a href={`/profile/${item.follower}`}>
											<Avatar src={item.photo} size={40} /> <br />
											<small style={{textAlign: 'center'}}>{item.username}</small>
										</a>
									</div>);
						})}
					</div> }
			</Card>
		</div>
	)
}

export default FollowerCard;