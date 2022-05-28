import {
  LIST_BAD_FAVOURITE,
  LIST_BAD_CHARACTERS,
  ADD_BAD_FAVOURITE,
  REMOVE_FAVOURITE,
  SEARCH_CHARACTER,
} from '../Action/Type';
const initialState = {
  listOfBadCharacters: [],
  listOfBadFavourite: [],
  searchData: [],
};

const BadReducer = (state = initialState, action) => {
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
    case REMOVE_FAVOURITE:
      return {
        ...state,
        listOfBadFavourite: state.listOfBadFavourite.filter(
          item => item != action.body,
        ),
      };
    case SEARCH_CHARACTER:
      return {
        ...state,
        searchData: action.body,
      };

    default:
      return state;
  }
};

export default BadReducer;
