// import React, { useState, useEffect } from "react";
import "./App.css";
import {useState} from "react";
import Axios from "axios"


function App(){

  //Variables for each column in the database
  const [name, setName] = useState('');
  const [id, setId] = useState(0);
  const [points, setPoints] = useState(0);

  //Variable that holds a list of all data in the database
  const [userList, setuserList] =  useState([]);

  //Variables for updating Name and Points in the databse
  const [newName, setNewName] = useState('');
  const [newPoints, setNewPoints] = useState(0);

  //Variables for searching and outputting the found user info
  const [findName, setFindName] = useState(0);
  const [targetData, setTargetData] = useState(null)

/*
  FUNCTIONS
*/
  // Function to add a new user in the database
  const addUser = () => {
    Axios.post('http://localhost:3001/create', {
      
      name: name, 
      id: id, 
      points: points,
    }).then(() => {
      setuserList([...userList, {
        names: name, 
        id: id, 
        points: points,
      }])
    });
  };

  // Function to get back information from the database to be displayed
  const getUsers = () => {
    Axios.get('http://localhost:3001/users').then((response) => {
    setuserList(response.data);
  });
  };

  //Function to update a user's name in the database
  const updateUserName = (id) => {
    Axios.put('http://localhost:3001/update', {name: newName, id: id}).then( 
      (response) => {
      setuserList(userList.map((val) => {
        return val.id === id ? {names: newName, id: val.id, points: val.points} : val 
      }))
    });
  };

  //Function to update a user's name in the database
  const updateUserPoints = (id) => {
    Axios.put('http://localhost:3001/updatepoints', {points: newPoints, id: id}).then( 
      (response) => {
      setuserList(userList.map((val) => {
        return val.id === id ? {names: val.names, id: val.id, points: newPoints} : val 
      }))
    });
  };

  //Function to delete a user off the database
  const deleteUser = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then((respose) => {
      setuserList(userList.filter((val) => {
        return val.id !== id 
      }))
    });
  };

  //Function to get a specific user from the database based on a given id
  const searchUser = (id) => {
    Axios.get(`http://localhost:3001/search/${id}`).then((response) => {
      //console.log(response.data);
      setTargetData(response.data)
    });
  };

  return (

/*
  Javascript Section
*/

  //This is for adding a user
  <div className="App">
    <div className="Information"> 
      <label>Name: </label>
      <input 
      type="text" 
      onChange={(event) => {
        setName(event.target.value)
        }}/>

      <label>ID: </label>
      <input 
      type="number"
      onChange={(event) => {
        setId(event.target.value)
        }} />

      <label>Points: </label>
      <input 
      type="number"
      onChange={(event) => {
        setPoints(event.target.value)
        }} />

      <button onClick={addUser}>Add User</button>
    </div>
    
    
    {/*This is for searching for a specific user in the database using their unique ID */}
    <div>
      <div className="search">
      <label>Search User: </label>
        <input 
        type="number" 
        placeholder="User ID"
        onChange={(event) => {
          setFindName(event.target.value)
          }}/>
        
        <button onClick={() => searchUser(findName)}> 
          Search Users
        </button>
      </div>

      {/*This will show the information of the found user */}
      {targetData && (
        <div className="user-data">
          <h2>User Data:</h2>
          <p>Name: {targetData.names}</p>
          <p>ID: {targetData.id}</p>
          <p>Points: {targetData.points}</p>
        </div>
      )}
 
    </div>


    {/*This handles the update things and delete things */}
    <div className="users">
      <button onClick={getUsers}>Show Users</button>
      
      {userList.map((val, key) =>{
        return <div className="user">
          <div>
            <h3>Name: {val.names}</h3>
            <h3>ID: {val.id}</h3>
            <h3>Points: {val.points}</h3>
          </div>

          {/* All update stuff */}
          <div>
            <input type="text" placeholder="New Name"
            onChange={(event) => {
              setNewName(event.target.value)
              }}/>
            <button onClick={() =>{updateUserName(val.id)}}> Update Name </button>

            <input type="number" placeholder="New Points"
            onChange={(event) => {
              setNewPoints(event.target.value)
              }}/>
            <button onClick={() =>{updateUserPoints(val.id)}}> Update Points </button>

            {/*Delete button that will delete the user */}
            <button onClick={() => {
              deleteUser(val.id);
            }}> Delete </button>
          </div>
        </div>
      })
      }
    </div>

  </div>
  );
};

export default App

