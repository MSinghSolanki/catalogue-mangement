import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios"
export const ConfirmationPage = () => {
    const location = useLocation();
    const { name, email } = location.state;
 const[card,setCard] =useState([]);
 const [originalCard, setOriginalCard] = useState([]);
 

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
    if (category === "all") {
      setCard(originalCard);
    } else {
      setCard(
        originalCard.filter((e) => {
          return e.category === category;
        })
      );
    }
    return false;
  };
  useEffect(() => {
    setCard(originalCard);
  }, [originalCard]);

    return (
       
        <div >
            <div>
            <div className="flex bg-blue-500">
           <p> {name}</p>
      <p className="ml-5">{email}</p>
      </div>
      <div>
        <select onChange={(e) => filtertype(e,e.target.value)}>
          <option value="">Select a category</option>
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
            </div>

            <div className="px-4 py-2 sm:p-4">
              <div className="font-bold text-xl mb-4 mt-9">{e.title}</div>
              <p className="truncate">{e.description.substring(0, 100)}</p>
          {e.description.length > 100 && (
            <button
              className="text-blue-500 hover:text-blue-700 font-bold"
              onClick={() => alert(e.description)}
            >
              Read more
            </button>
          )}
          </div>

           
          </div>
        ))}
      </div>
    </div>
    
      
    );
  };
