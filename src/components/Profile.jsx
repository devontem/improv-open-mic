import React, { Component } from "react";
import Alert from './Alert';
import FollowingCard from './FollowingCard';
import FollowerCard from './FollowerCard';
import RecentReviewsCard from './RecentReviewsCard';
import ProfileCard from './ProfileCard';
import CircularProgress from 'material-ui/CircularProgress';

class Profile extends Component {
	render() {
		var isFollowing = (this.props.user.following) ? this.props.user.following.map(item => item.followee).includes(parseInt(this.props.match.params.id, 10)) : false;

		// loader
		if (this.props.profile.pending) {
			return (<div style={{marginTop: '100px', textAlign: 'center'}}><CircularProgress size={130} thickness={20} /></div>);
		}

		return (
			<div>
				{this.props.review.error && <Alert error={true} message={this.props.review.errorMessage} />}

				{ this.props.showAll &&
					<ProfileCard isFollowing={isFollowing} {...this.props} /> }

				{ (this.props.followingView || this.props.showAll) &&
					<FollowingCard {...this.props} /> }

				{ (this.props.followerView || this.props.showAll) &&
					<FollowerCard {...this.props} /> }

				{ (this.props.reviewsView || this.props.showAll) &&
					<RecentReviewsCard {...this.props} /> }
		</div>
		);
	}
}

export default Profile;
