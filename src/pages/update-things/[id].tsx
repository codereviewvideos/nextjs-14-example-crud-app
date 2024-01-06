// pages/updateThing.tsx
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const UpdateThingPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Get the thing ID from the query parameters
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    // Fetch the existing thing data when the component mounts
    if (id) {
      fetch(`/api/get-thing?id=${id}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setQuantity(data.quantity.toString());
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

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

    try {
      const parsedQuantity = parseInt(quantity, 10);

      // Update the thing using the API endpoint
      const response = await fetch("/api/update-thing", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          quantity: parsedQuantity,
        }),
      });

      // Handle response if necessary
      if (response.ok) {
        // Redirect back to the things list page or any other page
        await router.push("/things");
      } else {
        // Handle non-successful response (e.g., display an error message)
        console.error(`Failed to update thing. Status: ${response.status}`);
      }
    } catch (error) {
      // Handle fetch errors
      console.error("Error during fetch:", error);
      // Display an error message to the user or handle it in an appropriate way
    }
  };

  return (
    <div>
      <h1>Update Thing</h1>
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
        <button type="submit">Update Thing</button>
      </form>
    </div>
  );
};

export default UpdateThingPage;
