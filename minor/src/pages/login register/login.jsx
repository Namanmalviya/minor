import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import {useState} from 'react';

function Login(){
const navigate=useNavigate();

const [email , setEmail]=useState('')
const[password,setPassword]=useState('')

const tohome=async()=>{
    try{
        const response= await axios.post('http://localhost:5000/Login',{
            email:email,
            password:password
        })
        console.log(response.data)
        if (response.data.message === 'user present') {
  localStorage.setItem('token', response.data.token)
  localStorage.setItem('user', JSON.stringify(response.data.user))
  navigate('/home')
}

else if (response.data.message === 'company present') {
  localStorage.setItem('token', response.data.token)
  localStorage.setItem('company', JSON.stringify(response.data.company))
  navigate('/')
}

        console.log(response.data.company);
       if(response.status===400 || response.data.message==='please signup')
        alert('please signup')
        console.log(email)
        console.log(password);
    }
    catch(err)
    {
        if(err.status===400 || err.data.message==='please signup'){
            alert('please signup')
        }
        console.log(err);
    }
}
const tosignup=()=>{
    navigate('/Signup')
}

    return(<>
    <div className=' text-black font-bold h-[50px] w-[600px] flex justify-center justify-self-center  items-center text-2xl'><p>Excellence Innovation Portal</p></div>
    <div className='h-screen flex justify-center items-center  ' >

        
            <div className='h-[500px] w-[500px] border-solid border-2 border-black bg-slate-900 rounded-2xl '>
                <h3 className="flex justify-center mt-5 font-bold text-2xl text-white">Login page</h3>
             <div className="flex mt-10 items-center justify-center font-bold text-white"> <p>Email:</p>
               <input
               className="border-2 border-black border-solid rounded-lg text-black"
               type="email"
               
               value={email}
               onChange={e=>setEmail(e.target.value)}
               ></input>
               </div>
                   <div className="flex mt-5 items-center justify-center font-bold text-white">
               <p>password:</p>
               <input
               className="border-2 border-black border-solid rounded-lg text-black"
               type="password"
               onChange={e=>setPassword(e.target.value)}
               value={password}></input>
              </div>
              
               <div className='flex justify-center'>
               <button className="flex justify-center w-[250px] bg-slate-100 mt-10 border-2 border-black border-solid rounded-lg font-bold "
               onClick={tohome}
               >Login</button>
               </div>
               <div className="font-medium mt-5  text-white">dont have an account? <button className="text-red-600" onClick={tosignup}><u >Singup</u></button></div>
            </div>
        </div>
    </>);
}
export default Login;