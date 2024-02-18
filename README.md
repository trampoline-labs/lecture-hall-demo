# Lecture Hall Reservatin System

Proof of Concept application for a Lecture Hall reservation and management system.

## Features
- Reservation system
- Admin Panel
- User Dashboard
- Authentication and Authorization

## Running Locally

1. Install dependencies:

```sh
npm install
```

2. Run migrations:

```sh
npx prisma migrate dev
```

3. Run seed script:

```sh
# the above command will always run the seed script after
# if it doesn't you can run it manually like so

npx prisma db seed
```

4. Start the development server:

```sh
npm run dev
```

## Test Credentials

### Admin

Email: `admin@test.com`

Password: `admin`

### User

Email: `test@test.com`

Password: `testing`
