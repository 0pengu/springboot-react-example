-- liquibase formatted sql

-- changeset 0pengu:1735118161170-1
CREATE TABLE "todo" (
    "id" VARCHAR DEFAULT gen_random_uuid() PRIMARY KEY,
    "description" VARCHAR(255) NOT NULL,
    "completed" BOOLEAN DEFAULT FALSE NOT NULL,
    "created_at" TIMESTAMP WITHOUT TIME ZONE NOT NULL
);