<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

본 프로젝트는 보안 뉴스 크롤링 및 데이터 출력 API 를 지원하는 프로젝트입니다. 해당 프로젝트를 통해서 아래와 같은 기술을 습득할 수 있습니다.

- _nestjs crontab 사용법_
- _JWT 인증 토큰 발급_
- _TypeORM_
- _MySql_

## 프로젝트 실행 방법

- 해당 프로젝트를 실행하기 위해서는 다음과 같은 툴이 설치되어있어야 한다.

  - docker
  - nestjs

- 위와 같은 툴이 설치되어있으면 프로젝트 최상단에 있는 `./start.sh` 을 실행한다.

  - `./start.sh 실행시 화면`

    ```sh
    ➜  Nestjs-news-crawler git:(main) ✗ sudo ./start.sh
    Password:
    +------------------------------------------+
    |        News Crawler v1.0.0 by yjyoon       |
    +------------------------------------------+
    1. setting .env file
    input your mariadb container name: yjyoon # db container name insert
    input your mariadb volumn path: /Users/yjyoon/Desktop/Study/NestJS/Nestjs-news-crawler/data-db # db volumn path
    input your mariadb password: yjyoon # mariadb password
    NAME=yjyoon
    VOLUME_PATH=/Users/yjyoon/Desktop/Study/NestJS/Nestjs-news-crawler/data-db
    PASSWORD=yjyoon
    1. mysql docker install (docker-compose up)
    [+] Running 1/1
    ⠿ Container yjyoon_mysql  Started                                          0.2s
    1. npm i

    up to date, audited 764 packages in 661ms

    120 packages are looking for funding
      run `npm fund` for details

    found 0 vulnerabilities
    4. nestjs start
    ```

위 정보는 최상단에 있는 `.env` 와 맞춰줘야 한다.

```
# DB CONFIGURATION
MARIA_DB_HOST=localhost
MARIA_DB_PORT=3306
MARIA_DB_USER=root
MARIA_DB_PASSWORD=yjyoon <-- DB password
MARIA_DB_DATABASE=news

# JWT Option
JWT_SECRET='yjyoon-jwt' <-- custom 해도 됨

# Pbkdf2 Salt Value
PBKDF2_SALT='yjyoon_salt_value' <-- custom 해도됨

# TOKEN MAX COUNT
TOKEN_MAX_COUNT=10
```

## API

본 프로젝트에서 지원하는 API는 아래와 같습니다.

### `/license` : 계정 및 라이선스 관련 API

- `POST /signUp`
  - 설명: 회원가입을 위한 API
  - request body: `{username: '사용자 아이디', password: '사용자 비밀번호'}`
  - response
    - 성공:
      ```json
      {
        "statusCode": 201,
        "message": "회원가입 성공"
      }
      ```
    - 실패:
      ```json
      {
        "statusCode": 401,
        "message": "회원가입에 실패 (이미 등록되어있는 사용자, 또는 데이터 저장 에러 시에 발생)"
      }
      ```
- `GET getLicense`
  - 설명: 해당 계정에 대해서 라이선스를 발급하는 API. 하나의 계정 당 최대 10개의 라이선스를 발급 할 수 있다.
  - request body: `{username: '사용자 아이디', password: '사용자 비밀번호'}`
  - response
    - 성공
      ```json
      {
        "statusCode": 200,
        "message": "jwt 토큰"
      }ㄴ
      ```
    - 실패
      ```json
      {
        "statusCode": 401,
        "message": "이미 10개의 토큰을 발급했습니다. 기존 토큰을 사용해 주시기 바랍니다."
      }
      ```
- `GET checkLicenseStatus`
  - 설명: 모든 유저에 대한 발급된 라이선스 리스트 확인 API
  - request body: `{token: jwt 토큰}` (보안을 위해 인증 과정 삽입)
  - response
    - 성공
      ```json
      [
        {
          "username": "유저 아이디",
          "license": [
            "발급한 라이선스 리스트"
          ],
          "count": 라이선스 개수
        }
        ...
      ]
      ```
