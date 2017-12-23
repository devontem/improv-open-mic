import React from 'react';
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
import Divider from 'material-ui/Divider';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


import ActionInfo from 'material-ui/svg-icons/action/info';

const JamView = (props) => {
	let countries = {},
	jams_result = [],
	jams = props.openMics.items || [],
	title = (props.groupByCountry) ? 'Countries' : 'All Jams',
	subtitle = (props.groupByCountry) ? 'Browse by Country' : 'All Jams in Database';

	if (props.groupByCountry) {
		// group inside object
		jams.forEach((item) => {
			console.log(item)
			if (!countries[item.country]) countries[item.country] = [];
			countries[item.country].push(item);
		});
		jams_result = Object.keys(countries).map((key, i) => {
			return (<ListItem primaryText={key} 
								key={i}
								leftIcon={<SocialPublic />} 
								nestedItems={countries[key].map((item) => {
									return (<ListItem primaryText={item.title} leftIcon={<NavigationChevronRight />} key={item.id} href={`/jams/id/${item.id}`} />);
								})} 
							/>)
		});
	} else {
		jams_result = jams.map((item) => (<ListItem primaryText={item.title} leftIcon={<NavigationChevronRight />} key={item.id} href={`/jams/id/${item.id}`} />));
	}

	return (
		<Card>
			<CardTitle title={title} subtitle={subtitle} />
			<List>
				{ jams_result }
		    </List>
	    </Card>
	);
}

export default JamView;
