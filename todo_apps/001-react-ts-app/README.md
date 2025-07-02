# React TypeScript Todo App
This application allows you to manage a list of tasks stored in browser local storage. For each task, you can specify a name and an urgency level between 1 and 10. These tasks will be ordered from highest urgency (top) to lowest urgency (bottom).

## Tech Stack
- TypeScript
- React
- Vite
- Docker

## Usage
### Running the app in dev mode
1. Download this folder
2. Run `npm install`
3. Run `npm run dev`

### Running the app in Docker
1. Run `npm run build`
2. Run `docker build --tag todo-app .`
3. Run `docker run --detach -p80:80 todo-app`

### Online Access
This app has been manually deployed to Netlify and can be accessed through this link: https://niels-todo-app.netlify.app/
