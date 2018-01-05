import React, {Component} from 'react';
import stage from "./../assets/images/stage.png";
import computer from "./../assets/images/computer.png";
import review from "./../assets/images/review.jpg";
import friends from "./../assets/images/friends.gif";
import Avatar from 'material-ui/Avatar';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
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

class HomePage extends Component {

	render(){
		return (<div style={{background: '#353B47', overflow: 'auto'}}>
					<div style={{fontFamily: "'Open Sans', sans-serif", color:'white'}}>
						<div style={{padding: '20px'}}>
							<p style={{fontSize: '4em', fontWeight: 'bold', marginBottom: '20px'}}>Improv Jams</p>
							<p style={{fontSize: '1.2em'}}><span style={{fontSize: '1.6em', fontWeight: 'bold'}}>What is improv?</span><br/> A comedy format in which the performers make up the scene on the spot.</p>
							<p style={{fontSize: '1.2em'}}><span style={{fontSize: '1.6em', fontWeight: 'bold'}}>What is an Improv Jam?</span> <br/> An improv jam for improvisors is what an open mic is for comedians.</p>
						</div>
						<div style={{marginTop: '20px', textAlign: 'center', backgroundColor: '#00bcd4', overflow: 'hidden', padding: '30px 0px'}}>
							<p style={{fontSize: '4em', fontWeight: 'bold', textAlign: 'left', padding: '0px 20px', marginBottom: '20px'}}>How it Works</p>
							<section className="col-sm-3">
								<p style={{fontSize: '1.2em', fontWeight: 'bold'}}>1. Attend an improv jam in your city</p>
								<img style={{width: '100%'}} src={stage} alt=""/>
							</section>
							<section className="col-sm-3">
								<p style={{fontSize: '1.2em', fontWeight: 'bold'}}>2. Log on, find the jam you attended or add it.</p>
								<img style={{width: '100%'}} src={computer} alt=""/>
							</section>
							<section className="col-sm-3">
								<p style={{fontSize: '1.2em', fontWeight: 'bold'}}>3. Leave an honest review about your experience.</p>
								<img style={{width: '100%'}} src={review} alt=""/>
							</section>
							<section className="col-sm-3">
								<p style={{fontSize: '1.2em', fontWeight: 'bold'}}>4. Read other reviews, leave comments, & become apart of a community</p>
								<img style={{width: '100%'}} src={friends} alt=""/>
							</section>
						</div>
						<div style={{textAlign: 'center', backgroundColor: '#8BC34A', overflow: 'hidden', padding: '30px 0px'}}>
							<p style={{fontSize: '4em', fontWeight: 'bold', textAlign: 'left', padding: '0px 20px', marginBottom: '20px'}}>Recent Reviews</p>
								{ this.props.homepage.reviews  &&
							    <GridList style={styles.gridList} cols={2.2}>
							      {this.props.homepage.reviews.filter(item => item.photo).map((item) => (
							        <GridTile
							          key={item.id}
							          title={<h3><a style={{color: 'white'}} href={`/reviews/id/${item.id}`}>{`"${item.title}" -  ${item.username}`}</a></h3>}
							          titleStyle={styles.titleStyle}
							          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
							        >
							          <img src={item.photo} alt="" />
							        </GridTile>
									))}
							    </GridList> }
						</div>
						<div style={{textAlign: 'center', backgroundColor: '#E91E63', overflow: 'hidden', padding: '30px 0px'}}>
							<p style={{fontSize: '4em', fontWeight: 'bold', textAlign: 'left', padding: '0px 20px', marginBottom: '20px'}}>New Users</p>
								{ this.props.homepage.users && 
									<div>
										{this.props.homepage.users.map((item) => {
											return (<div style={{margin: '20px', display: 'inline-block'}} key={item.id}>
														<a href={`/profile/${item.id}`}>
															<Avatar src={require(item.photo)} size={40} /> <br />
															<small style={{textAlign: 'center', color: 'white'}}>{item.username}</small>
														</a>
													</div>);
										})}
									</div> }
						</div>
					</div>
				</div>)
	}
};

export default HomePage;