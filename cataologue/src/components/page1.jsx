import React from "react";
import axios from "axios";
import { useState } from "react";
import {
    Card,
    Input,
    Button,

  } from "@material-tailwind/react";
   
  export const Forms = ()=>{


const [register,setRegister] =useState({
  email:"",
    name:"",
})
const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({
      ...register,
      [name]: value,
    })
  }

    return (
        <div className="flex justify-center ">
      <Card color="transparent" shadow={false}>
        <h1 color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </h1>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input onChange={handleChange} name="name" size="md" label="Name" />
            <Input onChange={handleChange} name="email" size="md" label="Email" />
          </div>
         
          <Button className="mt-6 bg-yellow-300 text-white rounded-3xl w-96" 
          onClick={()=>{
            axios.post("http://localhost:8080/data",register).then(()=>{
              setRegister({
                email:"",
                name:"",
              }
              )
            })
          }}>
            Register
          </Button>
        </form>
      </Card>
      </div>
    );
  }