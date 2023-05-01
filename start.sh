#!/bin/bash

echo "+------------------------------------------+"
echo "|        News Crawler v1.0.0 by yjyoon       |"
echo "+------------------------------------------+"

cd docker/
echo "1. setting .env file"
read -p "input your mariadb container name: " container_name
read -p "input your mariadb volumn path: " volume_path
read -p "input your mariadb password: " password

touch .env
echo "NAME=$container_name" > .env
echo "VOLUME_PATH=$volume_path" >> .env
echo "PASSWORD=$password" >> .env
cat .env


echo "2. mysql docker install (docker-compose up)"
docker-compose up -d

echo "3. npm i"
cd ../
npm i

echo "4. nestjs start"
npm run start:dev

