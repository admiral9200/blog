# blog
A sample blog application built using Vue.js, MongoDB, Express.js and Node.js.

This project is part of a study project with a purpose to demonstrate the benefits of an automated CI/CD Pipeline. To achieve a well working Pipeline this project features a fully automated Build, Test and Deployment System and a high test coverage.

## Hosted Instances
| Description  | Link  |
| ------------ | ------------ |
| Nightly (Development Branch)  |  https://blog-staging.nailuj.net |
| Main (Master Branch) | https://blog.nailuj.net |

## Running it yourself
### Requirements
- Node.js >12+
- npm

### How to run
Make sure you've set up the .env file before starting off
#### Database
Supply your Database URL in the .env file or your environment variables  
`MONGO_URL="mongodb://root:example@localhost/blog"`  

If you don't have a deployed Database ready you can start one with the included docker-compose file by running  
`docker-compose up -d`
#### Frontend
To build the frontend run: 
```
cd app
npm install
npm run build
```
#### Backend
To run the backend run this in the projects root:
```
npm install
npm run start
```