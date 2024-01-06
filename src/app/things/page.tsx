// src/app/things/page.tsx

import getAll from "@/db/things/get-all";
import React from "react";
import DeleteThing from "@/Components/DeleteThing";
import Link from "next/link";

async function getThings() {
  const things = await getAll();
  return !things ? [] : things;
}

export default async function Things() {
  const things = await getThings();

  return (
    <main className="p-4">
      <h1 className="text-xl mb-2">List of Things</h1>
      {things.length === 0 && <p>There are no things.</p>}
      <ul>
        {things.map((thing) => (
          <li key={thing.id}>
            <Link href={`/things/update/${thing.id}`}>
              {thing.name} - Quantity: {thing.quantity}{" "}
            </Link>
            <DeleteThing thing={thing} />
          </li>
        ))}
      </ul>
    </main>
  );
}
