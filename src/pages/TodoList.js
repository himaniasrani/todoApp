import '../App.css';

function TodoList(props){
    const deleteTodo = (e) => {
        props.deleteItem(e.Id);
    }

    const updateTodo = (e) => {
        props.updateItem(e.Id);
    }
    const list = props.todoList;
    const listItems = list.map((item) =>
        <li className="listItem" key={item.Id.toString()}>
            {/* <i className="fas fa-check pointer"></i> */}
            <input type="checkbox" checked={item.Completed} 
            onChange={() => updateTodo(item)} />
            <span className={`subject isDone${item.Completed}`}>
                {item.Title}
            </span>
            <i className="fas fa-times pointer" onClick={() => deleteTodo(item)}></i>
        </li>
    )


    return(
        <div className="todoList">
            <h1>Todo List</h1>
            <ul className="no-bullets">
                {listItems}
            </ul>
        </div>
    )
}

export default TodoList;