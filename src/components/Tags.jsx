import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import {List, ListItem} from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import ActionNoteAdd from 'material-ui/svg-icons/action/note-add';
import CommunicationForum from 'material-ui/svg-icons/communication/forum';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionHome from 'material-ui/svg-icons/action/home';
import SocialPublic from 'material-ui/svg-icons/social/public';
import SocialPeople from 'material-ui/svg-icons/social/people';
import ActionStore from 'material-ui/svg-icons/action/store';
import ActionViewModule from 'material-ui/svg-icons/action/view-module';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const chipStyles = {
	margin: '4px',
	display: 'inline-block'
};

class Tags extends Component {
	componentWillMount(){
		this.state = {
			selected: null
		}
	}

	handleClick(item){
		this.setState({
			selected: item
		});
	}

	sortTags(tags){
		var storage = {};
		tags.forEach(item => {
			if (!storage[item.title]) storage[item.title] = [];
			storage[item.title].push(item);
		});
		return storage;
	}

	render(){
		var tags = (this.props.tags.usedTags) ? this.sortTags(this.props.tags.usedTags) : {};
		return (
			<div>
				{ Object.keys(tags) && 
					(<Card style={{marginBottom: '20px'}}>
						<Subheader>All Tags From Reviews</Subheader>
						<section style={{padding: '20px'}}>
							{Object.keys(tags).map(key => <Chip style={chipStyles} 
																		key={key}																	
																		onClick={e => {e.preventDefault(); this.handleClick(tags[key])}}
																		>
																		{key}
																	</Chip>)}
						</section>

						{this.state.selected &&
							<section>
								<Divider />
								<ListItem primaryText={`Jams with tag: "${this.state.selected[0].title}"`} 
									leftIcon={<ActionHome />} 
									open={true}
									nestedItems={this.state.selected.map((item) => {
										return (<ListItem primaryText={item.openMicTitle} leftIcon={<NavigationChevronRight />} key={item.id} href={`/jams/id/${item.open_mic_id}`} />);
									})} 
								/>
							</section> }
					  </Card>) }
			</div>
		);
	}
}

export default Tags;
