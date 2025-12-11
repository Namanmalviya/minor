import Navigation from './Navigation'
import { IoSendSharp } from "react-icons/io5";
import react,{useState,useEffect} from 'react'
import axios from 'axios'
function Chatai(){
    const [prompt,setPrompt]=useState('')
    const [answer,setAnswer]=useState('loading...')

  
    const enterprompt=async()=>{
     try{
         
 const res=await axios.post('http://localhost:5000/chatai',{
            prompt:prompt
        })
      
       if(res.status==200){
        //console.log(res.data.answer)
        setAnswer(res.data.answer)
        const utterance = new SpeechSynthesisUtterance(res.data.answer);
    utterance.voice = window.speechSynthesis.getVoices()[0]; // pick a voice
    utterance.rate = 1; // speed
    utterance.pitch = 1; // pitch
    window.speechSynthesis.speak(utterance);
       }
        console.log(prompt)
          setPrompt('')
       }
     
catch(err){
    console.log(err)
}
//    const speak = () => {
//     const utterance = new SpeechSynthesisUtterance(res.data.answer);
//     utterance.voice = window.speechSynthesis.getVoices()[0]; // pick a voice
//     utterance.rate = 1; // speed
//     utterance.pitch = 1; // pitch
//     window.speechSynthesis.speak(utterance);
//   };
 }
    return(<>
    <Navigation />
    <div className="bg-slate-900 h-screen w-screen flex justify-center items-center">
        <div className="h-[673px] w-[700px] bg-slate-700 pt-20 overflow-y-scroll">
            <p className='text-white font-bold text-3xl justify-self-center'>Ask AI</p>
                  <div className='flex ml-20 mt-10  items-center fixed'>
                    <input type='text'placeholder='ask anything...' className='bg-slate-900 w-[500px]  flex items-center h-[50px] rounded-2xl placeholder:text-lg placeholder:justify-self-center placeholder:flex placeholder:items-self-center text-white' onChange={(e)=>setPrompt(e.target.value)} value={prompt}></input>
                  

                  <IoSendSharp className='h-[50px] w-[30px] text-white ml-2' onClick={enterprompt}/>    
                                 
                  </div>
                   <p className='ml-20 mt-24 text-white'>{answer}</p> 
        </div>

    </div>
    </>);
}
export default Chatai;