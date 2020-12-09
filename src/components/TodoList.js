import React, {useCallback} from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';
import {List} from 'react-virtualized';

const TodoList=({todos, onRemove, onToggle})=>{
    // rowRenderer: real-virtualized의 List 컴포넌트에서 각 TodoItem을 렌더링할 떄 사용
    const rowRenderer=useCallback(
        ({index, key, style})=>{
            const todo=todos[index];
            return(
                <TodoListItem
                    todo={todo}
                    key={key}
                    onRemove={onRemove}
                    onToggle={onToggle}
                    style={style}
                ></TodoListItem>
            );
        }, 
        [onRemove, onToggle, todos]
    );
    // props로 todos 배열을 배열 내장 함수 map을 통해 TOdoListItem으로 이루어진 배열로 변환해 렌더링
    return(
        // <div className='TodoList'>
        //     {/* map: 새로운 배열의 요소를 생성하는 함수 */}
        //     {todos.map(todo=>(
        //         <TodoListItem todo={todo}   key={todo.id} onRemove={onRemove} onToggle={onToggle}  />
        //     ))}
        // </div>
        <List 
            className="TodoList"
            width={502.29} //전체 너비
            height={342} //전체 높이
            rowCount={todos.length} //항목 개수
            rowHeight={57} //항목 높이
            rowRenderer={rowRenderer} //항목을 렌더링할 떄 쓰는 함수, List 컴포넌트의 props로 설정하여 사용
            list={todos} //배열
            style={{outline:'none'}} //List에 기본 적용되는 outline 스타일 제거
        />
    )
}

export default React.memo(TodoList);