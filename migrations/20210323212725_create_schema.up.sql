CREATE TABLE providers (
    id uuid NOT NULL,
    name varchar(255) NOT NULL,
    url varchar(255) NOT NULL,
    percentage numeric(5,2),
    deleted_at timestamptz
);

ALTER TABLE providers ADD CONSTRAINT providers_pkey PRIMARY KEY (id);
ALTER TABLE providers ADD CONSTRAINT percentage_range 
CHECK (
    percentage >= 0
    AND percentage <= 200
);

CREATE UNIQUE INDEX providers_name_index ON providers(name) WHERE deleted_at IS NULL;
CREATE UNIQUE INDEX providers_url_index ON providers(url) WHERE deleted_at IS NULL;

CREATE TABLE categories (
    id uuid NOT NULL,
    name varchar(255) NOT NULL,
    url varchar(255) NOT NULL,
    ml_category_id varchar(255) NULL,
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
	full_name varchar(256) NOT NULL,
    role varchar(256) NOT NULL,
    address varchar(255),
    city varchar(255),
    telephone varchar(255),
    zipcode numeric(4,0),
    state numeric(2,0),
	provider varchar(255) NOT NULL,
    deleted_at timestamptz
);

ALTER TABLE users ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE users ADD CONSTRAINT users_roles_constraint CHECK (role IN ('admin','user'));
CREATE UNIQUE INDEX users_email_index ON users(email_address,provider) WHERE deleted_at IS NULL;

CREATE TABLE products (
    id uuid NOT NULL,
    category_id uuid NOT NULL,
    name varchar(255) NOT NULL,
    description varchar(4096) NOT NULL,
    url varchar(255) NOT NULL,
    show_format boolean DEFAULT false NOT NULL,
    ml_category_id varchar(255) NULL,
    is_visible boolean DEFAULT false NOT NULL,
    is_offer boolean DEFAULT false NOT NULL,
    deleted_at timestamptz
);

ALTER TABLE products ADD CONSTRAINT products_pkey PRIMARY KEY (id);
ALTER TABLE products ADD CONSTRAINT products_name_key UNIQUE (name, category_id);
ALTER TABLE products ADD CONSTRAINT products_url_key UNIQUE (url, category_id);
ALTER TABLE products ADD CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

CREATE TABLE packaging (
    id uuid NOT NULL,
    product_id uuid NOT NULL,
    provider_id uuid NOT NULL,
    provider_product_id varchar(255) NULL,
    name varchar(255) NOT NULL,
    price double precision NOT NULL,
    ml_product_id varchar(255),
    import_order integer,
    deleted_at timestamptz
);

ALTER TABLE packaging ADD CONSTRAINT packaging_pkey PRIMARY KEY (id);
ALTER TABLE packaging ADD CONSTRAINT packaging_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE packaging ADD CONSTRAINT packaging_provider_id_fkey FOREIGN KEY (provider_id) REFERENCES providers(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE packaging ADD CONSTRAINT packaging_name_key UNIQUE (name, product_id, provider_id);
ALTER TABLE packaging ADD CONSTRAINT packaging_provider_key UNIQUE (provider_id, provider_product_id);

CREATE TABLE posters (
    id uuid NOT NULL,
    position integer NOT NULL,
    content_type varchar(255) NOT NULL,
    last_update timestamptz,
    category_id uuid NOT NULL,
    product_id uuid,
    caption varchar(512)
);

ALTER TABLE posters ADD CONSTRAINT posters_pkey PRIMARY KEY (id);
ALTER TABLE posters ADD CONSTRAINT posters_position_key UNIQUE (position);
ALTER TABLE posters ADD CONSTRAINT posters_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE posters ADD CONSTRAINT posters_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id) ON UPDATE RESTRICT ON DELETE RESTRICT;

CREATE TABLE products_pictures (
    id uuid NOT NULL,
    product_id uuid NOT NULL,
    mime_type varchar(255) NOT NULL,
    with_logo boolean NOT NULL,
    deleted_at timestamptz
);

ALTER TABLE products_pictures ADD CONSTRAINT products_pictures_pkey PRIMARY KEY (id);
ALTER TABLE products_pictures ADD CONSTRAINT products_pictures_product_id_fkey FOREIGN KEY (product_id) REFERENCES products(id);

CREATE TABLE mercado_libre_categories (
    id varchar(20) NOT NULL,
    name varchar(255) NOT NULL,
    parent_id varchar(20) NULL,
    childs integer DEFAULT 0 NOT NULL,
    deleted_at timestamptz
);

ALTER TABLE mercado_libre_categories ADD CONSTRAINT mercado_libre_categories_pkey PRIMARY KEY (id);
CREATE INDEX mercado_libre_categories_name_index ON mercado_libre_categories(name) WHERE deleted_at IS NULL;
ALTER TABLE mercado_libre_categories ADD CONSTRAINT mercado_libre_parent_categories_id FOREIGN KEY (parent_id) REFERENCES mercado_libre_categories(id) ;

CREATE TABLE configuration (
    id uuid NOT NULL,
    ml_commission_percentage numeric(5,2),
    ml_gain_percentage numeric(5,2),
    deleted_at timestamptz
);

ALTER TABLE configuration ADD CONSTRAINT configuration_pkey PRIMARY KEY (id);
ALTER TABLE configuration ADD CONSTRAINT ml_commission_percentage 
CHECK (
    ml_commission_percentage >= 0
    AND ml_commission_percentage <= 200
);
ALTER TABLE configuration ADD CONSTRAINT ml_gain_percentage 
CHECK (
    ml_gain_percentage >= 0
    AND ml_gain_percentage <= 200
);
