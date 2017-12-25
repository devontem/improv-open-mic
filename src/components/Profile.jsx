import React, { Component } from "react";
import {blue500, yellow600, deepOrange500} from 'material-ui/styles/colors';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import Alert from './Alert';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ContentAddBox from 'material-ui/svg-icons/content/add-box';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import FollowingCard from './FollowingCard';
import FollowerCard from './FollowerCard';
import RecentReviewsCard from './RecentReviewsCard';
import ProfileCard from './ProfileCard';

class Profile extends Component {
	render() {
		var imgUrl = (this.props.review.review) ? this.props.review.review.photo : '';
		var isFollowing = (this.props.user.following) ? this.props.user.following.map(item => item.followee).includes(parseInt(this.props.match.params.id)) : false;
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
