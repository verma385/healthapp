import * as React from 'react';
import Axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import Unauthorized from './Unauthorized';
import ProfilePhoto from './ProfilePhoto';
import EditProfilePhoto from './EditProfilePhoto';
import './user.css'

const User = () => {
  const { user, setUser } = useContext(UserContext);
  const profilePhotoStyle = {
    borderRadius: "100%",
    width: "120px",
    height: "120px",
    marginTop:"10%"
    // backgroundColor: "#B90136"
  }

  useEffect(()=>{
    
    Axios({
      method: "POST",
      withCredentials: true,
      url: '/auth/user',
      data: {
        
      },
    }).then((res) => {
      setUser(res.data);
    });
  }, []);

  if(!user.username || user.username=="") return <Unauthorized />
  else
  return (
   
    // <div>
    //   {/* {
    //     Object.entries(user).map(([key, val]) =>
    //       <h2 key={key}>{key}: {val}</h2>
    //     )
    //   } */}
    //   <ProfilePhoto username={user.username} style={profilePhotoStyle}/>

    //   <EditProfilePhoto />
      
    //   <h1> Name : {user.name} </h1>
    //   <p> Username : { user.username } </p>
    //   <p> Email : { user.email } </p>
    //   <p> Aadhar : { user.aadhar } </p>
    //   <p> City : { user.city } </p>
    //   <p> State : { user.state } </p>

    //   {
    //     user.role == 'doctor' && <p> Speciality : { user.speciality } </p>
    //   }
    //   {
    //     user.role == 'doctor' && <p> Clinic : { user.clinic } </p>
    //   }

    // </div>
  
    <section className="vh-100">
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100" >
        <div className="col col-lg-6 mb-4 mb-lg-0" >
          <div className="card mb-3" style={{borderRadius: ".5rem"}}>
            <div className="row g-0">
              <div className="col-md-4 gradient-custom text-center text-white"
                style={{borderTopLeftRadius: ".5rem", borderBottomLeftRadius: ".5rem"}}>
                <ProfilePhoto username={user.username} style={profilePhotoStyle}/>
                {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="Avatar" className="img-fluid my-5" style="width: 80px;" /> */}
                <h6>{user.username}</h6>
                <h5>{user.name}</h5>
                
               

               
               
              </div>
              <div className="col-md-8">
                <div className="card-body p-4">
                  <h6>Information</h6>
                  <hr className="mt-0 mb-4"></hr>
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>Email</h6>
                      <p className="text-muted">{user.email}</p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6>Phone</h6>
                      <p className="text-muted">{user.contact}</p>
                    </div>
                  </div>
                
                  <hr className="mt-0 mb-4"></hr>
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>City</h6>
                      <p className="text-muted">{user.city}</p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6>State</h6>
                      <p className="text-muted">{user.state}</p>
                      
                    </div>
                   
                    {
                      user.role==="doctor" && 
                      
                      <div className="col-12 mb-6">
                      <hr className="mt-0 mb-4"></hr>
                      <h6>Speciality</h6>
                      <p className="text-muted">{user.speciality}</p>
                    </div>
                    }
                    {
                      user.role==="doctor" && 
                      
                      <div className="col-12 mb-6">
                      <h6>Clinic Address</h6>
                      <p className="text-muted">{user.clinic}</p>
                    </div>
                    }
                  </div>
                  <hr className="mt-0 mb-4"></hr>
                  <div className="row">
                    <EditProfilePhoto />
                    </div>
                  

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default User;