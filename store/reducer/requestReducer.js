export const ADDREQUEST = 'INCREMENT';

//action creator
export const addrequest = (value) => {
  return {
    type: ADDREQUEST,
    payload: value,
  };
};

// state
const initialState = {
  data: {},
};

//reducer
const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDREQUEST:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default requestReducer;
