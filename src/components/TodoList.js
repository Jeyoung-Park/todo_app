import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

const TodoList=({todos, onRemove, onToggle1})=>{
    // props로 todos 베열을 배열 내장 함수 map을 통해 TOdoListItem으로 이루어진 배열로 변환해 렌더링
    return(
        <div className='TodoList'>
            {/* map: 새로운 배열의 요소를 생성하는 함수 */}
            {todos.map(todo=>(
                <TodoListItem todo={todo}   key={todo.id} onRemove={onRemove} onToggle1={onToggle1}  />
            ))}
        </div>
    )
}

export default TodoList;