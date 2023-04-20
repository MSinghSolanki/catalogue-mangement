import React, { useEffect, useState } from "react";
import axios from "axios"

export const Catalague = ()=>{

const [show,setShow] = useState([])



const shows = ()=>{

    axios.get("http://localhost:8080/data").then((res)=>{
        setShow(res.data)
        console.log(show)
    })
}

useEffect(()=>{
shows();
},[])




    return(
        <div>

{show.map((sho)=>{
    <div key={sho.id}>
    <h1>Name:{sho.name}</h1>
    <h1>Name:{sho.email}</h1>
    </div>
})}


</div>

    )
}