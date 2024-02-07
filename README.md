This is a REST based JSON mock server to easily add, update, delete and access data from a JSON file.

The Following are APIs used to access and perform the required operations:
1. Create A Post - http://localhost:8080/posts  - *use POST METHOD using POSTMAN*
   with this enter the required POST Data in the body. this will create a new post and add it to the posts array. 
   for eg: {
               "id":1,
               "title":"Rich Dad Poor Dad"
               "author": "Robert Kiyosaki",
               "views": 100,
               "reviews":31
           }
   This will automatically create an Author with the given name in the Authors Array if it does not exist already in the Array otherwise it will increment the posts by 1.
2. Get All Posts - http://localhost:8080/posts - *use GET METHOD using POSTMAN or Thunder Client*
   This will give you all the existing posts in store.json file
3. Delete A Post of given id - http://localhost:8080/posts/id  - *use DELETE METHOD using POSTMAN*
   this will delete the posts with the given ID from store.json
4. Udpate a Post - http://localhost:8080/posts/id - *use POST METHOD using POSTMAN*
   with the api request, give the data in body that need to updated.
   for eg: {
               "title":"The assignment is Completed",
               "author":"its me",
               "view":60,
               "reviews":34
           }
   NOTE - if the post with the given ID does not exist it will give an error "post not found".
5. Get All the Authors - http://localhost:8080/authors - *use GET METHOD using POSTMAN*
   this will give you all the authors whose posts are saved in the store till now.

=> Steps to setup :
1. Download the files
2. run npm install to install all the dependencies
3. make the API requests
