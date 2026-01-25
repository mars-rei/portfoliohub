


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "portfolioHub";


ALTER SCHEMA "portfolioHub" OWNER TO "postgres";


CREATE SCHEMA IF NOT EXISTS "portfoliohub";


ALTER SCHEMA "portfoliohub" OWNER TO "postgres";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "portfoliohub"."components" (
    "componentid" integer NOT NULL,
    "name" character varying(60) NOT NULL,
    "code" json
);


ALTER TABLE "portfoliohub"."components" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "portfoliohub"."components_componentid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "portfoliohub"."components_componentid_seq" OWNER TO "postgres";


ALTER SEQUENCE "portfoliohub"."components_componentid_seq" OWNED BY "portfoliohub"."components"."componentid";



CREATE TABLE IF NOT EXISTS "portfoliohub"."libraries" (
    "libraryid" integer NOT NULL,
    "name" character varying(60) NOT NULL,
    "industry" character varying(60)
);


ALTER TABLE "portfoliohub"."libraries" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "portfoliohub"."libraries_libraryid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "portfoliohub"."libraries_libraryid_seq" OWNER TO "postgres";


ALTER SEQUENCE "portfoliohub"."libraries_libraryid_seq" OWNED BY "portfoliohub"."libraries"."libraryid";



CREATE TABLE IF NOT EXISTS "portfoliohub"."librarycomponents" (
    "libraryid" integer NOT NULL,
    "componentid" integer NOT NULL
);


ALTER TABLE "portfoliohub"."librarycomponents" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "portfoliohub"."media" (
    "mediaid" integer NOT NULL,
    "userid" integer,
    "filename" character varying(255) NOT NULL,
    "cloudurl" "text" NOT NULL,
    "filetype" character varying(4) NOT NULL,
    "uploadedon" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "caption" character varying(150) NOT NULL
);


ALTER TABLE "portfoliohub"."media" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "portfoliohub"."media_mediaid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "portfoliohub"."media_mediaid_seq" OWNER TO "postgres";


ALTER SEQUENCE "portfoliohub"."media_mediaid_seq" OWNED BY "portfoliohub"."media"."mediaid";



CREATE TABLE IF NOT EXISTS "portfoliohub"."pagecomponents" (
    "pageid" integer NOT NULL,
    "componentid" integer NOT NULL
);


ALTER TABLE "portfoliohub"."pagecomponents" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "portfoliohub"."pages" (
    "pageid" integer NOT NULL,
    "portfolioid" integer,
    "pagename" character varying(60) NOT NULL,
    "code" json
);


ALTER TABLE "portfoliohub"."pages" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "portfoliohub"."pages_pageid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "portfoliohub"."pages_pageid_seq" OWNER TO "postgres";


ALTER SEQUENCE "portfoliohub"."pages_pageid_seq" OWNED BY "portfoliohub"."pages"."pageid";



CREATE TABLE IF NOT EXISTS "portfoliohub"."portfolios" (
    "portfolioid" integer NOT NULL,
    "userid" integer,
    "title" character varying(60) NOT NULL,
    "description" character varying(500) NOT NULL,
    "industry" character varying(60) NOT NULL,
    "createdon" "date" DEFAULT CURRENT_DATE NOT NULL,
    "lastupdatedon" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "publishstatus" boolean DEFAULT false NOT NULL,
    "code" json
);


ALTER TABLE "portfoliohub"."portfolios" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "portfoliohub"."portfolios_portfolioid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "portfoliohub"."portfolios_portfolioid_seq" OWNER TO "postgres";


ALTER SEQUENCE "portfoliohub"."portfolios_portfolioid_seq" OWNED BY "portfoliohub"."portfolios"."portfolioid";



CREATE TABLE IF NOT EXISTS "portfoliohub"."projectmedia" (
    "projectid" integer NOT NULL,
    "mediaid" integer NOT NULL
);