- `GET userLicenseList`
  - 설명: 특정 유저에 대한 발급된 라이선스 리스트 확인 API
  - request body: `{username: '사용자 아이디', password: '사용자 비밀번호'}`
  - response:
    - 성공
      ```json
      {
        "username": "검색한 유저 아이디",
        "count": 라이선스 개수,
        "license": [
          "발급한 라이선스 리스트"
        ]
      }
      ```
    - 실패
      ```json
      {
        "statusCode": 401,
        "message": "입력한 계정은 없는 계정입니다. "
      }
      ```
- `GET jwtTokenCheck/:token`
  - 설명: 입력한 토큰의 정보를 출력하는 API
  - response
    - 성공:
      ```json
      {
        "username": "유저 이름",
        "iat": 토큰 발급 시간
      }
      ```

### `/security` : 크롤링한 보안 뉴스 데이터를 출력하는 API

해당 API를 사용하기 위해서는 라이선스를 먼저 발급해야 한다.

- `GET /`
  - 설명: 모든 보안 뉴스 크롤링 데이터 출력 API
  - request body: `{token: jwt 토큰}` (보안을 위해 인증 과정 삽입)
  - response:
    - 성공
      ```json
      {
        "count": 137, // 검색 데이터 수
        "data": [
          {
            "id": "07071b35-fbeb-4295-b7b2-b203c76e699f", // uuid
            "type": "security", // 뉴스 카테고리. 이는 확장 가능
            "title": " 남양주시, 개인정보보호 및 정보보안 서약 실시 ",
            "url": "http://www.boannews.com/media/view.asp?idx=117122&kind=&sub_kind=",
            "description": " [보안뉴스 박미영 기자] 남양주시는 지난 12일 전 직원이 온라인으로 참여하는 ‘개인정보보호 및 정보보안 서약’을 실시했다.코로나19 이후 디지털 대전환의 시대를 맞이하면서 사회·경제·공공 서비스 등 시민생활 전반에서 비대면 활동이
      보편화되고 디지털 기술은 하루가 다르게 발전하고 있지만, 개인정보 유출·해커에 의한 공공 서비스의 마비 등 사이버 공격에 따른 ",
            "reporter": " [박미영기자 (mypark@boannews.com)] ",
            "date_created": "2023-04-15T07:38:00.000Z"
          },
          ...]
      }
      ```
    - 실패
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```
- `GET /date?start=''&end=''`
  - 설명: 보안 뉴스 크롤링 데이터를 날짜로 검색하는 API
  - request body: `{token: jwt 토큰}` (보안을 위해 인증 과정 삽입)
  - response:
    - 성공
      ```json
      {
        "count": 21,
        "data": [
          {
            "id": "07f18bee-0bcd-4046-9c2c-8dee3665f458",
            "type": "security",
            "title": " 한화호텔앤리조트 개인정보 유출 그 후... “ISMS 인증 추진 등 시스템 전반 보안 강화” ",
            "url": "http://www.boannews.com/media/view.asp?idx=117226&kind=&sub_kind=",
            "description": " 성명, 휴대전화번호, 방문 리조트명, 입실일 등 4개 항목 유출...“피해자 수는 조사 끝나면 밝힐 것”  한화리조트 온라인 포인트 지급 완료...홈페이지 내 ‘개인정보 노출 확인’ 서비스 제공개인정보위 조사 진행중...외부 전문가 통한 정
      보관리 프로세스 개선도 병행 추진[보안뉴스 김영명 기자] 한화호텔앤드리조트(이하 한화리조트)에서 개인정보 유출사고가 발 ",
            "reporter": " [김영명기자 (boan@boannews.com)] ",
            "date_created": "2023-04-19T00:31:00.000Z"
          },
          ...]
      }
      ```
    - 실패
      ```json
      {
        "statusCode": 401,
        "message": "Unauthorized"
      }
      ```
- `GET /:id`
  - 설명: DB uuid 로 선택한 데이터만 출력하는 API
  - request body: `{token: jwt 토큰}` (보안을 위해 인증 과정 삽입)
  - response:
    - 성공
      ```json
      {
        "result": true, // 성공 여부
        "data": {
          "id": "07f18bee-0bcd-4046-9c2c-8dee3665f458",
          "type": "security",
          "title": " 한화호텔앤리조트 개인정보 유출 그 후... “ISMS 인증 추진 등 시스템 전반 보안 강화” ",
          "url": "http://www.boannews.com/media/view.asp?idx=117226&kind=&sub_kind=",
          "description": " 성명, 휴대전화번호, 방문 리조트명, 입실일 등 4개 항목 유출...“피해자 수는 조사 끝나면 밝힐 것”  한화리조트 온라인 포인트 지급 완료...홈페이지 내 ‘개인정보 노출 확인’ 서비스 제공개인정보위 조사 진행중...외부 전문가 통한 정보
        리 프로세스 개선도 병행 추진[보안뉴스 김영명 기자] 한화호텔앤드리조트(이하 한화리조트)에서 개인정보 유출사고가 발 ",
          "reporter": " [김영명기자 (boan@boannews.com)] ",
          "date_created": "2023-04-19T00:31:00.000Z"
        }
      }
      ```
    - 실패
      ```json
      {
        "result": false,
        "data": null
      }
      ```

## Cron

주기적으로 크롤링을 하는 모듈은 `crawler` 입니다. 해당 부분은 다음과 같습니다.

```ts
//* src/crawler/crawler.controller.ts
  //* 보안 뉴스에서 보안 부분 API 호출 스케쥴러.
  @Cron('10 * * * * *') // 10분마다 호출
  async securityCrawler() {
    const target: string = apiList['securityNews']['main']['security'];
    const html = await this.crawlerWeb(target);
    const dataList: Array<SecurityNewsDto> = this.securityHtmlParser(html);

    this.crawlerRepository.inputData(dataList);
  }
