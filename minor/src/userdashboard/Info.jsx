import axios from 'axios';
import {useState,useEffect} from 'react'
import {Chart as ChartJS} from 'chart.js/auto'
import {Bar,Line} from 'react-chartjs-2'
import Navigation from './Navigation'
import { useLocation } from 'react-router-dom';
import Home from './Home'


function Info({type , label,link}){
  const Location=useLocation()
  const {index}=Location.state || {};
  const [data,setData]=useState()
const [collagedata,setCollagedata]=useState([])

console.log(link)
useEffect(()=>{

     axios.post(`http://localhost:5000/${link}`)
    .then(res=>{setData(res.data)
  setCollagedata(res.data)})
    .catch(err=>console.log(err))

   

},[])
console.log(collagedata)

const years=[2021,2025,2026,2030,2032,2035]
const users=[
  collagedata[index]?.users_then,


  collagedata[index]?.users_2025,
  
  collagedata[index]?.users_2026,
  250000,
  200000,
  collagedata[index]?.projected_users_2035
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
   
const bardata={
   labels:  years.map(y=> `${y}`),
    datasets:[{
        label: 'users',
        data: users,
       
    }]

}
   




    return(
        <div className='bg-slate-900'>
           <Navigation /> 
       
         <div className='pt-[100px] text-white'><pre>
          
            <u className='flex text-blue-600 font-bold text-3xl justify-center'>{collagedata[index]?.name}</u>
            
            <p className='text-red-500 mt-5 flex justify-center text-2xl font-bold'>Category:{collagedata[index]?.category}</p>
            <p className='w-screen break-words whitespace-normal'> {collagedata[index]?.details}</p>
            <p className=''> invented by:{collagedata[index]?.invented_by}</p>
            <p className=''> year invented:{collagedata[index]?.year_invented}</p>
            <p className=''> source:{collagedata[index]?.source}</p>
          </pre>
          </div>
       
       <div className='flex'>
        <div >
      <Line data={chartdata} className='bg-slate-700 h-[300px]'/>
      </div>
      <div >
      <Bar data={bardata} className='h-[300px]'></Bar>
      </div>
      </div>
      <div className='text-white mt-10'><p className='text-red-500 font-bold'> future:</p>{collagedata[index]?.future_details}</div>
      <div className='text-white mt-10'><p className='text-red-500 font-bold'>pro tip:</p>{collagedata[index]?.recommendations}</div>
      <div className='text-white mt-10'><p className='text-red-500 font-bold'>technology_readiness_level:</p>{collagedata[index]?.technology_readiness_level}</div>
     <ul> <div className='text-white mt-10'><p className='text-red-500 font-bold'>applications_current:</p>{collagedata[index]?.applications_current.map((item,index)=>{
        
                 return <li key={index}>{item}</li>
        
      })}</div>
    </ul>

    <ol ><div className='text-white mt-10'><p className='text-red-500 font-bold'>aplication:</p> {collagedata[index]?.applications_future.map((item,index)=>{
      return <li>{item}</li>
    })}</div></ol>

    <ol><div className='text-white mt-10'><p className='text-red-500 font-bold'>benifits:</p>{collagedata[index]?.benefits.map((item,index)=>{
      return <li>{item}</li>
    })}</div></ol>

    <ul><div className='text-white mt-10'><p className='text-red-500 font-bold'>limitations_challenges</p>{collagedata[index]?.limitations_challenges.map((item,index)=>{
      return <li>{item}</li>
    })}</div></ul>

    <ul><div className='text-white mt-10'><p className='text-red-500 font-bold'>key_players</p>{collagedata[index]?.key_players.map((item,index)=>{
      return <li>{item}</li>
    })}</div></ul>

    <div className='text-white mt-10'><p className='text-red-500 font-bold'>patent_status</p>{collagedata[index]?.patent_status}</div>

     <div className="text-white mt-10">
  <p className="text-red-500 font-bold">Market Trends:</p>
  <ul>
    {Object.entries(collagedata[index]?.market_trends || {}).map(([year, trend]) => (
      <li key={year}>
        <span className="font-bold">{year}:</span> {trend}
      </li>
    ))}
  </ul>
</div> 
    
     <ul><div className='text-white mt-10'><p className='text-red-500 font-bold'>policy_regulations</p>{collagedata[index]?.policy_regulations.map((item,index)=>{
      return <li>{item}</li>
    })}</div></ul>

    <ul><div className='text-white mt-10'><p className='text-red-500 font-bold'>sustainability_impact</p>{collagedata[index]?.sustainability_impact.map((item,index)=>{
      return <li>{item}</li>
    })}</div></ul>

    <ul><div className='text-white mt-10'><p className='text-red-500 font-bold'>investment_opportunities</p>{collagedata[index]?.investment_opportunities.map((item,index)=>{
      return <li>{item}</li>
    })}</div></ul> 

    </div>
  );
    


}
export default Info;