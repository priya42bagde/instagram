import React,{useState} from 'react'
import {FaCamera} from "react-icons/fa"
import {ContextProvider} from "../Global/Context"

const Create = () => {
    const {create, loader, user}= React.useContext(ContextProvider)
    const[title, setTitle]=useState('');
    const[image, setImage]=useState('');
    const handleImage =(e)=>{
        setImage(e.target.files[0]);
    }
    const createPost =e=>{
        e.preventDefault();
        create({title,image})
        setTitle('');
        setImage('')
    }
    return (
        <>
           {! loader && user 
           ?<div className="create">
           <form onSubmit={createPost}>
               <div className="create__input">
                   <input type="text" className="create__inputt" onChange={e=> setTitle(e.target.value)} value={title} placeholder="What are in your mind" required/>
               </div>
               <div className="create__second">
                   <label htmlFor="file">
                       <FaCamera className="camera"/>
                    </label>   
                   <input type="file" onChange={handleImage} className="file" id="file" required/>
               </div>
               <div className="create__second-b">
                   <input type= "submit" value="Create" className="btn-sweet"/>
               </div>
           </form> 
        </div>
        :""}
        </>
    )
}

export default Create
