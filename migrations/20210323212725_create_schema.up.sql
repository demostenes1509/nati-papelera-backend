CREATE TABLE categories (
    id uuid NOT NULL,
    name varchar(255) NOT NULL,
    url varchar(255) NOT NULL,
    deleted_at timestamptz
);

ALTER TABLE categories ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX categories_name_index ON categories(name) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX categories_url_index ON categories(url) WHERE deleted_at IS NULL;
