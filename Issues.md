
# GitHub Users API - Challenges

This README documents some of the key challenges encountered while working with the GitHub Users API, along with the solutions that were implemented to address these issues.

## Challenges Faced

### 1. CORS Issues
   - When fetch user information fron the frontend, i was receiving an HTML response instead of JSON. Noticed it was because of CORS-related issues between the frontend (React) and backend (Express).
   
   - I had to change my cors configurations from just using CORS to adding a more descriptive configuaration and setting the methods
     ```javascript
     const corsOptions = {
         origin: ['http://localhost:3000'], 
         methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
         allowedHeaders: ['Content-Type', 'Authorization'],
         credentials: true
     };
     app.use(cors(corsOptions));
     ```


### 2. Deciding Between `fetch` and `axios`
   - I initially used `fetch` for API requests but later noticed that it's adviced to interact with APIs using `axios`, Since i had already configured my credentials within the .env, I has little issue with communicating with the API. `Axios` provided a more consistent structure across getting the users from the database and posting the users data into the database from the API endpoint. Added a few precousions as error handling so as to level down on what might the issue is.


---

Axios and the Sequelize ORM helped alot to ease and simplify the interaction with both the API and the Database, making me see less complications from the backend.
