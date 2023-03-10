// import { useDispatch } from "react-redux";
import { decrement, increment, update } from "../../redux/counter/counterSlice";
import { useAppDispatch } from "../../hooks/hooks";

function CounterInput(){
    const dispatch = useAppDispatch();
    let text = '';

    function increments(){
        dispatch(increment());
    };

    function decrements(){
        dispatch(decrement());
    };

    const onC = (e) => {
        text = e.target.value;
    };

    function click(){
        const num = Number(text);
        if(typeof(num) !== 'number' || isNaN(num) === true){
            alert('숫자를 입력해 주세요.');
            return;
        }
        dispatch(update(text));
    };

    return(
        <div>
            <button onClick={increments}>+</button>
            <button onClick={decrements}>-</button>
            <input type="text" onChange={onC} />
            <button onClick={click}>더하기</button>
        </div>
    );
};

export default CounterInput;