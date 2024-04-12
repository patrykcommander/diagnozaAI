This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
A hobby project based on the Diagnoza-AI application.
The authors' intention was to create a web application for research workers of the Medical University.

This time NextJS was chosen to create the frontend.

## How to launch the application
- run the local postgreSQL and PGadmin docker containers
```bash
docker-compose up
```
- activate the python virtual environemnt like so
```bash
source backend/venv/Scripts/activate
```
- run Backend development server
```bash
python backend/run.py
```
- run Frontend development server
```bash
cd app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
