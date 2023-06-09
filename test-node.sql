PGDMP     4                    {         	   test_node %   12.14 (Ubuntu 12.14-0ubuntu0.20.04.1) %   12.14 (Ubuntu 12.14-0ubuntu0.20.04.1)     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    330948 	   test_node    DATABASE     {   CREATE DATABASE test_node WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';
    DROP DATABASE test_node;
                postgres    false                        3079    330949 	   uuid-ossp 	   EXTENSION     ?   CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
    DROP EXTENSION "uuid-ossp";
                   false            �           0    0    EXTENSION "uuid-ossp"    COMMENT     W   COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';
                        false    2            �            1259    331075    news    TABLE     �  CREATE TABLE public.news (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    author_name character varying(50) NOT NULL,
    "desc" text DEFAULT 'default'::text NOT NULL,
    path character varying(100) DEFAULT 'default'::character varying NOT NULL,
    type_file character varying(100) NOT NULL,
    date_format character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL,
    updated_at timestamp without time zone,
    user_id uuid NOT NULL
);
    DROP TABLE public.news;
       public         heap    postgres    false    2            �            1259    330971    users    TABLE     Q  CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    phone character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    created_at timestamp with time zone DEFAULT clock_timestamp() NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    2            �          0    331075    news 
   TABLE DATA           v   COPY public.news (id, author_name, "desc", path, type_file, date_format, created_at, updated_at, user_id) FROM stdin;
    public          postgres    false    204   x       �          0    330971    users 
   TABLE DATA           Q   COPY public.users (id, username, email, phone, password, created_at) FROM stdin;
    public          postgres    false    203   W       )           2606    331086    news news_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.news DROP CONSTRAINT news_pkey;
       public            postgres    false    204            %           2606    330979    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    203            '           2606    330977    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    203            *           2606    331087    news news_id_fk    FK CONSTRAINT     �   ALTER TABLE ONLY public.news
    ADD CONSTRAINT news_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;
 9   ALTER TABLE ONLY public.news DROP CONSTRAINT news_id_fk;
       public          postgres    false    203    204    2855            �   �   x��ϹN�0������&w������|��=	�'%���$��f��aҔSR�5vP�R!�UY�=����X��l�9������z�[{;f)���QA��;���p�����d*������cb`dq��?�Hq���L�T���ܻ߼�s��*�V(��l��O�G���ؿx^���3~����Z@��8y��.�0�}tn@      �   �   x�e�OO�0��3|
�LKߗ�PN���-c�d/���$��3>��u^���31��1A�@8ƚ4�Z����¡���~��9w�������q�� � X`�Ã�Y��6ݓI�Fϙy��%Q���.ݠU����Ӧ��aD�s��x�H�+u˄�lB�1N��$њ9b ,�]k�k����UVLv����(p�
�uYVbq:�E���Y��y?��v��*�m2E ��{�����>U     