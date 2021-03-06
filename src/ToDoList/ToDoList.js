import React from 'react';
import { withStyles, List } from '@material-ui/core';
import ToDoItem from './ToDoItem/ToDoItem';

const styles = theme => ({
    root: {
        overflowY: 'scroll',
        maxHeight: 500,
        maxWidth:500,
        margin:'auto'
      },
});

function CheckboxList (props) {
    const { classes } = props;
    return (
        
        <List className={classes.root}>
          {props.todoElements.map(element => (
            <ToDoItem 
                key={element.id} 
                name={element.name} 
                completed={element.completed} 
                id={element.id}
                handleComplete={props.handleComplete}
                handleDelete={props.handleDelete} />
          ))}
        </List>
        
      
    );
}

export default withStyles(styles)(CheckboxList);