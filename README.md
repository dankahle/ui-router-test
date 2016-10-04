# ui-router-test



### for normal states followed by an otherwise
#### notable
* when you throw in a resolve, doesn't go to otherwise, just fails to get to that state
* when you event.preventDefault() in a $stateChangeStart handler, it doesn't go to otherwise either, just fails to get to that state