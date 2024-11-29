import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import "./Register.css"

function Register() {
 const [formData, setFormData] = useState({
   username: '',
   password: '',
   role: 'user'
 });
 const navigate = useNavigate();

 const API_URL = process.env.NODE_ENV === 'production'
 ? process.env.REACT_APP_API_URL_PROD
 : process.env.REACT_APP_API_URL_DEV;

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     await axios.post(`${API_URL}/auth/register`, formData);
     navigate('/');
   } catch (error) {
     console.error('Registration failed:', error);
   }
 };

 return (
   <div className="register-container">
     <h1>Register</h1>
     <form onSubmit={handleSubmit}>
       <div>
         <input
           type="text"
           placeholder="Username"
           value={formData.username}
           onChange={(e) => setFormData({...formData, username: e.target.value})}
         />
       </div>
       <div>
         <input
           type="password"
           placeholder="Password"
           value={formData.password}
           onChange={(e) => setFormData({...formData, password: e.target.value})}
         />
       </div>
       <div>
         <select
           value={formData.role}
           onChange={(e) => setFormData({...formData, role: e.target.value})}
         >
           <option value="user">User</option>
           <option value="admin">Admin</option>
         </select>
       </div>
       <button type="submit">Register</button>
     </form>
     <p>
       Already have an account? <Link to="/">Login</Link>
     </p>
   </div>
 );
}

export default Register;