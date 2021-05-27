import React from 'react'

const Stories = () => {
    const [state, setState] =React.useState([
        {id:1, image:"/images/randoma.jpg", name: "priya95"},
        {id:2, image:"/images/randomb.jpg", name: "dolly42"},
        {id:3, image:"/images/randomc.jpg", name: "shalu56"},
        {id:4, image:"/images/randomd.jpg", name: "toni93"},
        {id:5, image:"/images/randome.jpg", name: "megha77"},
        {id:6, image:"/images/randomf.jpg", name: "barkha56"},
        {id:7, image:"/images/randomg.jpg", name: "Anmol69"},
        {id:8, image:"/images/randomh.jpg", name: "Lucky55"},
        {id:9, image:"/images/randomi.jpg", name: "Hema56"},
        {id:10, image:"/images/randomj.jpg", name: "Koli96"},
      //  {id:10, image:"/images/randomk.jpg", name: "Piyu88"},
    ])

    return (
        <div className="stories">
           {state.map(user=>(
            <div className="stories__info" key={user.id}>
              <div className="stories__img">
                  <span>
                       <img src={user.image} alt ="user"/>
                  </span>
              </div>
              <div className="stories__nane">
                  {user.name}
              </div>
           </div>
           ))}
        </div>
    )
}

export default Stories
