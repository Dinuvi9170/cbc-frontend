import { useState } from "react";

const TestPage= ()=>{
    const [count,setCount]=useState(0);
    
    const handleMinButton=()=>{
        setCount(precount=>precount-1);
    }
    const handleMaxButton=()=>{
        setCount(precount=>precount+1);
    }
    return(
        <div className="flex h-screen w-full justify-center items-center">
            <div className="w-[450px] h-[250px] shadow rounded-lg flex justify-center items-center">
                <button className=" cursor-pointer bg-blue-600 text-white font-bold text-lg h-7 w-10 "
                    onClick={handleMinButton}
                >-</button>
                <span className="font-bold mx-10 text-3xl">{count}</span>
                <button className="cursor-pointer bg-blue-600 text-white font-bold text-lg h-7 w-10 "
                    onClick={handleMaxButton}
                >+</button>
            </div>
        </div>
    )
}

export default TestPage;