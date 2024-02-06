=> Project Decription :
1. Here in this project, I have implemented Jira card CRUD functionality, allowing users to add, edit, retrieve, and delete titles, descriptions, priorities, and status IDs.
2. Additionally, there is functionality to move cards from one status to another. For instance, if a card is initially created in the "To-Do" status and needs to be moved to "In Progress,"
   users can simply drag and drop the card. In the backend, only an update to the card's status is required.
3. For the status ID:
   Suppose we have a model named "Status." In the "Status" model, we can store all statuses such as "todo," "inProgress," "pending," "complete," and "done." If we have to add a card,
   then we can pass a reference of the "Status" model. This is because if we directly set the status, it will occupy memory for a string. In our case, this will only occupy memory for the reference ID.
4. In app.js file, It is responsible for application's startup, routing, and other functions.
5. In controller folder, there is a JavaScript file that contains the code for handling incoming requests and returning responses to the client. It is responsible for processing the request, interacting with the database, and generating the response.
6. In routes folder,routes are defined using the Express router object, which is a function that takes a path and a callback function as arguments. The callback function is called when a request is made to the specified path.
7. In model folder, there is typically used to define the data model for an application. This includes defining the different types of data that the application will store, as well as the relationships between those data types.


Code Setup : Copy the repo url and clone repo in your local system and run "npm install" to install all dependency, after that run "node app.js" or "nodemon" your    
             server will start.(need to mention port as .env file is not in here)
Postman Collection Setup : copy URL and import it into your postman and hit on local server.

NOTE : Here we use mongodb so need to pass URL of your mongo
