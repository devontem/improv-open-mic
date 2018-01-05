import React, { Component } from "react";
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Alert from './Alert';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {GridList, GridTile} from 'material-ui/GridList';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};

const secondaryText = (item) => {
	return (<p>
				{item.body} <br />
				<a href={`/reviews/id/${item.id}`}>Read more & see comments...</a>
				<small style={{color: 'black', float: 'right'}}>{new Date(item.date).toDateString()}</small>
			</p>);
}

const nestedItem = (item) => {
	return (
			 <ListItem	key={item.id}
	        			leftIcon={<Avatar  src={item.photo} />} 
	        			primaryText={item.username}
	        			secondaryTextLines={2}
	        			href={`/reviews/id/${item.id}`}
	      				secondaryText={secondaryText(item)}/>
	);
}

class Jam extends Component {
	render() {
		// loader
		if (this.props.openMics.pending) {
			return (<div style={{marginTop: '100px', textAlign: 'center'}}><CircularProgress size={130} thickness={20} /></div>);
		}

		return (
			<div>
				{this.props.review.error && <Alert error={true} message={this.props.review.errorMessage} />}

				{ this.props.openMics.jam && 
					(<Card style={{marginBottom: '20px'}}>
						<Subheader>Jam Page</Subheader>
					    <CardTitle  title={this.props.openMics.jam.title} 
					    			subtitle={`Located in ${this.props.openMics.jam.city}, ${this.props.openMics.jam.country}`} />
					    <Divider />
					    { this.props.openMics.reviews  &&
					    <GridList style={styles.gridList} cols={2.2}>
					      {this.props.openMics.reviews.filter(item => item.photo).map((item) => (
					        <GridTile
					          key={item.id}
					          title={item.title}
					          actionIcon={<IconButton href={`/reviews/id/${item.id}`} ><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
					          titleStyle={styles.titleStyle}
					          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
					        >
					          <img src={item.photo} alt="" />
					        </GridTile>
					      ))}
					    </GridList> }
					    <CardText>
					      <Table displaySelectAll={false} adjustForCheckbox={false}>
						    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						      <TableRow>
						        <TableHeaderColumn>Day of The Week</TableHeaderColumn>
						        <TableHeaderColumn>Start Time</TableHeaderColumn>
						        <TableHeaderColumn>End Time</TableHeaderColumn>
						        <TableHeaderColumn>City</TableHeaderColumn>
						        <TableHeaderColumn>Country</TableHeaderColumn>
						      </TableRow>
						    </TableHeader>
						    <TableBody displayRowCheckbox={false}>
						      <TableRow>
						        <TableRowColumn>{this.props.openMics.jam.day_of_week}</TableRowColumn>
						        <TableRowColumn>{this.props.openMics.jam.start_time}</TableRowColumn>
						        <TableRowColumn>{this.props.openMics.jam.end_time}</TableRowColumn>
						        <TableRowColumn>{this.props.openMics.jam.city}</TableRowColumn>
						        <TableRowColumn>{this.props.openMics.jam.country}</TableRowColumn>
						      </TableRow>
						    </TableBody>
						  </Table>
					    </CardText>
					  </Card>) }

				<Card>
					<Subheader>Reviews</Subheader>
					<Divider />
					<RaisedButton label="Add a review" href="/reviews/new" primary={true} style={{margin: '12px'}} />
					<Divider />
					{ this.props.openMics.reviews  &&
						(<List style={{marginBottom: '50px'}}>
							{this.props.openMics.reviews.map(nestedItem)}
						</List>)
					}
				</Card>
			</div>
		);
	}
}

export default Jam;
