import React from 'react'
import { ContextProvider} from "../Global/Context"
import Comments from "./Comments"

const Posts=()=> {
    const {posts}=React.useContext(ContextProvider)
    return (
        <>{posts.map(post =>(
            <div className="posts" key={post.id}>
            <div className="posts__header">
                <div className="posts__header-avator">{post.username[0]}</div>
                <div className="posts__header-name">{post.username}</div>
            </div>
            <div className="posts__img">
                <img src={post.image} alt={post.image}/>
            </div>
            <Comments id={post.id}/>
        </div>
        ))}</>
    )
}

export default Posts
