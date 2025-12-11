import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function Register() {
  const [companyName, setCompanyName] = useState('')
  const [industry, setIndustry] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [registrationNumber, setRegistrationNumber] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [country, setCountry] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()

    if (password !== confirm) {
      return alert('Passwords do not match')
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/Register',
        {
          companyName,
          industry,
          companySize,
          
          companyType,
          registrationNumber,
          email,
          password,
          website,
          country
        }
      )

      if (response.status === 201) {
        navigate('/Login')
      }
    } catch (err) {
      if (err.response?.status === 400) {
        alert('Company already registered')
      } else {
        console.error(err)
        alert('Registration failed')
      }
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <form
        onSubmit={submit}
        className="space-y-6 bg-slate-800 p-10 rounded-xl w-1/2 text-white"
      >
        <h1 className="font-bold text-2xl text-center">
          <u>Company Registration</u>
        </h1>

        {/* Company Name */}
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="input"
          required
        />

        {/* Industry */}
        <input
          type="text"
          placeholder="Industry"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="input"
          required
        />

        {/* Company Size */}
        <select
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value)}
          className="input"
          required
        >
          <option value="">Company Size</option>
          <option>1-10</option>
          <option>11-50</option>
          <option>51-200</option>
          <option>201-500</option>
          <option>500+</option>
        </select>
        <select
          value={companyType}
          onChange={(e) => setCompanyType(e.target.value)}
          className="input"
          required
        >
          <option value="">type</option>
          <option>Innovation</option>
          <option>Startup</option>
          <option>research</option>
          {/* <option>201-500</option>
          <option>500+</option> */}
        </select>

        {/* Registration Number */}
        <input
          type="text"
          placeholder="Registration Number"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          className="input"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Official Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />

        {/* Website */}
        <input
          type="url"
          placeholder="Website (optional)"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="input"
        />

        {/* Country */}
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="input"
          required
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="input"
          required
        />
          <div>verificatin documents:- <input type='file' className='ml-20'></input></div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition py-2 rounded-lg font-bold"
        >
          Register
        </button>

        <style>
          {`
          .input {
            width: 100%;
            padding: 0.6rem;
            border-radius: 0.5rem;
            background: #78716c;
            color: white;
          }
        `}
        </style>
      </form>
    </div>
  )
}

export default Register
