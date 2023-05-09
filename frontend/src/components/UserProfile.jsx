import * as React from 'react';
import Axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import Unauthorized from './Unauthorized';
import { useParams } from "react-router-dom";
import ProfilePhoto from './ProfilePhoto';

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const { username } = useParams();

  const [ userProfile, setUserProfile] = useState({});
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

  useEffect(()=>{
    Axios({
      method: "POST",
      withCredentials: true,
      url: '/user-info',
      data: {
        username: username
      },
    }).then((res) => {
      setUserProfile({...res.data[0]});
      
    });
  }, [user]);

  if(!user.username || user.username=="") return <Unauthorized />
  else
  return (

    // <div>
    //   {/* {
    //     Object.entries(user).map(([key, val]) =>
    //       <h2 key={key}>{key}: {val}</h2>
    //     )
    //   } */}
      
    //   <ProfilePhoto username={userProfile.username} style={profilePhotoStyle}/>

    //   <h1> Name : {userProfile.name} </h1>
    //   <p> Username : { userProfile.username } </p>
    //   <p> Email : { userProfile.email } </p>
    //   <p> Aadhar : { userProfile.aadhar } </p>
    //   <p> City : { userProfile.city } </p>
    //   <p> State : { userProfile.state } </p>
    //   <p> Role: {userProfile.role} </p>
    //   <p> Contact : {userProfile.contact} </p>

    //   {
    //     userProfile.role == 'doctor' && <p> Speciality : { userProfile.speciality } </p>
    //   }
    //   {
    //     userProfile.role == 'doctor' && <p> Clinic : { userProfile.clinic } </p>
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
                <ProfilePhoto username={userProfile.username} style={profilePhotoStyle}/>
                {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="Avatar" className="img-fluid my-5" style="width: 80px;" /> */}
                <h6>{userProfile.username}</h6>
                <h5>{userProfile.name}</h5>
                
               

               
               
              </div>
              <div className="col-md-8">
                <div className="card-body p-4">
                  <h6>Information</h6>
                  <hr className="mt-0 mb-4"></hr>
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>Email</h6>
                      <p className="text-muted">{userProfile.email}</p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6>Phone</h6>
                      <p className="text-muted">{userProfile.contact}</p>
                    </div>
                  </div>
                
                  <hr className="mt-0 mb-4"></hr>
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>City</h6>
                      <p className="text-muted">{userProfile.city}</p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6>State</h6>
                      <p className="text-muted">{userProfile.state}</p>
                      
                    </div>
                   
                    {
                      userProfile.role==="doctor" && 
                      
                      <div className="col-12 mb-6">
                      <hr className="mt-0 mb-4"></hr>
                      <h6>Speciality</h6>
                      <p className="text-muted">{userProfile.speciality}</p>
                    </div>
                    }
                    {
                      userProfile.role==="doctor" && 
                      
                      <div className="col-12 mb-6">
                      <h6>Clinic Address</h6>
                      <p className="text-muted">{userProfile.clinic}</p>
                    </div>
                    }
                  </div>
                  <hr className="mt-0 mb-4"></hr>
                  <div className="row">
                   
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

export default UserProfile;