### Test CRM

- Login as teacher
  email : teacher@gmail.com
  pass : Test2025

### API Docs

- API Docs : https://service-be-test-be.vercel.app/api-docs/

### Branch Rule

- feature/{}
- fixing/{}
- hot-fix/{}

ex:

- feature/login
- fixing/login
- hot-fix/typo-in-login

### Template ExpressJS With Typescript and Repository Pattern

#### Tech Stack

- Express
- Prisma ORM
- PostgreSQL

#### Express Configuration

- Environment variable
- Validation Yup
- API Docs (Swagger)
- Logger

### Command

#### NPM

1. Install packages
   `npm install`
2. Run application
   `npm run dev`

#### Prisma Command

1. Migrate
   `npx prisma migrate dev --name init`
2. Migrate in Prod
   `npx prisma migrate deploy`
3. Generate prisma client
   `npx prisma generate`

### Refrerence

- https://www.npmjs.com/package/yup
- https://www.prisma.io/docs/orm/overview/introduction

# Deploy Dockerfile

- using node alpine as build
- using multi stage step to resize image container
- docker build -t service-be .
- docker run -p 8080:8080 service-be

docker run -p 9852:9852 service-be
