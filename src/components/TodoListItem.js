import React from 'react';
import{
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline
} from 'react-icons/md';
import './TodoListItem.scss';
import cn from 'classnames'; //조건부 스타일링을 위해 사용

const TodoListItem=({todo, onRemove, onToggle})=>{
    const {id, text, checked}=todo;
    return(
        <div className="TodoListItem">
            {/* check 값이 true이면 checked 클래스 적용, false일 떄는 checked 클래스 적용 x */}
            <div className={cn('checkbox', {checked})}  onClick={()=>onToggle(id)}> 
                {checked?<MdCheckBox/>:<MdCheckBoxOutlineBlank/>}
                <div className="text">{text}</div>
            </div>
            <div className="remove" onClick={()=>onRemove(id)}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default TodoListItem;