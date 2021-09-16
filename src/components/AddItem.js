import { useState } from 'react';
import '../App.css';

function AddItem(props){
    const [item, setItem] = useState('');

    const submitItem = () => {
        props.addItem(item);
        setItem('');
    }

    const setItemValue = (e) =>{
        setItem(e.target.value);
    }

    return(
        <div className="addItemDiv">
            <input type="text" placeholder="Add new item" className="newItem" value={item} onChange={setItemValue}></input>
            <button className="addItem pointer" onClick={submitItem}>Add</button>
        </div>
    )
}

export default AddItem;