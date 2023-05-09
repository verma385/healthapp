import * as React from 'react';
import Axios from "axios";
import Unauthorized from '../components/Unauthorized';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import { useParams } from "react-router-dom";
import Modal from './Modal';
import ModalRedirect from './ModalRedirect';
import ProfilePhoto from './ProfilePhoto';
// username is the username of the doctor
const DoctorPage = () => {
  const { username } = useParams();
  const [booked, setBooked] = useState([]);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [doc, setDoc] = useState({});
  const [isVisible, setIsVisible] = useState(false);


  
  const { user, setUser } = useContext(UserContext);
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
      setDoc({...res.data[0]});
      
    });
  }, []);

  useEffect(()=>{
    Axios({
      method: "POST",
      withCredentials: true,
      url: '/doctors/appointments',
      data: {
        doctor: username
      },
    }).then((res) => {
      var arr = [];
      var boo = res.data;
      Object.keys(boo).map((date, indexDate) => {
          arr.push({[date]:boo[date]});
    });
    
    setBooked(arr);

    });
  }, []);

  

  function submit_form(event){
    event.preventDefault();
    if(!selectedDate || !selectedTime){
        return;
    }
    Axios({
        method: "POST",
        withCredentials: true,
        url: '/doctors/book-appointment',
        data: {
          doctor: username,
          username: user.username,
          date: selectedDate,
          time: selectedTime
        },
      }).then((res) => {
            setMsg(res.data.message);
            setSuccess(res.data.success);
            setIsVisible(true);
      });

  }

  function handleChange(date, time){
    setSelectedDate(date);
    setSelectedTime(time);
    
  }

  function showSlot(current){
   
    // return (
    //     <div>
    //         {
    //         Object.keys(current).map((date, indexDate) => {
    //            return <div >
    //             <h4>{date}</h4>
    //                 {
    //             Object.keys(current[date]).map((time, indexTime)=>{
                    
    //             return <li key={date+"*"+time}>
    //             <input type="button" value={time} id={date+"*"+time} name="submit" onClick={()=>handleChange(date, time)}/> <br></br>
    //            </li>
           
    //             })
    //             }
    //             </div>

    //         })
    //         }
    //     </div>
    // )

return (
        <div>
            {
            Object.keys(current).map((date, indexDate) => {
               return (

               <div style={{display : "inline-block", margin:'5px'}} className="card col-md-4  text-center">
<div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
  {/* <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" className="img-fluid"/> */}
  
  <div className="mask" style={{backgroundColor: "rgba(21, 251, 251, 0.15)"}}></div>
 
</div>
<div className="card-body">

<div class="btn-group">
  <button type="button" class="btn btn-lg btn-info">{date}</button>
  <button type="button" class="btn btn-lg btn-info dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <div class="dropdown-menu">

                {
                 Object.keys(current[date]).map((time, indexTime)=>{
                    
             return <li className='card-text' key={date+"*"+time}>
             <input type="button" className='btn btn-outline-dark ' style={{height:'10%', width:'100%'}} value={time} id={date+"*"+time} name="submit" onClick={()=>handleChange(date, time)}/> <br></br>
              </li>
           
              })
             } 
     
  </div>
</div>
</div>
</div>
    
);



            })
            }
        </div>
    )

    
      
}
const profilePhotoStyle = {
  borderRadius: "100%",
  width: "70px",
  height: "70px",
  // backgroundColor: "#B90136"
}

  if(!user.username || user.username=="") return <Unauthorized />
  else
 return (
   
    <div style={{margin:'2%'}}>
        {   selectedDate && selectedTime && 
            <div>
                <h3>Please confirm the following details for the appointment</h3>
                <div style={{display : "inline-block", margin:'5px'}} className="card col-md-4  text-center">
  <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
    {/* <img src="https://mdbcdn.b-cdn.net/img/new/standard/nature/111.webp" className="img-fluid"/> */}
    
    <div className="mask" style={{backgroundColor: "rgba(21, 251, 251, 0.15)"}}></div>
   
  </div>
  <div className="card-body">

    <ProfilePhoto username={username} style={profilePhotoStyle}/> 
    <h5 className="card-title"> {doc.name } </h5>
    <p className="card-text"> Speciality : {doc.speciality }</p>
    <p className="card-text"> Clinic : {doc.clinic }</p>
    <p className="card-text"> City: {doc.city }</p>
    <p className="card-text"> State : {doc.state }</p>  
    <p className='card-text'> Time: {selectedDate + "  " + selectedTime} </p>
    {/* <Link to={"/user/" + username} target='_blank'> <button className="btn btn-primary"> View Profile </button></Link>
    <Link to={"/doctors/" + username} target='_blank'> <button className="btn btn-primary"> Book Appointment </button></Link> */}
    {/* <Link to={"/chat/" + username}> <button className="btn btn-primary"> Chat </button></Link> */}
  </div>
</div>

                {/* <h4> Name: {doc.name} </h4>
                <h4> Speciality: {doc.speciality} </h4>
                <h4> Clinic: {doc.clinic} </h4>
                <h5> City: {doc.city} </h5>
                <h5> State: {doc.state} </h5>
                */}

            <form onSubmit={submit_form}>
                <button className="btn btn-primary" type="submit">Book Appointment</button>
            </form>
            </div>
        }
        
            
        { (!success && !selectedDate && !selectedTime) &&  "Select the slot for booking"  || <br></br> }
       
        
        {   (!success && !selectedDate && !selectedTime) &&
            booked.map((current)=>showSlot(current))
        }

        
        {isVisible && success && <ModalRedirect message={msg} isVisible={isVisible} setIsVisible={setIsVisible} replace={false} redirectLocation={"/users/my-appointments"}/>}
        {isVisible && !success && <Modal message={msg} isVisible={isVisible} setIsVisible={setIsVisible}/>}

   </div>
 );
};

export default DoctorPage;