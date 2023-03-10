import { useAppSelector } from "../../hooks/hooks";

function CounterDisplay(){
    const count = useAppSelector((state) => state.counter.value)

    return(
        <div>
            <h1>{count}</h1>
        </div>
    )
}

export default CounterDisplay;