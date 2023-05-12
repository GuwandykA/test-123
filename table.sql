\c postgres;
drop database test_node;

drop role test_node_db_user;
-- SET client_encoding = 'UTF-16';
SET client_encoding TO 'UTF-8';
SHOW client_encoding;

CREATE ROLE test_node_db_user LOGIN SUPERUSER PASSWORD '1234';


CREATE DATABASE test_node;

\c test_node;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";



CREATE TABLE users(
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "username" CHARACTER VARYING(50) NOT NULL,
    "email" CHARACTER VARYING(50) NOT NULL,
    "phone" CHARACTER VARYING(50) NOT NULL,
    "password" CHARACTER VARYING(100) NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT clock_timestamp(),
    UNIQUE("email")
);

CREATE TABLE news(
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "author_name" CHARACTER VARYING(50) NOT NULL,
    "desc" TEXT DEFAULT 'default' NOT NULL,
    "path" CHARACTER VARYING(100) DEFAULT 'default' NOT NULL,
    "type_file" CHARACTER VARYING(100) NOT NULL,
    "date_format" CHARACTER VARYING(100) NOT NULL,
    "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT clock_timestamp(),
    "updated_at" TIMESTAMP,
    "user_id" uuid NOT NULL,
    CONSTRAINT news_id_fk
        FOREIGN KEY ("user_id")
            REFERENCES users("id")
                ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX news_name_idx ON news ("author_name");




