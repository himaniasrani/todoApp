import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Header from '../components/Header';
import About from './About';
import AddItem from '../components/AddItem';
import TodoList from './TodoList';
import API from '../utils/api';
import {useState, useEffect} from 'react';

function LandingPage(){
    // constructor(props){
    //     super(props);
    //     this.state = {
    //       todoList: [
           
    //       ]
    //     }
    //   }
      const [todoList, setTodoList] = useState([]);

      // async componentDidMount() {
      //   // API.get(`todos`)
      //   //   .then(res => {
      //   //     const todos = res.data;
      //   //     const sorted = todos.sort((a, b) => a.Completed - b.Completed);
      //   //     this.setState({ todoList: sorted });
      //   //   })
      //   const response = await API.get(`todos`);
      //   const sorted = response.data.sort((a, b) => a.Completed - b.Completed);
      //   this.setState({ todoList: sorted });
      //   // this.props.history.match('/home')
      // }

      useEffect(() => {   //Instead of componentDidMount
        console.log("Useeffect")
        API.get(`todos`)
          .then(res => {
            const todos = res.data;
            const sorted = todos.sort((a, b) => a.Completed - b.Completed);
            setTodoList(sorted);
          })

        // const response = await API.get(`todos`);
        // const sorted = response.data.sort((a, b) => a.Completed - b.Completed);
        // setTodoList({ todoList: sorted });
      },[])
    
      const getId = () =>{
        let max = -1;
        todoList.forEach((item) => {
          if(item.Id > max){
            max = item.Id;
          }
        });
        return max + 1;
      }
    
      const addItemToList = (item) => {
        let newList = todoList;
        newList.unshift({Id: getId(), Title: item, Completed: false});
        const sorted = newList.sort((a, b) => a.Completed - b.Completed);
        setTodoList(sorted);
    
        API.post('todos', {newList})
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
      }
    
      const deleteItemFromList = (selectedId) => {
         let newList = todoList;
         newList.forEach((item, i) =>{
           if(item.Id === selectedId){
            newList.splice(i, 1);
           }
         })
         setTodoList([...newList]);
    
         API.delete(`todos/ ${selectedId}`)
          .then(res =>{
            console.log(res);
            console.log(res.data);
          })
      }
    
      const updateItem = (selectedId, i) => {
        let newList = todoList;
        newList.forEach((item) => {
          if(item.Id === selectedId){
            item.Completed = !item.Completed;
          }
        })
        const sorted = newList.sort((a, b) => a.Completed - b.Completed);
    
        setTodoList([...sorted]);
      }
    
      return (
          <div>
              <Header />
              <Switch>
              <Route path="/about" component={About}>
              </Route>
              <Route path="/tasks-done" render={() =><TasksDone todoList={todoList}/>}>
                  
              </Route>
              <Route path="/home">
                  <Home todoList={todoList} deleteItem={deleteItemFromList} 
                  updateItem={updateItem} addItem={addItemToList}/>
              </Route>
              <Route path="/">
                <h1>Welcome!!</h1>
              </Route>
              </Switch>
          </div>
      );
}

function Home(props) {
    return(
      <div className="App">
        <TodoList todoList={props.todoList} deleteItem={props.deleteItem} updateItem={props.updateItem}/>
        <AddItem addItem={props.addItem}/>
      </div>
    ) 
  }
  
  function TasksDone(props){
    let filteredlist = [];
    props.todoList.forEach((item) =>{
      if(item.Completed){
        filteredlist.push(item);
      }
    });

    const listItems = filteredlist.map((item) =>
    <li key={item.Id.toString()} className="listItem">
      <span className={`subject isDone${item.Completed}`}>
          {item.Title}
      </span>
    </li>   
  )

  return(
    <div className="App">
      <h1 className="marginTop">Tasks Done</h1>
      <div className="taskDone marginTop2">
        <ul className="no-bullets">
          {listItems}
        </ul>
        </div>
    </div>
  )
  }

export default LandingPage;