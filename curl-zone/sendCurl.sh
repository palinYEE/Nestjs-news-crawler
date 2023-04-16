#!/bin/bash

# 인자값으로 받은 http method, url path, json 파일명 변수에 저장
http_method=$1
url_path=$2
json_file=$3

# GET 메소드인 경우에는 json 파일을 전송하지 않도록 분기 처리
if [ $http_method = "GET" ]; then
  curl -X $http_method "localhost:3000/$url_path"
else
  curl -X $http_method "localhost:3000/$url_path" \
    -H "Content-Type: application/json" \
    -d @$json_file
fi