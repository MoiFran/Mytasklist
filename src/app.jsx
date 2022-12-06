import React , { Fragment,   useState , useRef , useEffect} from "react";
import {v4 as uuidv4} from 'uuid'
import bootstarp from 'bootstrap/dist/css/bootstrap.min.css'; 

import { TodoList } from "./components/TodoList";


const KEY="todoAPP.todos";

export function App(){

const [todos , SetTodos] = useState ([{id: uuidv4() , task:'tarea 1',completed: false}])

const todoTaskRef = useRef();

useEffect(()=>{
    const storedTodos = JSON.parse (localStorage.getItem(KEY));
    if (storedTodos) {
        SetTodos (storedTodos);
    }
},[])

useEffect (() => {
    localStorage.setItem(KEY, JSON.stringify(todos));
},[todos]);

const toggleTodo = (id)=>{
    const newtodos = [...todos];
    const todo = newtodos.find((todo)=>todo.id===id);
    todo.completed = !todo.completed;
    SetTodos(newtodos);
}
const handleTodoAdd  = () => {
const task = todoTaskRef.current.value;
if (task === '')
return;
SetTodos((prevTodos) => {
    return [...prevTodos,{id: uuidv4(), task, completed:false}]
});

todoTaskRef.current.value=null;
};
 const handleClearAll = () =>{
     const newTodos = todos.filter((todo)=>!todo.completed);
     SetTodos(newTodos);
 }
    
    return (
    <Fragment >
     <div className="container col-4 overflow-auto" >
     <h1 className="badge bg-primary text-wrap col-6">tu lista de compras</h1>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input  ref={todoTaskRef} type='text' placeholder='nuevo producto' className="border border-1 shadow-sm p-2 mb-2 bg-body rounded"/>
    <div className="d-inline p-1  text-white" >
    <button  onClick={handleTodoAdd}  >➕</button>
    </div>
   <div className="d-inline p-1 text-white" >
   <button  onClick={handleClearAll}  >🗑 </button>
   </div>
    <div>  {todos.filter((todo) => !todo.completed).length} productos por comprar</div>
   
     </div>
     
    
  

    </Fragment>
    
        ); 
}