ALTER TABLE "portfoliohub"."projectmedia" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "portfoliohub"."projects" (
    "projectid" integer NOT NULL,
    "userid" integer,
    "title" character varying(60) NOT NULL,
    "description" character varying(500) NOT NULL,
    "startedon" "date" NOT NULL,
    "endedon" "date" NOT NULL,
    "createdon" "date" DEFAULT CURRENT_DATE NOT NULL,
    "lastupdatedon" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "portfoliohub"."projects" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "portfoliohub"."projects_projectid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "portfoliohub"."projects_projectid_seq" OWNER TO "postgres";


ALTER SEQUENCE "portfoliohub"."projects_projectid_seq" OWNED BY "portfoliohub"."projects"."projectid";



CREATE TABLE IF NOT EXISTS "portfoliohub"."users" (
    "userid" integer NOT NULL,
    "email" character varying(255) NOT NULL,
    "password" character varying(255) NOT NULL,
    "createdon" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "portfoliohub"."users" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "portfoliohub"."users_userid_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "portfoliohub"."users_userid_seq" OWNER TO "postgres";


ALTER SEQUENCE "portfoliohub"."users_userid_seq" OWNED BY "portfoliohub"."users"."userid";



ALTER TABLE ONLY "portfoliohub"."components" ALTER COLUMN "componentid" SET DEFAULT "nextval"('"portfoliohub"."components_componentid_seq"'::"regclass");



ALTER TABLE ONLY "portfoliohub"."libraries" ALTER COLUMN "libraryid" SET DEFAULT "nextval"('"portfoliohub"."libraries_libraryid_seq"'::"regclass");



ALTER TABLE ONLY "portfoliohub"."media" ALTER COLUMN "mediaid" SET DEFAULT "nextval"('"portfoliohub"."media_mediaid_seq"'::"regclass");



ALTER TABLE ONLY "portfoliohub"."pages" ALTER COLUMN "pageid" SET DEFAULT "nextval"('"portfoliohub"."pages_pageid_seq"'::"regclass");



ALTER TABLE ONLY "portfoliohub"."portfolios" ALTER COLUMN "portfolioid" SET DEFAULT "nextval"('"portfoliohub"."portfolios_portfolioid_seq"'::"regclass");



ALTER TABLE ONLY "portfoliohub"."projects" ALTER COLUMN "projectid" SET DEFAULT "nextval"('"portfoliohub"."projects_projectid_seq"'::"regclass");



ALTER TABLE ONLY "portfoliohub"."users" ALTER COLUMN "userid" SET DEFAULT "nextval"('"portfoliohub"."users_userid_seq"'::"regclass");



ALTER TABLE ONLY "portfoliohub"."components"
    ADD CONSTRAINT "components_pkey" PRIMARY KEY ("componentid");



ALTER TABLE ONLY "portfoliohub"."libraries"
    ADD CONSTRAINT "libraries_pkey" PRIMARY KEY ("libraryid");



ALTER TABLE ONLY "portfoliohub"."librarycomponents"
    ADD CONSTRAINT "librarycomponents_pkey" PRIMARY KEY ("libraryid", "componentid");



ALTER TABLE ONLY "portfoliohub"."media"
    ADD CONSTRAINT "media_pkey" PRIMARY KEY ("mediaid");



ALTER TABLE ONLY "portfoliohub"."pagecomponents"
    ADD CONSTRAINT "pagecomponents_pkey" PRIMARY KEY ("pageid", "componentid");



ALTER TABLE ONLY "portfoliohub"."pages"
    ADD CONSTRAINT "pages_pkey" PRIMARY KEY ("pageid");



ALTER TABLE ONLY "portfoliohub"."portfolios"
    ADD CONSTRAINT "portfolios_pkey" PRIMARY KEY ("portfolioid");



ALTER TABLE ONLY "portfoliohub"."projectmedia"
    ADD CONSTRAINT "projectmedia_pkey" PRIMARY KEY ("projectid", "mediaid");



ALTER TABLE ONLY "portfoliohub"."projects"
    ADD CONSTRAINT "projects_pkey" PRIMARY KEY ("projectid");



ALTER TABLE ONLY "portfoliohub"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("userid");



ALTER TABLE ONLY "portfoliohub"."librarycomponents"
    ADD CONSTRAINT "librarycomponents_componentid_fkey" FOREIGN KEY ("componentid") REFERENCES "portfoliohub"."components"("componentid");



ALTER TABLE ONLY "portfoliohub"."librarycomponents"
    ADD CONSTRAINT "librarycomponents_libraryid_fkey" FOREIGN KEY ("libraryid") REFERENCES "portfoliohub"."libraries"("libraryid");



ALTER TABLE ONLY "portfoliohub"."media"
    ADD CONSTRAINT "media_userid_fkey" FOREIGN KEY ("userid") REFERENCES "portfoliohub"."users"("userid");



ALTER TABLE ONLY "portfoliohub"."pagecomponents"
    ADD CONSTRAINT "pagecomponents_componentid_fkey" FOREIGN KEY ("componentid") REFERENCES "portfoliohub"."components"("componentid");



ALTER TABLE ONLY "portfoliohub"."pagecomponents"
    ADD CONSTRAINT "pagecomponents_pageid_fkey" FOREIGN KEY ("pageid") REFERENCES "portfoliohub"."pages"("pageid");



ALTER TABLE ONLY "portfoliohub"."pages"
    ADD CONSTRAINT "pages_portfolioid_fkey" FOREIGN KEY ("portfolioid") REFERENCES "portfoliohub"."portfolios"("portfolioid");



ALTER TABLE ONLY "portfoliohub"."portfolios"
    ADD CONSTRAINT "portfolios_userid_fkey" FOREIGN KEY ("userid") REFERENCES "portfoliohub"."users"("userid");



ALTER TABLE ONLY "portfoliohub"."projectmedia"
    ADD CONSTRAINT "projectmedia_mediaid_fkey" FOREIGN KEY ("mediaid") REFERENCES "portfoliohub"."media"("mediaid");



ALTER TABLE ONLY "portfoliohub"."projectmedia"
    ADD CONSTRAINT "projectmedia_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "portfoliohub"."projects"("projectid");



ALTER TABLE ONLY "portfoliohub"."projects"
    ADD CONSTRAINT "projects_userid_fkey" FOREIGN KEY ("userid") REFERENCES "portfoliohub"."users"("userid");





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";














































































































































































ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";


