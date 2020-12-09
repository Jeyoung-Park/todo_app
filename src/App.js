import React, { useReducer, useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

function createBulkTodos(){
  const array=[];
  for(let i=1;i<=2500;i++){
    array.push({
      id:i,
      text: `할 일 ${i}`,
      checked: false
    });
  }
  return array;
}

function todoReducer(todos, action){
  switch(action.type){
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo=>todo.id!==action.id);
    case 'TOGGLE':
      return todos.map(todo=>
        todo.id===action.id?{...todo, checked:!todo.checked}:todo  
      );
    default:
      return todos;
  }
}

const App = () => {
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트의 기초 알아보기',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링해 보기',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: '일정관리 앱 만들어 보기',
  //     checked: false,
  //   },
  // ]);

  // const [todos, setTodos]=useState(createBulkTodos);

  // 원래 useReducer의 두 번째 파리미터에 초기 상태
  // 이번에는 세 번째 파라미터에 초기 상태 -> 컴포넌트가 맨 처음 렌더링될 때만 createBulkTodos 함수 호출
  const [todos, dispatch]=useReducer(todoReducer, undefined, createBulkTodos); 

  //고윳값으로 사용될 id, ref를 사용하여 변수 담기
  const nextId=useRef(2501);

  const onInsert=useCallback(
    text=>{
      const todo={
        id:nextId.current,
        text,
        check: false
      };
      // setTodos(todos=>todos.concat(todo)); useState의 함수형 업데이트를 이용한 성능 개선
      dispatch({type:'INSERT', todo}); //useReducer 방법을 이용한 성능 개선
      nextId.current+=1; 
    },
    []
  );

  const onRemove=useCallback(
    id=>{
      // setTodos(todos.filter(todo=>todo.id!==id)); //파라미터로 받아온 id 값과 같지 않은 id 값을 가진 todo들만 배열에 남김
      // setTodos(todos=>todos.filter(todo=>todo.id!==id)); //함수형 업데이트: setTodo를 사용할 떄 그 앞에 todos=>만 추가 => useReducer와 useState가 계속 새로워지는 문제 해결
      dispatch({type:'REMOVE', id});
    },
    []
  );

  const onToggle=useCallback(
    id=>{
      /*setTodos(todos=>
        todos.map(todo=>
          todo.id===id?{...todo, checked:!todo.checked}:todo
          // todo.id===id?{...todo, checked: !todo.checked}:todo
       ),
      );*/
      dispatch({type:'TOGGLE'}, id);
    },
    []
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      {/* TodoList에 todos 배열을 props로 전달 */}
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle}/>
    </TodoTemplate>
  );
};

export default App;
