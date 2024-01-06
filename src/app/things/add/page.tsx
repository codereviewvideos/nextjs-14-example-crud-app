import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import addOne from "@/db/things/add-one";
import React from "react";

const addThing = async (formData: FormData) => {
  "use server";

  const thing = await addOne(
    formData.get("name") as string,
    parseInt(formData.get("quantity") as string, 10),
  );
  console.log(`thing`);

  revalidatePath("/things");
  redirect(`/things`);
};

export default function AddThing() {
  return (
    <form action={addThing} className="flex flex-col place-items-baseline">
      <h1 className="text-xl mb-2">Add a New Thing</h1>
      <label>
        Name:
        <input name="name" type="text" required className="border" />
      </label>
      <label>
        Quantity:
        <input
          name="quantity"
          type="number"
          required
          min="0"
          className="border"
        />
      </label>
      <button type="submit">Add thing</button>
    </form>
  );
}
