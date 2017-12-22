import React from 'react';
import Card, {CardTitle} from 'material-ui/Card';

const Alert = (props) => {
	var color = (props.error) ? '#ff8a65' : '#dce775';
	return (
		<Card style={{marginBottom: '20px', background: color}}>
			<CardTitle title="Error" subtitle={props.message} />
		</Card> 
	);
};

export default Alert;