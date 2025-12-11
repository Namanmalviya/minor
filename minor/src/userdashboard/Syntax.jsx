//import logo from '../routes/logo.jpg'
import 'chart.js/auto'
import { useRef, useState,useEffect } from 'react'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FaArrowTrendUp } from "react-icons/fa6";
import innovation from './innovation.json'
import Navigation from './Navigation'
import Info from './Info'


function Syntax({type,label}) {
    //const collages = innovation[0]
    //    const type=innovation
    

    const Navigate = useNavigate();
    const [loading, setLoading] = useState(false)
   // const [startup,useStartup]=useState(false)
   const tostartup=()=>{
    Navigate('/Startup')
   } 
   
   
   
   const toresearch=()=>{
    Navigate('/Research')
   }

   const toinnovation=()=>{
    Navigate('/Home')
   }
    const collageinfo = async (index) => {
      
        try {
            const response = await axios.post(`http://localhost:5000/innovationinfo`)
            //console.log(JSON.stringify(innovation.name))
            setLoading(true)
            console.log(index)
            
                
          
             

            setTimeout(() => {
                setLoading(false)
                Navigate(`/${label}info`, { state: { index } })
            }, 1000)

        }
        catch (err) {
            console.log(err)
        }
    
   
}
    const aboutRef = useRef();
    const scrolltoabout = () => {
        if (aboutRef.current) {
            aboutRef.current.scrollIntoView({
                behavior: "smooth",
            })
        }
    }

   const years=[2021,2025,2026,2030,2032,2035]
const users=[
  type[0]?.users_then,


  type[0]?.users_2025,
  
  type[0]?.users_2026,
  250000,
  200000,
  type[0]?.projected_users_2035
]

const chartdata={
   labels:  years.map(y=> `${y}`),
    datasets:[{
        label: 'users',
        data: users,
        fill:false,
        tension:0.3
    }]

}



    return (<div className={`bg-slate-900 `}>{loading && (
        <div className="fixed inset-0 flex items-center justify-center h-100vw bg-black backdrop-blur-lg bg-opacity-50 z-50 text-white ">fetching data...</div>
    )}
    
         <Navigation /> 
        
        <div className=' pt-20'>
            <div className='h-[50px] w-screen text-white flex justify-around'>
                <u onClick={toinnovation}>innovation</u>
                <u onClick={tostartup}>startup</u>
                <u onClick={toresearch}>research</u>
                <u >other</u>
                <u>other</u>
            </div>
<div className='flex'>
            <div className='w-[460px] h-[630px]  bg-slate-900 border-[1px] border-white border-solid flex justify-center  overflow-y-scroll '>

                <ul>
                    <h1 className='text-white mt-5 ml-5 font-bold text-2xl'><u>Top Growing {label}</u></h1>
                     {type.map((item, index) => (

                        <li key={index} className='font-bold text-white bg-slate-800 h-[80px] border-[1px] border-white mt-5 flex items-center pl-5 rounded-lg w-[400px] justify-between cursor-pointer ' onClick={()=>collageinfo(index)}>
                            <div className='flex'>{index + 1}
                                <p className='mr-3'>.</p>   {item.name}
                            </div>
                            <div className='text-sm font-bold text-green-400 mr-3'><FaArrowTrendUp /> +{Math.floor(Math.random() * 1000) / 100}</div>

                        </li>
                    ))} 

                </ul>
            </div>
            <div className='flex-1 bg-slate-900 border border-white'>
                <div className='h-[100px] w-[600px] bg-slate-500 mt-7 ml-7 rounded-2xl flex justify-between items-center text-white font-bold text-2xl pl-7'>1. {innovation[0].name} <div className='text-green-400 pr-7'><p className='flex justify-center'><FaArrowTrendUp /></p><p className='text-sm'>Top Growing</p></div></div>
                <p className='text-white'>{type[0]?.name} is a rapid growing tech expected to conquer a large spot in international market and leades to create a greate revenue invented by {innovation[0]?.invented_by} </p>
                <div className='h-[500px] w-[700px]'>

                    <Bar
                        data={chartdata} />
                </div>
            </div>

        </div>
        </div>
        <div className='text-white' ref={aboutRef}>
            <h2>about us</h2>
            Excellence innovation portal is a smart ai website that gives the leatest data and future predicts of new innovation all around the world ,
            Where the innovation took place?
            Where invented and by whome?
            what aree the future growth and investments
        </div>
        <footer className='text-white pt-20 border-t-2 border-white'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam commodi, id nam repellat provident reprehenderit atque molestiae perspiciatis, corrupti amet ea officia mollitia! Amet, doloremque harum nulla inventore odit animi perferendis sed eum. Nesciunt ducimus a suscipit facere earum facilis, laboriosam placeat asperiores similique impedit minus voluptatum hic corporis nam error! Optio velit tenetur sed quibusdam minima ex, enim ratione. Dignissimos earum temporibus blanditiis quos animi. Modi at architecto id blanditiis veritatis sit neque aut nam inventore nulla! Exercitationem, dolor reiciendis facilis perspiciatis eligendi vitae quae dicta odio aut, culpa a at facere necessitatibus, rem ipsa reprehenderit veritatis mollitia officiis. Temporibus, quibusdam! Possimus, repellendus tenetur natus eum et, necessitatibus voluptate totam expedita vitae tempora impedit ea? At molestias modi sunt quis minima? Explicabo maiores accusantium, quos dolores iste, illo hic voluptatum in sint inventore saepe nisi deserunt eius exercitationem sit officiis rem nemo tempore laborum iure temporibus sequi voluptate? Odit!

        </footer>
       
    </div>
    );
}

export default Syntax