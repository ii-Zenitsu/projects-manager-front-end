
const initialState = {
  personnes: [],
  projets: [],
};


const storeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_PERSONNES":
      return { ...state, personnes: action.payload };
    case "UPDATE_PROJETS":
      return { ...state, projets: action.payload };
    default:
      return state;
  }
};

export default storeReducer;
