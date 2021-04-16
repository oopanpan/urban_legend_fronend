//! LET'S THINK ABOUT THIS

//* first verify if the user in place already liked the entry

//* conditionally render the button to like or dislike

//? ROUTE 1 - USER HASN'T LIKE THE POST
//* send a post request to the backend,
//* put the instance of the like object in the instance and put that in the like array of the post
//* make sure to listen to the global state with connect
//* should be done

//? ROUTE 2 - USER ALREADY LIKED THE POST
//* send a delete request to the backend
//* do a .filter on that likes array from the post and do a post state update
//* if things link up properly, it should be done

//* search the
