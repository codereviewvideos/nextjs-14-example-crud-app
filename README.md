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