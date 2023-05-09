import * as React from 'react';
import Axios from "axios";
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import "./home.css";
import image from "../public/images/main_page.png";
import Chatbot from './Chatbot';
const User = () => {
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

  
  return (

    <div className=''>

    {
      user.username && user.username != "" && user.role=='user' && 
      <Chatbot />
    }
    {
      (!user.username || user.username == "" || user.role=="doctor")  &&
      <img src={image} className='img-fluid'></img>
    }
      
      {/* <h1>Welcome to HealthBOT</h1>
       */}
       <section id="about">
  <div class="ahead">
  <h3>About our Website</h3>
    </div>
    <div class="para">
  <p1> The website is an easy way for faculties in the college for scheduling and taking records of their lectures.
      A faculty can insert the details of the lecture delivered by him/her in other colleges, seminars and other
      events. A faculty can edit and delete some wrong information anytime he/she wants. The records are safe and can be edited or deleted by the user only.
      An HOD can view and monitor the faculties' records of his/her department.
      The website can be used by colleges so that they can keep track of all the extra work done by their faculties.
      The website is developed by 3rd year B.E (Computer Science and Engineering) students, Abhay and Ankit Bargotra from Ramaiah Institute of Technology.
      Contact information is provided below.
      
    </p1>
   
    </div>
    
            
    </section>
    <footer id="footer">

  <div class="icons">

    <a href="" class="foot-icons fa fa-facebook"></a>
    <a href="#" class="foot-icons fa fa-twitter"></a>
    <a target="_blank" href="https://www.instagram.com/abhay.01_/" class="foot-icons fa fa-instagram"></a>

</div>
<i class="foot-icons fa fa-envelope-square"></i><p3> Mail us at - healthbot@gmail.com</p3>
<br></br>
<p3>Connect with us - 7006638945 9906082294</p3>
    <p>2023 HealthBOT</p>

  </footer> 

    </div>
  );
};

export default User;