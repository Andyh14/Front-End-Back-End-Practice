For this homework I used React for the front end and Nodejs for the back end. I used sqlite3 as the database with the table that has the given data already inside.
I did all the testing and coding in a virtual enviroment. The website should run on http://localhost:3000/ if not your port is busy there change the port manually
in the code. 

To start the server you run "node index.js" and to start the react website you run "npm start"

Add User Button:
    Once the server is up and the website is shown you will see three boxes to write the information of a new student into.
    The name box only accepts TEXT and ID and Points only except INTEGERs. Once you fill out everthing and it is valid, you
    press Add User at the bottom and it will add the user to the table in the database. It will also show the new user added
    at the bottom of the screen

Search Users Button:
    In order to search for a user in the database you must type in a valid unique user ID number. Once you do press "Search
    Users" and if found it will show the user and it's information right below the search users button.

Show Users:
    The show users button shows all the data in the database and for each user in the database will give you three options:
    1.) Update Name
          - Enter a valid name (TEXT) and press Update Name button. The name will be updated in the
          database and on screen right away.
    2.) Update Points
          - Enter valid points (INTEGER) to change to and press Update Points button. The points will be updated in the
          database and on screen right away.
    3.) Delete
          - Pressing the Delete button will delete the user and it's information from the database and in turn will remove
          it from the screen since the show users button after pressed shows the data in the database in real time.

