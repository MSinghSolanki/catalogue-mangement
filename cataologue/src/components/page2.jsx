import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
import {Chart} from 'chart.js/auto'

let chart=null;

export const ConfirmationPage = () => {


    const location = useLocation();
    const { name, email } = location.state;
 const[card,setCard] =useState([]);
 const [originalCard, setOriginalCard] = useState([]);
 const [expandedCardId, setExpandedCardId] = useState(null);


 const toggleExpandCard = (id) => {
    if (id === expandedCardId) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(id);
    }
  };

    const generateChartData = (card) => {
        const data = {};
        card.forEach((product) => {
          const category = product.category;
          data[category] = data[category] ? data[category] + 1 : 1;
        });
      
        const labels = Object.keys(data);
        const values = Object.values(data);
      
        return { labels, values };
      };


      useEffect(() => {
        if (card.length > 0) {
          const { labels, values } = generateChartData(card);
    
          if (!chart) {
            // Create new chart if chart is null
            chart = new Chart(document.getElementById('chart'), {
              type: 'pie',
              data: {
                labels: labels,
                datasets: [
                  {
                    data: values,
                    backgroundColor: [
                      '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#2ecc71',
                    ],
                  },
                ],
              },
            });
          } else {
            // Update chart data
            chart.data.labels = labels;
            chart.data.datasets[0].data = values;
            chart.update();
          }
        }
      }, [card]);





 const cardshow=()=>{
    axios.get("https://fakestoreapi.com/products",{}).then((res)=>{
        setCard(res.data)
        setOriginalCard(res.data)
    })
 }

 useEffect(()=>{
    cardshow();
 })


 const filtertype = (event, category) => {
    event.preventDefault();
      setCard(
        originalCard.filter((e) => {
          return e.category === category;
        })
      );
    
  };
  
    return (
       
        <div >
            <div>
            <div className="flex bg-blue-500">
           <p> {name}</p>
      <p className="ml-5">{email}</p>
      </div>
      <div>
        <select onChange={(e) => filtertype(e,e.target.value)}>
          <option value="">---</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">men's clothing</option>
          <option value="women's clothing">women's clothing</option>
        </select>
      </div>

      </div>

          <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
        {card.map((e) => (
          <div key={e.id} className="shadow-lg rounded-3xl overflow-hidden">
            <div className="h-40 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative">
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
      <canvas id="chart"></canvas>
    </div>
   
      
    );
  };
