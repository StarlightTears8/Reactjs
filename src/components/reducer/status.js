var initialState = {
    status:'abc',
  }
  var myReducer  = (state = initialState,action) => {
    // if (action.type === 'TOGGLE_STATUS'){
    //   state.status = !state.status;
    // }
    return state;
  }

  export  default  myReducer;