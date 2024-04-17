
import React, { useState } from 'react';
import { SD_Roles } from '../Utility/SD';
import { inputHelper, toastNotify } from '../Helper';
import { useRegisterUserMutation } from '../Apis/authApi';
import apiResponse from '../Interfaces/apiResponse';
import { useNavigate } from 'react-router-dom';
import { MainLoader } from '../Components/Page/Common';
import "../Style/order.css";

function Register() {
    const [registerUser] = useRegisterUserMutation();
    const [loading, setLoding] = useState(false);
    const navigate = useNavigate();
    const [userInput, setUserInput] = useState({
      userName: "",
      password: "",
      role: "",
      name: "",
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const tempData = inputHelper(e,userInput);
        setUserInput(tempData)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setLoding(true)

      const response: apiResponse = await registerUser({
        userName: userInput.userName,
        password: userInput.password,
        role: userInput.role,
        name: userInput.name,
      });
      if(response.data){
        toastNotify("Registration Successful! Please login to continue.");
        navigate("/login")
      } else if(response.error){
        toastNotify(response.error.data.errorMessages[0], "error");
        
      }

      setLoding(false)
    }

  return (
    <div className="container text-center p-4">
      {loading && < MainLoader />}
      <form method="post" onSubmit={handleSubmit}>
        <h1 className="mt-5">Register</h1>
        <div className="mt-5">
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Username"
              required
              name="userName"
              value={userInput.userName}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              required
              name="name"
              value={userInput.name}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              required
              name="password"
              value={userInput.password}
              onChange={handleUserInput}
            />
          </div>
          <div className="col-sm-6 offset-sm-3 col-xs-12 mt-4">
            <select
              className="form-control form-select"
              required
              name="role"
              value={userInput.role}
              onChange={handleUserInput}
            >
              <option value="">--Select Role--</option>
              <option value={`${SD_Roles.CUSTOMER}`}>Customer</option>
              <option value={`${SD_Roles.ADMIN}`}>Admin</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button type="submit" className="btn btn-success registerBtn" disabled={loading}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register