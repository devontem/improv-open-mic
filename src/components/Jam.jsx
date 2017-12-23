import React, { Component } from "react";
import {blue500, yellow600, deepOrange500} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
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
				<a href={`/reviews/id/${item.id}`}>Read More & See Comments...</a>
				<small style={{color: 'black', float: 'right'}}>{new Date(item.date).toDateString()}</small>
			</p>);
}

const nestedItem = (item) => {
	return (
			 <ListItem	key={item.id}
	        			leftIcon={<Avatar src="images/ok-128.jpg" />} 
	        			primaryText={item.author_id}
	        			secondaryTextLines={2}
	      				secondaryText={secondaryText(item)}/>
	);
}

class Jam extends Component {
	render() {
		var imgUrl = (this.props.review.review) ? this.props.review.review.photo : '';
		return (
			<div>
				{this.props.review.error && <Alert error={true} message={this.props.review.errorMessage} />}

				{ this.props.openMics.jam && 
					(<Card style={{marginBottom: '20px'}}>
					    <CardTitle  title={this.props.openMics.jam.title} 
					    			subtitle={`Located in ${this.props.openMics.jam.city}, ${this.props.openMics.jam.country}`} />
					    <Divider />
					    { this.props.openMics.reviews  &&
					    <GridList style={styles.gridList} cols={2.2}>
					      {this.props.openMics.reviews.map((item) => (
					        <GridTile
					          key={item.id}
					          title={item.title}
					          actionIcon={<IconButton href={`/reviews/id/${item.id}`} ><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
					          titleStyle={styles.titleStyle}
					          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
					        >
					          <img src={item.photo} />
					        </GridTile>
					      )).slice(0,4)}
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
					{ this.props.openMics.reviews  &&
						(<List>
							{this.props.openMics.reviews.map(nestedItem)}
						</List>)
					}
				</Card>
			</div>
		);
	}
}

export default Jam;
