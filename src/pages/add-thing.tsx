// pages/add-thing.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";

const AddThingPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form inputs
    if (!name || !quantity) {
      alert("Please fill in all fields");
      return;
    }

    // Convert quantity to a number
    const parsedQuantity = parseInt(quantity, 10);

    const response = await fetch("/api/add-thing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        quantity: parsedQuantity,
      }),
    });

    // Handle response if necessary
    const data = await response.json();
    console.log(`data`, data);

    // Redirect back to the things list page
    await router.push("/things");
  };

  return (
    <main className="p-4">
      <h1 className="text-xl mb-2">Add a New Thing</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </label>
        <br />
        <button type="submit">Add Thing</button>
      </form>
    </main>
  );
};

export default AddThingPage;
