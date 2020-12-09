import React, { useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

const App = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2,
      text: '컴포넌트 스타일링해 보기',
      checked: true,
    },
    {
      id: 3,
      text: '일정관리 앱 만들어 보기',
      checked: false,
    },
  ]);

  const nextId=useRef(4);

  const onInsert=useCallback(
    text=>{
      const todo={
        id:nextId.current,
        text,
        check: false
      };
      setTodos(todos.concat(todo));
      nextId.current+=1;
    },
    [todos]
  );

  const onRemove=useCallback(
    id=>{
      setTodos(todos.filter(todo=>todo.id!==id)); //파라미터로 받아온 id 값과 같지 않은 id 값을 가진 todo들만 배열에 남김
    },
    [todos]
  );

  const onToggle1=useCallback(
    id=>{
      setTodos(
        todos.map(todo=>
          todo.id===id?{...todo, checked:!todo.checked}:todo
       ),
      );
    },
    [todos]
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      {/* TodoList에 todos 배열을 props로 전달 */}
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle1}/>
    </TodoTemplate>
  );
};

export default App;
