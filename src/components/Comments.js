import React from 'react'
import {ContextProvider} from "../Global/Context"
import {db} from "../config"
const Comments=(props)=> {
    const {loader, user, publishComment} = React.useContext(ContextProvider)
    const [state, setState]= React.useState('')
    const [comments, setComments]= React.useState([])
    const postComment =e =>{
        e.preventDefault();
        publishComment({
            id:props.id,
            Comment:state,
        })
        setState("")
    }

    React.useEffect(()=>{
        db.collection("posts").doc(props.id).collection("comments").orderBy("currentTime", "desc").onSnapshot(snp=>{
          setComments(snp.docs.map(doc=>doc.data()))
        })
    },[])
    return (
        <div className="comments">
            {comments.map(comment => (
                <div className="comments__container" key={comment.id}>
                   <div className="comments__container-name">{comment.username}</div>
                   <div className="comments__container-msg">{comment.comment}</div>
                </div>
            ))}
                <div className="comments__section">
                    {!loader && user 
                    ?(<form  onSubmit={postComment}>
                    <input type="text" className="comment__input" onChange={(e)=> setState(e.target.value)} value={state} placeholder="Add a comments..." required/>
                    </form>)
                    :("")}
                </div>
            </div>
        
    )
}

export default Comments
