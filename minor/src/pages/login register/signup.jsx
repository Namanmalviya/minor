import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
function Signup(){
     const [email,setEmail]=useState('')
     const [password,setPassword]=useState('')
     const [confirmpassword,setConfirmpassword]=useState('')

const navigate=useNavigate();
    const tologin=async()=>{
        try{
        const response=await axios.post('http://localhost:5000/Signup',{
            email:email,
            password:password
        })
        alert(response.data.message)
        
    }
        
         catch(err){
            if(err.status===400 || err.data.message==='user exist'){

             return alert('user exist')}

             else{
            console.log(err)}
             } 

        console.log(email);
        console.log(password)
        console.log(confirmpassword)
        if(password===confirmpassword){

        navigate('/Login')
        }
        else{
            alert("password did not match")
        }
    }
    const directtologin=()=>{
           navigate('/Login')
    }

    const toregister=()=>{
        navigate('/Register')
    }
    

    return(
        <>
        <div className='h-screen flex justify-center items-center bg-purple-300'>
            <div className='h-[500px] w-[500px] border-solid border-2 border-black bg-slate-100 rounded-2xl '>
                <h3 className="flex justify-center mt-5 font-bold text-2xl">Signup page</h3>
             <div className="flex mt-10 items-center justify-center font-bold"> <p>Email:</p>
               <input
               className="border-2 border-black border-solid rounded-lg"
               type="email"
               value={email}
               onChange={e=>setEmail(e.target.value)}
               ></input>
               </div>
                   <div className="flex mt-5 items-center justify-center font-bold">
               <p>password:</p>
               <input
               className="border-2 border-black border-solid rounded-lg"
               type="password"
               value={password}
               onChange={e=>setPassword(e.target.value)}></input>
              </div>
              <div className="flex mt-5 items-center justify-center font-bold">
               <p>confirm:</p>
               <input 
                className="border-2 border-black border-solid rounded-lg"
               type="password"
               value={confirmpassword}
               onChange={e=>setConfirmpassword(e.target.value)}></input>
               </div>
               <div className='flex justify-center'>
               <button className="flex justify-center w-[250px] bg-purple-300 mt-10 border-2 border-black border-solid rounded-lg font-bold" onClick={tologin}>signup</button>
               </div>
                <p className="font-medium mt-5 text-black">Already have an account? <button className="text-blue-800" ><u >Loign</u></button></p>
                      <button className='bg-blue-800 flex justify-center w-[200px] ml-12 mt-3 rounded-lg h-[30px] text-white font-bold' onClick={toregister}>register as an institute</button>
            </div>
        </div>
        </>
    );
}
export default Signup;