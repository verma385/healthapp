import * as React from 'react';
import Axios from "axios";
import Message from '../cards/Message';
import Unauthorized from '../components/Unauthorized';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../components/UserContext';
import { useParams } from "react-router-dom";
import "./chats.css"
import ProfilePhoto from '../components/ProfilePhoto';

// Props contain the RECEIVER'S Information
const Chatbot = () => {
    const { username } = useParams();
    const [receiver, setReceiver] = useState({});
    const [messages, setMessages] = useState([
      {message : "Heyyy, How are you doing today ?",_id:"1", align:'left'}
  
      ]);
      const [changed, setChanged] = useState(false);
      const [userMsg, setUserMsg] = useState([]); 
      const [subNo, setSubNo] = useState(false);
  
    const [sendMsg, setSendMsg] = useState("");
    const { user, setUser } = useContext(UserContext);
    function submitYes(event){
        event.preventDefault();
        var msg = messages;
        msg.push({message : "Great, Have a nice day :)",_id:"2", align:'left'});
        setMessages(msg);
        
        var umsg = userMsg;
        umsg.push({message : "Good",_id:"1", align:'right'})
        setUserMsg(umsg);

        setChanged(!changed)
    }
    function submitNo(event){
        event.preventDefault();
        var umsg = userMsg;
        umsg.push({message : "Not Good",_id:"2", align:'right'})
        setUserMsg(umsg);

        setChanged(!changed);
        
        setSubNo(true);
    }
    function showMessageButton(){
        return <div className="d-flex flex-row justify-content-start mb-4">
        <div className="p-3 ms-3" style={{display:'inline-flex',borderRadius: "15px", backgroundColor: "rgba(57, 192, 237,.2)"}}>
        <form onSubmit={submitYes}>
            <button type='submit' className='btn btn-success' style={{margin:'2px'}}>Good</button>
        </form>
        <form onClick={submitNo}>
            <button type='submit' className='btn btn-danger' style={{margin:'2px'}}>Not Good</button>
          </form>
        </div>
        
      </div>
       
      }
 
  const profilePhotoStyle = {
    borderRadius: "100%",
    width: "40px",
    height: "40px",
    display:"flex",
  }

  function showMessage(mess){
    return <Message key = {mess._id} message = {mess.message} align={mess.align} />

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


//   useEffect(()=>{
//     var message = {message : "Heyyy, How are you doing today ?",_id:"1", align:'left'}

//     messages.push(message);

//   }, [user]);

    // useEffect( () =>{
    //     const interval = setInterval(()=>{
    //         Axios({
    //             method:"POST",
    //             withCredentials:true,
    //             url:'/messages',
    //             data: {
    //                 sender: user.username,
    //                 receiver: username
    //             },
    //         }).then((res) => {
    //             setMessages([...res.data]);
    //         });
    //      }, 1000);
    //      return () => clearInterval(interval);
    // }, [sendMsg]);

 

  function submit_form(event){
    event.preventDefault();
  
  }

  if(!user.username || user.username=="") return <Unauthorized />
  else
 return (

   
    <div>

   <section style={{backgroundColor: "#eee"}}>
  <div className="container py-5">

    <div className="row d-flex justify-content-center">
      <div className="col-lg-12 col-lg-12 col-xl-8">

        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center p-3"
            style={{borderTop: "4px solid #39c0ed"}}>
              <div class="col-sm-3">
            <ProfilePhoto username={receiver.username} style={profilePhotoStyle}/>
            </div>

            
            <h5 className="mb-0">{receiver.name}</h5>
            
            <div className="d-flex flex-row align-items-center">
              
              <i className="fas fa-minus me-3 text-muted fa-xs"></i>
              <i className="fas fa-comments me-3 text-muted fa-xs"></i>
              <i className="fas fa-times text-muted fa-xs"></i>
            </div>
          </div>
          <div className="card-body scroll" data-mdb-perfect-scrollbar="true" style={{position: "relative", height: "400px"}}>
          
          {
            showMessage(messages[0])
          } 
          {
            showMessageButton()
          }
          {
            userMsg.length>0 && showMessage(userMsg[0])
          }
          {
            messages.length>1 && showMessage(messages[1])
          }
            
            {
                subNo && 
                <div className="d-flex flex-row justify-content-start mb-4">
        <div className="p-3 ms-3" style={{borderRadius: "15px", backgroundColor: "rgba(57, 192, 237,.2)"}}>
        <p>Click on the following link to track your symptoms</p>
        <a href='/prediction'> <button className="btn btn-primary" >Track Symptoms </button></a>
        </div>
        
      </div>
            }
          </div>
          <form onSubmit={submit_form}>
          <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
            <div className="input-group mb-0">
              <input type="text" className="form-control" onChange={(e)=>{setSendMsg(e.target.value)}} value={sendMsg} placeholder="Type message"
                aria-label="Recipient's username" aria-describedby="button-addon2" />
              <button className="btn"  type="submit" id="button-addon2" style={{paddingTop: ".55rem", color:"white", backgroundColor:"#39c0ed"}}>
                Send
              </button>
             
            </div>
          </div>
          </form>
        </div>

      </div>
    </div>

  </div>
</section>

   </div>

 );
};

export default Chatbot;