
import './App.css';
import Axios from 'axios'

/*
     npm install axios
*/

import {useState , useEffect} from 'react'
import React from 'react'
  
function App() {

  const [ fname, setFName] = useState("")
  const [ lname , setLName] = useState("")
  const [ email, setEmail] = useState("")
  const [ password, setPassword]= useState("")
  
  const [students , setStudents]  = useState( []  )
  
  const [ error , setError] = useState("-")
  
 
  useEffect(
     () =>{

      Axios.get("http://localhost:3001/api/read").then(

      (response) => {
          console.log("xxxxxx")
          console.log( response.data )
          setStudents(response.data)
          console.log( students )
      }


   )

    },
     []

 )

 

 const CreateButton = (evt) => {
    
    console.log("Submit: " + fname + " " + lname + " " + email + " " + password )
    let axiosConfig = {
      headers:{
              'Content-type' : 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin" : "*"

      }
     }

     const body = {fname:fname, lname:lname,email:email, password:password }
     Axios.post('http://localhost:3001/api/create', body , axiosConfig )
      .then(()=>{
          console.log("successfull insert ")
      }).catch( ()=>{
          alert("error")
      })

  
  }

  const ReadButton = (evt)=>{
    
    let axiosConfig = {
      headers:{
              'Content-type' : 'application/json;charset=UTF-8',
              "Access-Control-Allow-Origin" : "*"

      }
     }
     Axios.get('http://localhost:3001/api/read',  axiosConfig )
     .then((response)=>{
         console.log("successfull read")
         console.log( response.data)
     }).catch( ()=>{
         alert("error")
     })

  }
  
  const UpdateButton = (evt)=>{
  
    alert("Update Button")
    
  }
  
  
  const DeleteButton = (evt)=>{
  
  
    alert("Delete Button")

  }
  

// pcc197-crud_mongodb
// Note that item._id is the Object id
  const StudentList = () =>{

    return students?.map(item => (
        <div>                                                                                                                                                          
           <span>{item.fname}   {item.lname} {item.email} {item.password}</span>                                                                                               
        </div>
   ));


}

//https://www.geeksforgeeks.org/how-to-create-a-table-in-reactjs/
   function  List(props) {
     return (
      <React.Fragment>
        <table>
           <tr>
             <th>Name</th>
             <th>Email</th>
             <th>Password</th>
           </tr>


           
        </table>

      </React.Fragment>


     )


   }

  return (
    <div className="App">
      <header className="App-header">

          <h2> CRUD - MongoDB Application</h2>
          <h2> Membership</h2>
 
          <div className="form">

          <label><b>First Name</b></label>
          <input type="text" name = "fname"
          
          onChange = { (evt)=>{ setFName( evt.target.value)    }}
          >
          
          </input>
          <br/>

          <label><b>Last Name</b></label>
          <input type="text" name = "lname"
          
          onChange = { (evt)=>{ setLName( evt.target.value)    }}
          >
          </input>
          <br/>

          <label><b>Email</b></label>
          <input type="text" name = "email"
          
          onChange = { (evt)=>{ setEmail( evt.target.value)    }}
          >
          </input>
          <br/>     
          
          <label><b>Password</b></label>
          <input type="text" name = "password"
          
          onChange = { (evt)=>{ setPassword( evt.target.value)    }}
          >
          </input>
          <br/>    
          

          <hr/>
          {fname} &nbsp; {lname} &nbsp; {email} &nbsp; {password} <br/>
          {EvalError}
          <hr/>

          CRUD Commands (Create Read, Update, Delete) <p/>
          <button
              onClick= {CreateButton }
          ><b>C</b>reate:
          </button> &nbsp;

          <button
              onClick= {ReadButton }
          ><b>R</b>ead:
          </button>&nbsp;
        
          <button
              onClick = {UpdateButton}
          ><b>U</b>pdate ( base on email)
          </button> &nbsp;

          <button
            onClick = {DeleteButton}
            ><b>D</b>elete (base on email)
          </button>

          <hr/>
          <h2>Database </h2>
          <StudentList />
          <hr/>
          <List students ={students}/>

          </div>
      </header>
    </div>
  );
}

export default App;
