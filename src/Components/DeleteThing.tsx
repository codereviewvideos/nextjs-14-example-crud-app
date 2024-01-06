// src/Components/DeleteThing.tsx

import { Thing } from "@/types";
import deleteOne from "@/db/things/delete-one";
import { revalidatePath } from "next/cache";

type DeleteThing = {
  thing: Thing;
};

export default function DeleteThing({ thing }: DeleteThing) {
  const deleteThing = async () => {
    "use server";
    await deleteOne(thing.id);
    revalidatePath("/things");
  };

  return (
    <form>
      <button formAction={deleteThing} className="m-8">
        Delete me
      </button>
    </form>
  );
}
