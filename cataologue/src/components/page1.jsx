import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/confirmation", { state: { name, email } });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex">
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      </div>
      <br />
      <button className="bg-yellow-400 rounded-3xl text-white text-xl w-40" type="submit">Register</button>
    </form>
  );
};

