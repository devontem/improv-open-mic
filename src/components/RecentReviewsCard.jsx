import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';

const secondaryText = (item) => {
	item.photo = item.photo || 'http://clipartix.com/wp-content/uploads/2016/05/Clip-art-stick-figure-clipart-image.jpeg';
	return (<p>
				{item.body} <br />
				<a href={`/reviews/id/${item.id}`}>Read More & See Comments...</a>
				<small style={{color: 'black', float: 'right'}}>{new Date(item.date).toDateString()}</small>
			</p>);
}

const nestedItem = (item, i) => {
	return (
			 <div key={item.id}>
			 	<ListItem	
	        			leftIcon={<Avatar src={item.photo} />} 
	        			primaryText={`${item.jamTitle} - "${item.reviewTitle}"`}
	        			secondaryTextLines={2}
	      				secondaryText={secondaryText(item)}/>
	      	<Divider />
	      	</div>
	);
}

const RecentReviewsCard = (props) =>{

	return (
		<div>
			<Card style={{marginBottom: '20px'}}>
				<Subheader>Recent Reviews</Subheader>
				<Divider />
				{ props.profile.reviews &&
					(<List>
						{props.profile.reviews.map(nestedItem)}
					</List>)
				}
			</Card>
		</div>
	)
}

export default RecentReviewsCard;