import React,{useState} from 'react'

const Test1 = () => {
    const[isHello,setIsHello]=useState(true)
  return (
    <div>
       <h1>{isHello?"say Hii":"tell bye"}</h1>
       <button onClick={()=>setIsHello(!isHello)}>Text Toggle</button>

    </div>
  )
}

export default Test1