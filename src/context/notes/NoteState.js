import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState =(props)=>
{
    const s1 = {
        "name" :"suparna",
        "class" :"1b"
    }
     
    const [state, setstate] = useState(s1);
    
    const update =()=>{
        setTimeout(
            setTimeout(() => {
                setstate({
                     "name" :"suparna34",
                 "class" :"10b"
                })
              
            }, 1000)
            
        )
    }

    return(
    <noteContext.Provider value ={{state,update}}>
       {props.children}
    </noteContext.Provider>
    )
}

export default NoteState;