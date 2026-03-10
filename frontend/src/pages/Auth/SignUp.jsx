import React, { useState,useNa } from 'react';
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signupUser, loginUser } from '../../redux/slices/authSlice';

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    collegeName: '',
    collegeId: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    
    dispatch(signupUser(form)).unwrap()
      .then((res) => {
        setMessage('Success');
        localStorage.setItem('token', res.token);
        navigate('/login')
      })
      .catch((err) => {
        setMessage(err.message || 'Request failed');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded">
      <h2 className="text-2xl mb-4">Student Login / Signup</h2>

      {message && <div className="mb-3 text-green-600">{message}</div>}
      {error && <div className="mb-3 text-red-600">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">User Name</label>
          <input
            name="userName"
            value={form.userName}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Phone Number</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">College Name</label>
          <input
            name="collegeName"
            value={form.collegeName}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">College ID</label>
          <input
            name="collegeId"
            value={form.collegeId}
            onChange={handleChange}
            className="w-full border px-2 py-1"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;