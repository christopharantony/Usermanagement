import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [values,setValues] = useState({
        name:"",
        mobile:"",
        email:"",
        password:"",
    });

    const generateError = (error) => 
    toast.error(error,{
        position: "bottom-right"
    })

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            if (!values.name) {
                generateError("Name is required");
            }else if (values.name.length < 3) {
                generateError("Name must be atleast 3 characters");
            }else if (values.name.length > 20) {
                generateError("Name must be less than 20 characters");
            }else if (!values.name.match(/^[A-Za-z][A-Za-z ]*$/)) {
                generateError("Enter a valid name");
            }else if (!values.mobile) {
                generateError("Mobile is required");
            }else if (values.mobile.match(/[^0-9]/g)) {
                generateError("Enter a valid mobile number");
            }else if (values.mobile.length !== 10) {
                generateError("Mobile must be 10 characters");
            }else if (!values.email) {
                generateError("Email is required");
            }else if (!values.email.match(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                generateError("Enter a valid email");
            }else if (!values.password) {
                generateError("Password is required");
            }else if (values.password.length < 4) {
                generateError("Password must be atleast 4 characters");
            }else if (values.password.length > 20) {
                generateError("Password must be less than 20 characters");
            }else{
            const {data} = await axios.post("http://localhost:4000/register", {
                ...values
            },{
                withCredentials:true
            });
            if (data){
                if (data.errors) {
                    const {name, mobile, email, password} = data.errors;
                    console.log(mobile);
                    if (email) {
                        generateError(email);
                    } else if (password) {
                        generateError(password);
                    } else if (name) {
                        generateError(name);
                    } else if (mobile) {
                        generateError(mobile);
                    }
                } else {
                    navigate("/");
                }
            }
        }
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className='container'>
            <h2>Register Account</h2>
            <form onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                    type="name" 
                    name="name" 
                    placeholder='Username' 
                    onChange={(e)=>{
                        setValues({...values,[e.target.name]:e.target.value})
                    }}
                    />
                </div>
                <div>
                    <label htmlFor="mobile">Phone Number</label>
                    <input 
                    type="name" 
                    name="mobile" 
                    placeholder='' 
                    onChange={(e)=>{
                        setValues({...values,[e.target.name]:e.target.value})
                    }}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="name" 
                    name="email" 
                    placeholder='Email' 
                    onChange={(e)=>{
                        setValues({...values,[e.target.name]:e.target.value})
                    }}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder='Password' 
                    onChange={(e)=>{
                        setValues({...values,[e.target.name]:e.target.value})
                    }}
                    />
                </div>
                <button type="submit">Submit</button>
                <span>
                    Already have an account? <Link to='/login' >Login</Link>
                </span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register
