// src/pages/things.tsx

import React from "react";
import { GetServerSideProps } from "next";
import getAll from "@/db/things/get-all";
import { Thing } from "@/types";

interface ThingsPageProps {
  things: Thing[];
}

export const getServerSideProps: GetServerSideProps<
  ThingsPageProps
> = async () => {
  const things = await getAll();

  return {
    props: {
      things: !things ? [] : things,
    },
  };
};

const ThingsPage: React.FC<ThingsPageProps> = ({ things }) => {
  return (
    <main className="p-4">
      <h1 className="text-xl mb-2">List of Things</h1>
      {things.length === 0 && <p>There are no things.</p>}
      <ul>
        {things.map((thing) => (
          <li key={thing.id}>
            {thing.name} - Quantity: {thing.quantity}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default ThingsPage;
