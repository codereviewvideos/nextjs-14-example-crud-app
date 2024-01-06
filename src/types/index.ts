export type AppConfig = {
  db: {
    connectionString: string;
    poolSize: number;
  };
};

export type Thing = {
  id: number;
  name: string;
  quantity: number;
};
