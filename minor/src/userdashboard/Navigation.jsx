import { useNavigate } from "react-router-dom";
//import logo from '../routes/logo.jpg'
import { FaSearchengin } from "react-icons/fa6";
import {useEffect, useState} from 'react'
import Chatai from './Chatai'
import Home from './Home'

function Navigation(){
   
    
   
   
const navigate=useNavigate()
     const toprofile = () => {
        navigate('/profile')
    }
    const tohome=()=>{
        navigate('/Home')
    }
    const chatai=()=>{
        navigate('/Chatai')
    }
    return(<>
    <nav className="h-[70px] w-screen bg-slate-900 flex items-center border-1 fixed border-b-2 border-white cursor-pointer ">
                <div className="h-[60px] w-[400px] ml-10 flex">
                    {/* <img className='h-[50px] w-[50px] mix-blend-multiply flex mt-1 bg-transparent' src={logo} alt="" /> */}
                    <div>
                        <p className="font-bold text-xl text-blue-500">Innovation Excellence Portal</p>
                        <p className="font-semibold text-white">government of india initiative</p>
                    </div>
                </div>
                <div className="flex">
                    <input className='h-[30px] w-[250px] placeholder:text-center rounded-lg' type="text" placeholder='search' />
                    <button className='bg-white rounded-lg ml-1 h-[30px] w-[30px]  flex justify-center items-center '><FaSearchengin /></button>
                </div>
                <div className='flex justify-around w-[400px] ml-20 text-white font-bold'>
                    <select name='filter'  className='font-bold text-lg flex ml-4 rounded-lg bg-black text-white'>
                        <option value={''}>innovations</option>
                        <option value={'startup'} >startup</option>
                        {/* <option value={'human'}>human</option>
                        <option value={'medical'}>medical</option>
                        <option value={'education'}>education</option> */}
                    </select>
                    <div  className='cursor-pointer text-white'>
                        <u onClick={chatai}>chat-AI</u>
                    </div>
                    <p onClick={toprofile}>profile</p>
                    <p onClick={tohome}>Home</p>
    
                </div>
                
            </nav>
                        

    </>);
   
}
export default Navigation
