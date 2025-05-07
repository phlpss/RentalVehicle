#!/bin/bash

# Configuration
CONTAINER_NAME="my_postgres"
POSTGRES_PASSWORD="rental"
POSTGRES_USER="rental"
POSTGRES_DB="rental"
PORT=5433

# Check if container already exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
  echo "Container '$CONTAINER_NAME' already exists. Starting it..."
  docker start $CONTAINER_NAME
else
  echo "Creating and starting new PostgreSQL container..."
  docker run -d \
    --name $CONTAINER_NAME \
    -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD \
    -e POSTGRES_USER=$POSTGRES_USER \
    -e POSTGRES_DB=$POSTGRES_DB \
    -p $PORT:5432 \
    postgres:latest
fi

# Optional: show running container
docker ps -f name=$CONTAINER_NAME
