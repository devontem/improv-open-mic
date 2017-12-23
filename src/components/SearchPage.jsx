import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import Card, {CardTitle} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

class SearchPage extends Component {

	componentWillMount(){
		this.state = {
			searchItems: []
		};
	}

	handleChange(e){
		var text = e.target.value.toLowerCase();
		var searchitems = this.props.openMics.items.filter(item => text && item.title.toLowerCase().includes(text));
		this.setState({
			searchItems: searchitems
		});
	}

	render(){
		return (
			<Card>
				<Subheader>Search For Jams</Subheader>
				<div style={{margin: '0px 20px'}}>
					<form ref="form">
						<TextField
					      hintText="Enter Text Here"
					      floatingLabelFixed={true}
					      fullWidth={true}
					      onChange={this.handleChange.bind(this)}
					    />
				    </form>
			    </div>
			    { this.state.searchItems.length && 
			    	<div>
						<List style={{margin: '0px 10px'}}>
							{ this.state.searchItems.map(item => <ListItem key={item.id} primaryText={item.title} />) }
						<Divider />
						</List>
					</div> }
			</Card>
		);
	}
}

export default SearchPage;