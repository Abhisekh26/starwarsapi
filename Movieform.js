import { useState } from "react";
import "./Movie.module.css"
function Movieform({setdata}){
    const[title,setTitle]=useState()
    const[openingtext,setOpeningtext]=useState()
    const[releasedate,setReleasedate]=useState()
    function getTitle(event){
        setTitle(event.target.value)
    }
    function getopeningText(event){
        setOpeningtext(event.target.value)
    }
    function getReleaseDate(event){
        setReleasedate(event.target.value)
    }
    function getdata()
    {    
      setdata(title,openingtext,releasedate)
     setTitle("")
     setOpeningtext("")
     setReleasedate("")
    }
    return(
        < >
       <section className= "xyz">
        <label>Title</label>
        <input type="text"
        value={title}
        onChange={getTitle}></input>
        <label>Opening Text</label>
        <input type="text" column="4"
         value={openingtext}
         onChange={getopeningText}></input>
        <label>Release Date</label>
        <input type="text"
         value={releasedate}
         onChange={getReleaseDate}></input>
        {/* <br>
        </br> */}
        <button onClick={getdata}>Add Movie</button>
      </section>
      
    </>
    )
}
export default Movieform;