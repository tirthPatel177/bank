# bank

1. bank-frontend Contains the frontend react application

Add ".env" in frontend with content pasted below
```
REACT_APP_API_URL="http://localhost:8080"
```

2. bank-backend containes the node/express application

add "config.env" in the backend folder before with the below content
As Database isn't hosted you will have to add your local database username and password
```
NODE_ENV=development
PORT=8080
USERNAME= 
DATABASE=mongodb://localhost:27017/bank
DATABASE_PASSWORD=
```
