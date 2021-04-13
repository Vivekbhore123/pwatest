import React,{useState,useEffect} from 'react'
import Axios from "axios";


const Form = ({ llst, setLlst, setFix, fix }) => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [dob, setDob] = useState("");
  const [mobile, setMobile] = useState("");
  const [listOfFriends, setListOfFriends] = useState([]);

  const addFriend = () => {
    if(name==="" || mail==="" || dob==="" || mobile==="")
    {
      alert("fill all fields")
    }
    else
    {
      // console.log(dob); 

      var strp = mobile;
      var no = strp.length;

      var strptwo = name;
      var notwo = strptwo.length;

      function ValidateEmail(mail) {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (mail.match(mailformat)) {
          //  alert("Valid email address!");
          return true;
        } else {
          alert("You have entered an invalid email address!");
          return false;
        }
      }

      var str = dob;
      var res = str.replace("-", "");
      res = res.replace("-", "");
      //  alert(res.trim());
      var dobt = res;
      var year = Number(dobt.substr(0, 4));
      var month = Number(dobt.substr(4, 2)) - 1;
      var day = Number(dobt.substr(6, 2));
      var today = new Date();
      var age = today.getFullYear() - year;
      if (
        today.getMonth() < month ||
        (today.getMonth() === month && today.getDate() < day)
      ) {
        age--;
      }

      // alert(age);
      if (age >= 18) {
        const mob = Number(mobile);
        if (ValidateEmail(mail)) {
          if (no === 10 && Number.isInteger(mob)) {
            if (notwo >= 3) {
              Axios.post("https://vivekappmern.herokuapp.com/addfriend", {
                name: name,
                mail: mail,
                dob: dob,
                mobile: mobile,
              })
                .then((response) => {
                  // console.log(response);
                  setListOfFriends([
                    ...listOfFriends,
                    {
                      _id: response.data.id,
                      name: name,
                      mail: mail,
                      dob: dob,
                      mobile: mobile,
                    },
                  ]);
                  setLlst(listOfFriends);
                  setName("");
                  setMail("");
                  setDob("");
                  setMobile("");
                })
                .then(() => {
                  setFix(false);
                });
            } else {
              alert("name should contain at least 3 characters");
            }
          } else {
            alert("invalid mobile no");
          }
        }
      } else {
        alert("age must be greater than 18");
      }
    }
   
  };

  useEffect(() => {
    Axios.get("https://vivekappmern.herokuapp.com/read")
      .then((response) => {
        setListOfFriends(response.data);
        setLlst(listOfFriends);
      })
      .catch(() => {
        console.log("ERR");
      });
      
  }, [listOfFriends,setLlst]);

  return (
    <div className="App">
      <div className="container register">
        <div className="row">
          <div className="col-md-3 register-left">
            <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt="" />
            <h3>Assignment for internship "with validation update"</h3>
            <p>
              Fill the details. You will be redirected to new page once you
              submit the form and name will appear in list. A mail will be sent
              to you for confirmation
            </p>
          </div>
          <div className="col-md-9 register-right">
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="home">
                <h3 className="register-heading">made by vivek bhore</h3>
                <div className="row register-form">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Full Name *"
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Date of birth</label>
                      <input
                        type="date"
                        className="form-control"
                        placeholder="Date of birth *"
                        value={dob}
                        onChange={(event) => {
                          setDob(event.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Mail</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Your Email *"
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                        value={mail}
                        onChange={(event) => {
                          setMail(event.target.value);
                        }}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Mobile</label>
                      <input
                        type="text"
                        minLength="10"
                        maxLength="10"
                        name="txtEmpPhone"
                        className="form-control"
                        placeholder="Your Phone 10 digit *"
                        value={mobile}
                        onChange={(event) => {
                          setMobile(event.target.value);
                        }}
                        required
                      />
                    </div>

                    <input
                      type="submit"
                      className="btnRegister"
                      value="Submit"
                      onClick={addFriend}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 

export default Form
