CREATE TABLE categories (
    id uuid NOT NULL,
    name varchar(255) NOT NULL,
    url varchar(255) NOT NULL,
    deleted_at timestamptz
);

ALTER TABLE categories ADD CONSTRAINT categories_pkey PRIMARY KEY (id);
CREATE UNIQUE INDEX categories_name_index ON categories(name) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX categories_url_index ON categories(url) WHERE deleted_at IS NULL;

CREATE TABLE users (
    id uuid NOT NULL,
    email_address varchar(256),
    password varchar(255),
    first_name varchar(256),
    last_name varchar(256),
	full_name varchar(256),
    role varchar(256),
    address varchar(255),
    city varchar(255),
    telephone varchar(255),
    zipcode numeric(4,0),
    state numeric(2,0),
	provider varchar(255) NOT NULL,
	provider_id varchar(255),
    deleted_at timestamptz
);

ALTER TABLE users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
