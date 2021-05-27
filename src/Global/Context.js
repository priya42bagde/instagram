import React,{createContext} from 'react'
import {auth, db, storage} from "../config"
import firebase from "firebase"
export const ContextProvider = createContext();

const Context = (props) => {
    const [model, setModel] =  React.useState(false);
    const [user, setUser] =  React.useState(null);
    const [loader, setLoader] =  React.useState(true);
    const [posts, setPosts] =  React.useState([]);
    const openModel = () =>{
        setModel(true);
    }
    const closeModel =()=>{
        setModel(false);
    }
    const register = async (user) => {
        const {username, email, password}=user;
        try{
            const res = await auth.createUserWithEmailAndPassword(email, password)
            res.user.updateProfile({displayName:username})
            setModel(false)
        }
        catch(error){
            console.log(error);
        } 
    }

    const login = async user =>{
        const {email, password}=user;
        const res = await auth.signInWithEmailAndPassword(email, password);
        console.log("response", res)
        setModel(false)
    }

    const Logout = async user =>{
       auth.signOut().then(()=>{
        setUser(null)
       }).catch(err =>{
           console.log(err)
       })
    }

    const create =(data)=>{
        console.log("post data", data)
        const {title, image} =data;
        const upload= storage.ref('images/${image.name}').put(image)
        upload.on("state_changed", (snp)=>{
            let progress= (snp.bytesTransferred/snp.totalBytes)*100;
            console.log("progress here",progress)
        }, (err)=>{
            console.log(err);
        },()=>{
           
            storage.ref("images").child(image.name).getDownloadURL().then(url=>{
              db.collection("posts").add({
                title, 
                image:url,
                username:user.displayName,
                currentTime: firebase.firestore.FieldValue.serverTimestamp()
            })
        })
    })}

    const publishComment =data =>{
       const {id, comment}=data;
       db.collection("posts").doc(id).collection("comments").add({
           comment,
           username:user.displayName,
           currentTime:firebase.firestore.FieldValue.serverTimestamp()
       })
    }

    React.useEffect(() => {
        auth.onAuthStateChanged(user=>{
            setUser(user)
            setLoader(false)
        })
        //fetch posts from firebase
          db.collection("posts").orderBy("currentTime", "desc").onSnapshot(snp=>{
              setPosts(snp.docs.map( doc =>(
                  {
                      id:doc.id,
                      title:doc.data().title,
                      image:doc.data().image,
                      username:doc.data().username,
                  }
              )))
          })
        
    }, [user, loader])
    console.log("Login User", user)
    return (
        <ContextProvider.Provider value={{model, openModel, closeModel, login, register, user, loader, Logout, create, posts, publishComment}}>
            {props.children}
        </ContextProvider.Provider>
    )
}

export default Context