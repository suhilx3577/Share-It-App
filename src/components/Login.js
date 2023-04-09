import {
  GoogleOAuthProvider,
  GoogleLogin,
  googleLogout,
} from "@react-oauth/google";

import { useNavigate , redirect} from "react-router-dom";
import jwt_decode from "jwt-decode"

import { client } from "../client"; 

import logo from "../assets/logo.png";
import shareVideo from "../assets/share.mp4";

const Login = () => {

  const onSuccess = (response) =>{
    localStorage.setItem('user',JSON.stringify(response.profileObj))
    const decodeHeader = jwt_decode(response.credential);
    console.log(decodeHeader)
    const {name , sub, picture } = decodeHeader

    const doc = {
      _id: sub,
      _type: 'user',
      userName:name,
      imageUrl:picture
    }
    client.createIfNotExists(doc)
    .then(()=>{
      redirect('/',{replace:true})
    })



  }


  const onFailure = (response) =>{
    console.log(response)
  }


  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative h-full w-full">
        <video
          src={shareVideo}
          type="video/mp4"
          controls={false}
          loop
          autoPlay
          muted
          className="h-full w-full object-cover"
        />
      </div>
      <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 right-0 left-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="130px" alt="logo" />
          <div className="shadow-2xl">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}>
              <GoogleLogin
                onSuccess={onSuccess}
                onError={onFailure}
                buttonText="Login"
                cookipolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
