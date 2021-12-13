import { types } from "../types/types";

export const imagesReducer = (state = {}, action) => {
  switch (action.type) {
    case types.imagesNew:
      return {
        content: [...state.content,action.payload]
      };
    case types.imagesLoad:
      return {
        ...state,
        content: action.payload
      };
    default:
      return state;
  }
};
