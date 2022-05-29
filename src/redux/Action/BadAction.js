import {
  LIST_BAD_CHARACTERS,
  LIST_BAD_FAVOURITE,
  ADD_BAD_FAVOURITE,
  REMOVE_FAVOURITE,
  SEARCH_CHARACTER,
} from './Type';

export const listBadCharacters = body => ({
  type: LIST_BAD_CHARACTERS,
  body,
});

export const listBadFavourite = body => ({
  type: LIST_BAD_FAVOURITE,
  body,
});

export const addBadFavourite = body => ({
  type: ADD_BAD_FAVOURITE,
  body,
});

export const removeFavourite = body => ({
  type: REMOVE_FAVOURITE,
  body,
});

export const searchCharacter = body => ({
  type: SEARCH_CHARACTER,
  body,
});
