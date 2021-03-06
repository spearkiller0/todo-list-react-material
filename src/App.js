import React, { Component, Fragment } from 'react';
import './App.css';
import Header from './Header/Header';
import { withStyles } from '@material-ui/core/styles';
import ToDoList from './ToDoList/ToDoList';
import axios from 'axios';
import ProgressBar from './ProgressBar/ProgressPar';
import AddTask from './AddTask/AddTask';
import ToDoTab from './ToDoTab/ToDoTab';

const styles = {
 
};

class App extends Component {
  state = {
    todoElements:[],
    tabIndex:0
  }
  
  getData = () => {
    axios.get(`https://todolist-f5aff.firebaseio.com/todoList.json`)
    .then(res => {
      
      let arr=[];
      for(let key in res.data){
        let obj = {...res.data[key]};
        obj.id = key;
        arr.push(obj);
      }
      this.setState({todoElements:arr});
    })

  }

  componentDidMount(){
    this.getData();
  }
  calProgress = () => {
    const numberOfItems = this.state.todoElements.length;
    const numberOfCompleted = this.state.todoElements.filter( ele => ele.completed ).length;
    return numberOfCompleted/numberOfItems*100;
    
  }

  handleComplete = (id) => (event) =>{
    
    let arr = [...this.state.todoElements];
    const index = arr.findIndex(ele => ele.id === id);
    arr[index]['completed'] = !arr[index]['completed'];
    this.setState({todoElements:arr});
    axios.put(`https://todolist-f5aff.firebaseio.com/todoList/${id}.json`,arr[index])
    .then(res => {
      
    })
  }
  handleDelete = (id) => (event) =>{
    let arr = [...this.state.todoElements]; 
    arr = arr.filter(ele => ele.id !== id);
    this.setState({todoElements:arr});
    axios.delete(`https://todolist-f5aff.firebaseio.com/todoList/${id}.json`)
    .then(res => {
      
    })
  }

  handleSubmit = (data) => (event) =>{
    event.preventDefault();
    const getData =  this.getData;

    const arr = [...this.state.todoElements];
    const newData = {name:data, completed:false, id: new Date().valueOf()}
    arr.push(newData);
    
    axios.post(`https://todolist-f5aff.firebaseio.com/todoList.json`,newData)
    .then(res => {
      getData();
    })
  }

  handleSubmit = (data) => (event) =>{
    event.preventDefault();
    const getData =  this.getData;

    const arr = [...this.state.todoElements];
    const newData = {name:data, completed:false, id: new Date().valueOf()}
    arr.push(newData);
    
    axios.post(`https://todolist-f5aff.firebaseio.com/todoList.json`,newData)
    .then(res => {
      getData();
    })
  }

  handleTabSelected = (event,index) => {
    this.setState({tabIndex:index})
  }

  render() {
    let todoElements;
    if(this.state.tabIndex===0) todoElements=this.state.todoElements;
    else if(this.state.tabIndex===1) todoElements=this.state.todoElements.filter(task => !task.completed)
    else todoElements=this.state.todoElements.filter(task => task.completed)
    
    return (
      <Fragment>
        <Header />
        <ProgressBar value={this.calProgress()}/>
        <AddTask handleSubmit={this.handleSubmit}/>
        <ToDoTab 
          index={this.state.tabIndex}
          handleChange={this.handleTabSelected}/>
        <ToDoList 
          todoElements={todoElements}
          handleComplete={this.handleComplete}
          handleDelete={this.handleDelete} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
