import {
  LIST_BAD_FAVOURITE,
  LIST_BAD_CHARACTERS,
  ADD_BAD_FAVOURITE,
} from '../Action/Type';
const initialState = {
  listOfBadCharacters: [],
  listOfBadFavourite: [],
};

const BadReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case LIST_BAD_CHARACTERS:
      return {
        ...state,
        listOfBadCharacters: action.body,
      };
    case LIST_BAD_FAVOURITE:
      return {
        ...state,
        listOfBadFavourite: action.body,
      };

    case ADD_BAD_FAVOURITE:
      return {
        ...state,
        listOfBadFavourite: state.listOfBadFavourite.concat(action.body),
      };

    default:
      return state;
  }
};

export default BadReducer;
