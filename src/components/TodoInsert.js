import React, { useCallback, useState } from 'react';
import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert=({onInsert})=>{
    const [value, setValue]=useState('');

    // useCallBack() - 첫 번쨰 파라미터: 생성하고 싶은 함수
                 //  - 두 번째 파라미터: 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지
    const onChange=useCallback(e=>{
        setValue(e.target.value);
    }, []);

    const onSubmit=useCallback(
        e=>{
            onInsert(value);
            setValue('');
//submit 이벤트는 브라우저에 새로고침을 발생시키는데 이를 방지하기 위해 preventDefault 호출
            e.preventDefault();
        },
        [onInsert, value]
    );

    return(
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input 
                placeholder="할 일을 입력하시오."
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
}

export default TodoInsert;