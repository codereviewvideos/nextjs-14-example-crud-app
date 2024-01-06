import { Thing } from "@/types";
import getOne from "@/db/things/get-one";
import { redirect } from "next/navigation";
import updateOne from "@/db/things/update-one";
import { revalidatePath } from "next/cache";

type UpdateThingPage = {
  params: { thingId: Thing["id"] };
};

export default async function UpdateThingPage({ params }: UpdateThingPage) {
  const thing = await getOne(params.thingId);

  if (!thing) {
    return redirect("/not-found");
  }

  const updateThing = async (formData: FormData) => {
    "use server";

    await updateOne(
      thing.id,
      formData.get("name") as string,
      parseInt(formData.get("quantity") as string, 10),
    );

    revalidatePath("/things");
    redirect("/things");
  };

  return (
    <div>
      <h1>Update Thing</h1>
      <form action={updateThing}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            defaultValue={thing.name}
            className="border"
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            defaultValue={thing.quantity}
            className="border"
          />
        </label>
        <br />
        <button type="submit">Update Thing</button>
      </form>
    </div>
  );
}
