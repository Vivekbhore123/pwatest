import React from "react";
import Axios from "axios";


export default function Ema({ listOfFriends }) {


   Axios.post("https://vivekappmern.herokuapp.com/mail", {
     name: listOfFriends[listOfFriends.length - 1].name,
     mail: listOfFriends[listOfFriends.length - 1].mail,
     dob: listOfFriends[listOfFriends.length - 1].dob,
     mobile: listOfFriends[listOfFriends.length - 1].mobile,
   }).then((response) => {
     console.log(response.data);
   });
  
   return (
  <div>
      <h5>email has been sent you at </h5>
      <h5>{listOfFriends[listOfFriends.length - 1].mail}</h5>
    </div>
  );
}



