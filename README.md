##

This is the code repo for the blog post at [https://codereviewvideos.com/nextjs-14-crud-forms-example/]()

To follow along:

* Clone the repo
* `npm install`
* `npm run dev`

Also in a different terminal, `docker-compose up`.

The post covers how to set up the database. Here is the SQL you will need.

```sql
DROP TABLE IF EXISTS things CASCADE;

CREATE TABLE things
(
    id         SERIAL PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    quantity   INT          NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Have fun!
