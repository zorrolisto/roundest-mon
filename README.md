# Roundest Pokemon App

This is a example project with best practices to follow in the next projects

## Stack
- Nextjs v13
- Tailwind/DaisyUI v3
- tRPC
- Prisma

## Getting Started
First, run the development server:
```bash
npm run dev
```

### Line for connect to the database
```bash
pscale connect $databaseName $databaseBranch --port $puertoAConectar
```
#### *Example:*
```bash
pscale connect roundest-mon roundest-mon-dev --port 3310 
```

### Env file example
After install mysql to your machine in the port 3306 and add a database called "roundest-mon" 
```.env
DATABASE_URL=mysql://root@127.0.0.1:3310/roundest-mon
SHADOW_URL=mysql://root:root@localhost:3306/roundest-mon 
```

### This line commit your changes to your dev branch
```bash
npx prisma migrate dev
```

### To see prisma studio run
```bash
npx prisma studio
```

### To send your schema changes to Planet Scale
```bash
npx prisma db push
```