```

만약 추가적으로 데이터를 수집하고 싶다면 `crawler` 모듈에 해당 코드를 추가하시면 됩니다.

## DB

사용하고 있는 DB 스키마는 다음과 같습니다.

- database name: news
- tablse;
  - user: 사용자 로그인 정보 저장 테이블 (비밀번호는 pbkdf2-sha256 사용하여 저장)
  ```
  MariaDB [news]> desc user;
  +------------+--------------+------+-----+----------------------+----------------+
  | Field      | Type         | Null | Key | Default              | Extra          |
  +------------+--------------+------+-----+----------------------+----------------+
  | id         | int(11)      | NO   | PRI | NULL                 | auto_increment |
  | username   | varchar(255) | NO   | UNI | NULL                 |                |
  | password   | varchar(255) | NO   |     | NULL                 |                |
  | created_at | timestamp(6) | NO   |     | current_timestamp(6) |                |
  +------------+--------------+------+-----+----------------------+----------------+
  ```
  - license: jwt 토큰 발급 저장 테이블
  ```
  MariaDB [news]> desc license;
  +------------+--------------+------+-----+----------------------+----------------+
  | Field      | Type         | Null | Key | Default              | Extra          |
  +------------+--------------+------+-----+----------------------+----------------+
  | id         | int(11)      | NO   | PRI | NULL                 | auto_increment |
  | license    | varchar(255) | NO   |     | NULL                 |                |
  | created_at | timestamp(6) | NO   |     | current_timestamp(6) |                |
  | userId     | int(11)      | YES  | MUL | NULL                 |                |
  +------------+--------------+------+-----+----------------------+----------------+
  4 rows in set (0.002 sec)
  ```
  - news_data: 크롤링 데이터 저장 테이블
  ```
  MariaDB [news]> desc news_data;
  +--------------+--------------+------+-----+---------+-------+
  | Field        | Type         | Null | Key | Default | Extra |
  +--------------+--------------+------+-----+---------+-------+
  | id           | varchar(36)  | NO   | PRI | NULL    |       |
  | type         | varchar(255) | NO   |     | NULL    |       |
  | title        | varchar(255) | NO   |     | NULL    |       |
  | url          | varchar(255) | NO   |     | NULL    |       |
  | description  | varchar(255) | NO   |     | NULL    |       |
  | reporter     | varchar(255) | NO   |     | NULL    |       |
  | date_created | datetime     | NO   |     | NULL    |       |
  +--------------+--------------+------+-----+---------+-------+
  7 rows in set (0.001 sec)
  ```
