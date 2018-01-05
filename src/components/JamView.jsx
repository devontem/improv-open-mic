import React from 'react';
import {List, ListItem} from 'material-ui/List';
import SocialPublic from 'material-ui/svg-icons/social/public';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import {Card, CardTitle} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';

const JamView = (props) => {
	let countries = {},
	jams_result = [],
	jams = props.openMics.items || [],
	title = (props.groupByCountry) ? 'Countries' : 'All Jams',
	subtitle = (props.groupByCountry) ? 'Browse by Country' : 'All Jams in Database';

	if (props.groupByCountry) {
		// group inside object
		jams.forEach((item) => {
			if (!countries[item.country]) countries[item.country] = [];
			countries[item.country].push(item);
		});
		jams_result = Object.keys(countries).map((key, i) => {
			return (<ListItem primaryText={key} 
								key={i}
								leftIcon={<SocialPublic />} 
								open={true}
								nestedItems={countries[key].map((item) => {
									return (<ListItem primaryText={item.title} leftIcon={<NavigationChevronRight />} key={item.id} href={`/jams/id/${item.id}`} />);
								})} 
							/>)
		});
	} else {
		jams_result = jams.map((item) => (<ListItem primaryText={item.title} leftIcon={<NavigationChevronRight />} key={item.id} href={`/jams/id/${item.id}`} />));
	}

	// loader
	if (props.openMics.pending) {
		return (<div style={{marginTop: '100px', textAlign: 'center'}}><CircularProgress size={130} thickness={20} /></div>);
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
