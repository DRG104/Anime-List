# Project Two

========================================================================

This project aims to use the Jikan API, the unofficial mynanimelist API to allow users to search, follow, and create anime lists to keep up with seasonal/favorite shows to watch. It aims to provide users with the ability to search for and easily maintain a list so they can always have something to watch!

========================================================================

## User Story

>As a user I would like to

- On page load
    - View popular anime
    - View popular user lists
    - View my list
    - Drop down Menu
        - Create account
        - Login
        -  Search anime
- View a list of anime upon search
    - Search for anime by genre
    - Possibly sort anime by season/year
- Add to my list what anime
    - I have watched
    - I am currently watching
    - What I plan to watch
    - Customize the name of the anime list (“ex: My top 10 shounens”
- View a synopsis for anime, along with:
    - Art
    - Promo Material
    - Videos
- Possibly add a rating system by users
    - Rates the anime
    - Rates the list by user
- Have different users comment on my list
    - Possibly combine the rating system with the comment system
    - (ex: 2 / 5 stars ‘This anime made me cry, but not in a good way)
- Have the ability to comment on other user’s list
- View other users’ lists
    - Allow users to create tags for their list

## EXTRAS (Future Goals)
- Create a page for the users that shows all of their lists / info
    - Allow for user to customize avatar
    - Allow users’ to follow/subscribe to one another 
- Allow users to create groups with each other
- Anime recommendations based on user list/follows

## My Approach
- Understand the Jikan API and determine which information I can use
    - Build a database using:
        - Tags/genre
        - Title / alt. Title
        - Promotional material / art
        - Synopsis
        - Database ID
        - Studio information / related media
- Create RESTful routes for the user’s list
- Index
    - Displays user’s list
    - displays all anime (beginning with current season, 20-50 anime per pg)
- New 
    - Show form to create a list of anime
- Create 
    - Adds a list to the database (to be viewed by self and other users) then redirect to it
- Show 
    - using database ID to show user list (or another user’s list using ID)
- Edit 
    - Show user a form to edit existing list information (maybe they suddenly dislike a show)
- Update
    - Implement changes made from the edit page
- Destroy
    - Delete a list from a user’s session
- Once all the routes are completed, style the pages (maybe with bootstrap)

## Initial model ideas
- Seed.js will parse through Jikan to create a one time request for all anime
- Anime.js will hold the schema that parses through the database and displays them
- Users.js will simply hold username and password information in it’s own schema
- Comment.js similar to users but will be used for comments to be posted on each anime/list or anime/show


## Initial Ideas / Wireframes:

![wireframe ex1](wireframes/P2wireframe1.jpg)
![wireframe ex2](wireframes/P2wifeframe2.jpg)
![wireframe ex3](wireframes/p2wireframe3.jpg)
![wireframe ex4](wireframes/p2wireframe4.jpg)
![wireframe ex5](wireframes/p2wireframe5.jpg)
![wireframe ex6](wireframes/p2wireframe6.jpg)