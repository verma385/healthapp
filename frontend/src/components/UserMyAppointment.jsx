
import * as React from 'react';
import Axios from "axios";
import { Link, NavLink } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Unauthorized from './Unauthorized';
import { UserContext } from './UserContext';
import { useState, useEffect, useContext } from 'react';

import ProfilePhoto from './ProfilePhoto';
const UserMyAppointment = () => {
  const profilePhotoStyle = {
    borderRadius: "100%",
    width: "70px",
    height: "70px",
    // backgroundColor: "#B90136"
  }

  
  const { user, setUser } = useContext(UserContext);
  const [oldAppts, setOldAppts] = useState([]);
  const [oldApp, setOldApp] = useState([]);

  const [newAppts, setNewAppts] = useState([]);
  const [newApp, setNewApp] = useState([]);

  const [changed, setChanged] = useState(false);

  
function formatDate(date){
    const formattedDate = date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
    return formattedDate;
}

function convertDate(date){
    const mp = {"Jan" : 0, "Feb" : 1, "Mar" : 2, "Apr" : 3, "May" : 4, "Jun" : 5, "Jul" : 6,
                "Aug" : 7, "Sep" : 8, "Oct" : 9, "Nov" : 10, "Dec" : 11};
    const newDate = new Date(date.substring(7,11), mp[date.substring(3,6)],date.substring(0,2));
    return newDate;
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
      url: '/users/my-appointments',
      data: {
        username: user.username 
      },
    }).then((res) => {
        var result = []
        var tem = res.data;
        var new_result = {};
        var old_result = {};

        var today = new Date();
        today.setHours(today.getHours()-24);
        var formattedToday = formatDate(today);
      
          
        tem.map((appt) => {
            var current = appt;
            var currentDate = convertDate(appt.date);
           
            var currentFormatted = appt.date;
            if(currentDate<today){
                if(!(currentFormatted in old_result) ){
                    old_result[currentFormatted] = [];
                }
            }
            else{
                if(!(currentFormatted in new_result) ){
                    new_result[currentFormatted] = [];
                }
                
            }
            

            Axios({
                method: "POST",
                withCredentials: true,
                url: '/user-info',
                data: {
                  username: appt.doctor
                },
              }).then((resp) => {
                    setChanged(!changed);
                    if(currentDate<today){
                        old_result[currentFormatted].push({"user" : resp.data[0], "time" : appt.time});
                        setOldApp({...old_result});
                    }
                    else{
                        new_result[currentFormatted].push({"user" : resp.data[0], "time" : appt.time});
                        setNewApp({...new_result});
                    
                    }
                   
                    setChanged(!changed)
              });

            
            
            
        })
        
    });
  }, [user]);

  useEffect(()=>{
      setOldAppts({...oldApp});
  }, [changed, oldApp]);

  useEffect(()=>{
    setNewAppts({...newApp});
}, [changed, newApp]);

 
function showOldSlot(date, cur){
  if(!cur.user){
    return <></>
  }
    return <div key={date}>
          <div style={{display : "inline-block", margin:'5px'}} className="card col-lg-8">
  <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
    {/* <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" className="img-fluid"/> */}
    
    <div className="mask" style={{backgroundColor: "rgba(21, 251, 251, 0.15)"}}></div>
   
  </div>
  <div className='container-fluid'>
  <div className='card-body row'>

        
            
            <div class="col-md-4">
            <ProfilePhoto username={cur.user.username} style={profilePhotoStyle}/>
            {/* <Link to={"/chats/" + cur.user.username} > <button className="btn btn-secondary"> Chat </button></Link> */}
            </div>
            <div class="col-md-4">
          
            <p>{cur.user.name}</p>
            <p>{date}</p>  
            <p>Time: {cur.time}</p>
          
              </div>
              {/* <p> {receiver.username} </p> */}
            {/* <p > {unread?"New Message":""} </p> */}
            <div class="col-md-4">
            <Link to={"/user/" + cur.user.username} target="_blank" > <button className="btn btn-primary"> View Doctor's Profile </button></Link> <br></br>
              <br></br>
{/* <Link to={"/users/cancel-appointment?doctor=" + cur.user.username 
          + "&time=" + cur.time + "&date=" + date} > <button className="btn btn-danger"> Cancel Appointment </button></Link> <br></br> */}


        </div>
  </div>
  </div>
</div>
          
          
    </div>
}


function showNewSlot(date, current){
  
  return <div key={date}>
     
      {
        current.map((cur)=>(
          <div>
          <div style={{display : "inline-block", margin:'5px'}} className="card col-lg-8">
  <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
    {/* <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" className="img-fluid"/> */}
    
    <div className="mask" style={{backgroundColor: "rgba(21, 251, 251, 0.15)"}}></div>
   
  </div>
  <div className='container-fluid'>
  <div className='card-body row'>

        
            
            <div class="col-md-4">
            <ProfilePhoto username={cur.user.username} style={profilePhotoStyle}/>
            <Link to={"/chats/" + cur.user.username} > <button className="btn btn-secondary"> Chat </button></Link>
            </div>
            <div class="col-md-4">
          
            <p>{cur.user.name}</p>
            <p>{date}</p>  
            <p>Time: {cur.time}</p>
          
              </div>
              {/* <p> {receiver.username} </p> */}
            {/* <p > {unread?"New Message":""} </p> */}
            <div class="col-md-4">
            <Link to={"/user/" + cur.user.username} target="_blank" > <button className="btn btn-primary"> View Doctor's Profile </button></Link> <br></br>
              <br></br>
<Link to={"/users/cancel-appointment?doctor=" + cur.user.username 
          + "&time=" + cur.time + "&date=" + date} > <button className="btn btn-danger"> Cancel Appointment </button></Link> <br></br>


        </div>
  </div>
  </div>
</div>
          
         

       

          <br></br>
         </div>
        ))

      }          
  </div>
}


  

  if(!user.username || user.username=="") return <Unauthorized />
  else
  return (
    <div>
    <button type="button" class="btn btn-outline-dark btn-lg " style={{margin:'1%'}}>Upcoming Appointments</button>
     {
        Object.keys(newAppts).map((date, indexTime)=> showNewSlot(date, newAppts[date]))
      }
      
      <br></br> <br></br>
      
     
      <button type="button" class="btn btn-outline-dark btn-lg " style={{margin:'1%'}}> Previous Appointments</button>
      {
        Object.keys(oldAppts).map((date, indexTime)=> showOldSlot(date, oldAppts[date]))
      }


    </div>
  );
}

export default UserMyAppointment;