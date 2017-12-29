import React from 'react';
import {Card} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

const FollowingCard = (props) =>{

	return (
		<div>
			<Card style={{marginBottom: '20px'}}>
				<Subheader>Following</Subheader>
				<Divider />
				{ props.profile.following && 
					<div>
						{props.profile.following.map((item) => {
							return (<div style={{margin: '20px', display: 'inline-block'}} key={item.id}>
										<a href={`/profile/${item.followee}`}>
											<Avatar src={item.photo} size={40} /><br />
											<small style={{textAlign: 'center'}}>{item.username}</small>
										</a>
									</div>);
						})}
					</div> }
			</Card> 
		</div>
	)
}

export default FollowingCard;