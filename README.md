# ui-router-test



### for normal states followed by an otherwise
#### notable
* when you throw in a resolve, doesn't go to otherwise, just fails to get to that state
* when you event.preventDefault() in a $stateChangeStart handler, it doesn't go to otherwise either, just fails to get to that state
* test/:id will have no empty string id for /test/ url but still run the controller
* going from a child to a parent will not rerun parent's controller
* ****** the issue that killed you: when you event.preventDefault() on otherwise state (state not found), ui-router just starts another otherwise state (what?). The only way around it is to state.go inside that preventDefault handling code, then it shuts up. Hence the init state added, a state to sit in while the initialization promises get resolved.