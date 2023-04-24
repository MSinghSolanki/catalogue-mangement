import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
import {Chart} from 'chart.js/auto'
import {BsSearch} from 'react-icons/bs'
let chart=null;

export const ConfirmationPage = () => {


    const location = useLocation();
    const { name, email } = location.state;

 const[card,setCard] =useState([]);
 const [originalCard, setOriginalCard] = useState([]);
 const [expandedCardId, setExpandedCardId] = useState(null);
 const [showChart, setShowChart] = useState(false);


 const toggleExpandCard = (id) => {
    if (id === expandedCardId) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(id);
    }
  };

    const generateChartData = (card) => {
        const data = {};
        card.map((product) => {
          const category = product.category;
          data[category] = data[category] ? data[category] + 1 : 1;
        });
      
        const labels = Object.keys(data);
        const values = Object.values(data);
      
        return { labels, values };
      };


      function handleAnalyse() {
        const { labels, values } = generateChartData(card);
        const chartElement = document.getElementById('chart');
    
        if (!chart) {
          chart = new Chart(chartElement, {
            type: 'pie',
            data: {
              labels: labels,
              datasets: [{
                data: values,
                backgroundColor: [
                  '#FF6384',
                  '#36A2EB',
                  '#FFCE56',
                  '#2ecc71',
                ],
              }],
            },
            options: {
              responsive: true
            }
          });
        } else {
          chart.data.labels = labels;
          chart.data.datasets[0].data = values;
          chart.update();
        }
    
        setShowChart(true);
      }
    
      useEffect(() => {
        if (showChart) {
          handleAnalyse();
        }
      }, [showChart]);





 const cardshow=()=>{
    axios.get("https://fakestoreapi.com/products",{}).then((res)=>{
        setCard(res.data)
        setOriginalCard(res.data)
    })
 }

 useEffect(()=>{
    cardshow();
 },[])


 const filtertype = (event, category) => {
    event.preventDefault();
    if(category==="all"){
      setCard(originalCard)
    }
    else{
    setCard(originalCard.filter((e) => e.category === category));
    }
  };
  

  return (
       
        <div >
            <div>
             <div className="bg-blue-600 py-3">
  <div className="container flex justify-between items-center mx-auto">
    <h1 className="text-white text-xl font-bold">Catalog Management</h1>
    <div className="flex items-center">
      <p className="text-white mr-4">Name - {name}</p>
      <p className="text-white">Email - {email}</p>
    </div>
  </div>

      <div className="lg:pl-96 sm:pl-64 xl:pl-96">
        <select onChange={(e) => filtertype(e,e.target.value)}>
          <option value="">Select</option>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
        </select>
        </div>
      </div>
<div className="max-w-sm px-4">
  <div className="relative">
    <BsSearch className="hover:scale-105 duration-300 absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"/>

    <input
  type="text"
  placeholder="Search"
 className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
 />
 </div>
</div>
      </div>

          <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        {card.map((e) => (
          <div key={e.id} className="shadow-lg rounded-3xl overflow-hidden hover:scale-105 duration-300">
            <div className="h-40 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative ">
              <img
                className="w-full h-full object-cover"
                src={e.image}
                alt={e.title}
              />
               <div className="px-4 py-2 sm:p-4 bg-blue-600 text-white">
              <div className="text-sm uppercase font-bold">{e.category}</div>
            </div>
           

            {expandedCardId === e.id ? (
        <div className="absolute inset-0 bg-white bg-opacity-90 z-10 flex flex-col justify-center items-center">
          <p>{e.description}</p>
          <button className="mt-4 text-blue-500 hover:text-blue-700 font-bold" onClick={() => toggleExpandCard(e.id)}>
            Show less
          </button>
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black to-transparent">
          <button className="text-white font-bold" onClick={() => toggleExpandCard(e.id)}>
            Read more
          </button>
        </div>
      )}
    </div>

    <div className="px-4 py-2 sm:p-4">
      <div className="font-bold text-xl mb-4 mt-9">{e.title}</div>
      <p className="truncate">{e.description.substring(0, 100)}</p>
    </div>
  </div>
        ))}
      </div>
      <button className="bg-yellow-400 text-white rounded-3xl w-44" onClick={handleAnalyse}> Analyse </button>
      <canvas id="chart"></canvas>
    </div>
   
      
    );
  };
