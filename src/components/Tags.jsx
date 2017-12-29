import React, {Component} from 'react';
import {Card} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';
import {ListItem} from 'material-ui/List';
import ActionHome from 'material-ui/svg-icons/action/home';
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
