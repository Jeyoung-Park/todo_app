import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import './TodoListItem.scss';
import cn from 'classnames'; //조건부 스타일링을 위해 사용

const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo;
  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className="TodoListItem">
        {/* check 값이 true이면 checked 클래스 적용, false일 떄는 checked 클래스 적용 x */}
        <div
          className={cn('checkbox', { checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};

// React.memo: 컴포넌트의 props가 바뀌지 않았다면 리렌더링하지 않도록 설정
export default React.memo(
    TodoListItem,
    (prevProps, nextProps)=>prevProps.todo===nextProps.todo
);
