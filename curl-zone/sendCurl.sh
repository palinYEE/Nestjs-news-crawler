#!/bin/bash

# 함수 정의: usage
function usage {
  echo "Usage: $0 [HTTP_METHOD] [URL_PATH] [JSON_FILE]"
  echo "  HTTP_METHOD: HTTP method (GET, POST, PUT, DELETE)"
  echo "  URL_PATH: URL path"
  echo "  JSON_FILE: JSON file name (optional, only needed for POST and PUT)"
}

# 인자값이 없을 경우 usage 함수 실행
if [ $# -eq 0 ]; then
  usage
  exit 1
fi

# 인자값으로 받은 http method, url path, json 파일명 변수에 저장
http_method=$1
url_path=$2
json_file=$3

# json_file 인자 값의 유무에 따라 분기 처리
if [ -z "$json_file" ]; then
  curl -X $http_method "localhost:3000/$url_path" | jq ''
else
  curl -X $http_method "localhost:3000/$url_path" \
    -H "Content-Type: application/json" \
    -d @$json_file | jq ''
fi
