import * as React from 'react';
import {useState, useEffect, useContext} from "react";
import Axios from "axios";
import { UserContext } from './UserContext';
import Unauthorized from './Unauthorized';
import ModalRedirect from './ModalRedirect';
import "./editprofilphoto.css";
const EditProfilePhoto = () => {
    const [photo, setPhoto] = useState('');
    const [msg, setMsg] = useState("");
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

    
 
    function form_submit(event){
        event.preventDefault();
        if(!photo){
            setMsg("Please select a photo to update the profile picture.");
            return;
        }

        const formData = new FormData();
        formData.append('photo', photo);
        formData.append("username", user.username);
        
        Axios({
            method:"POST",
            withCredentials:true,
            url:'/profile-photo/upload',
            data: formData,
        }).then((res)=>{
            setMsg(res.data.message);
            setIsVisible(true);
        });
    }
    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
      }
      if(!user.username || user.username=="") return <Unauthorized />
      else
  return (
//    <div>
//            {isVisible && <ModalRedirect message={msg} isVisible={isVisible} setIsVisible={setIsVisible} redirectLocation="/user" />}

//            <div class="input-group">
//   <div class="input-group-prepend">
//     <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
//   </div>
//   <div class="custom-file">
//   <form onSubmit={form_submit}>
//     <input type="file" class="custom-file-input" id="inputGroupFile01" onChange={ handlePhotoChange } name="photo"
//       aria-describedby="inputGroupFileAddon01" />
//     <label class="custom-file-label" for="inputGroupFile01">Choose file</label> 
//    <div className="col-6 mb-3">
//    <button type='submit'> Update Profile Photo </button>
//    </div>
   

//     </form>
//   </div>
// </div>
         
            
//    </div>
<div  >
           {isVisible && <ModalRedirect message={msg} isVisible={isVisible} setIsVisible={setIsVisible} redirectLocation="/user" />}

<form onSubmit={form_submit}>
<div className="file-upload" name="photo">
  <label for="file">Edit photo</label>
  <input type="file"  onChange={ handlePhotoChange } id="file" name="file"></input>
 
</div> <br></br>
<button type='submit' className='btn btn-info'> Update Profile Photo </button>
</form>
</div>
 );
};

export default EditProfilePhoto;