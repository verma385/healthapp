
import * as React from 'react';
import Axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Unauthorized from './Unauthorized';
import { UserContext } from './UserContext';
import { useState, useEffect, useContext } from 'react';

import ProfilePhoto from './ProfilePhoto';

const DoctorMyAppointment = () => {
  const profilePhotoStyle = {
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    // backgroundColor: "#B90136"
  }
  
  const { user, setUser } = useContext(UserContext);
  const [appts, setAppts] = useState([]);
  const [app, setApp] = useState([]);
  const [changed, setChanged] = useState(false);

  
function formatDate(date){
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
    return formattedDate;
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
      url: '/doctors/my-appointments',
      data: {
        username: user.username
      },
    }).then((res) => {
        var result = []
        var tem = res.data;
        var new_result = {};
        var today = new Date();
            var formattedDate = formatDate(today);
            var current = today;
            for(var i=0;i<7;i++){
                if(i != 0) current.setHours(current.getHours()+24);
                var currentFormatted = formatDate(current);
                new_result[currentFormatted] = [];
            }
          console.log(res.data);
        tem.map((appt) => {
            var current = appt;
            
            if(appt.date in new_result){
                Axios({
                    method: "POST",
                    withCredentials: true,
                    url: '/user-info',
                    data: {
                      username: appt.username
                    },
                  }).then((resp) => {
                        setChanged(!changed)
                        new_result[appt.date].push({"user" : resp.data[0], "time" : appt.time});
                        setApp({...new_result});
                        
                        setChanged(!changed)
                  });
            }
        })
        
    });
  }, [user]);

  useEffect(()=>{
      setAppts({...app});
  }, [changed, app])

 
function showSlot(date, current){
    // return <div key={date}>
    //     <h4>{date}</h4>  
    //     {
    //       current.map((cur)=>(
    //         <div>
    //         <p>Time: {cur.time}</p>
    //         <p>Patient Name: {cur.user.name}</p>

    //         <Link to={"/user/" + cur.user.username} target="_blank" > <button className="btn btn-primary"> View Profile </button></Link>

    //         <br></br>
    //        </div>
    //       ))

    //     }          
    // </div>
    if(current.length==0){
      return <></>
    }
    
    return <div key={date}>
       <h4>{date}</h4> 
        {
          current.map((cur)=>(
            <div>
            <div style={{display : "inline-block", margin:'5px'}} className="card col-lg-8">
    <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">

      <div className="mask" style={{backgroundColor: "rgba(21, 251, 251, 0.15)"}}></div>
     
    </div>
    <div className='container-fluid'>
    <div className='card-body row'>
  
          
              
              <div class="col-md-4">
              <p>Time: {cur.time}</p>
              <Link to={"/chats/" + cur.user.username} > <button className="btn btn-secondary"> Chat </button></Link>

              </div>
              <div class="col-md-4">
              <ProfilePhoto username={cur.user.username} style={profilePhotoStyle}/>
            

              <p>Patient Name: {cur.user.name}</p>
            
                </div>
               
              <div class="col-md-4">
               <Link to={"/user/" + cur.user.username} target="_blank" > <button className="btn btn-primary"> View Profile </button></Link>

               <Link to={"/doctors/user-records/" + cur.user.username} target="_blank" > <button className="btn btn-primary"> View Records </button></Link>

          </div>
    </div>
    </div>
  </div>
            
           </div>
          ))
  
        }          
    </div>
}

  

  if(!user.username || user.username=="" || user.role!="doctor") return <Unauthorized />
  else
  return (
    <div>
          <button type="button" class="btn btn-outline-dark btn-lg " style={{margin:'1%'}}>Your Upcoming Appointments With the Patients</button>

      {
        Object.keys(appts).map((date, indexTime)=> showSlot(date, appts[date]))
      }

    </div>
  );
}

export default DoctorMyAppointment;