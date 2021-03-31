import UserActionTypes from "./user.types";
import userReducer from "./user.reducer";

const initialState = {
  currentUser: null,
  error: null,
};

describe("userReducer", () => {
  it("should return initial state", () => {
    expect(userReducer(undefined, {})).toEqual(initialState);
  });

  it("should set currentUser to payload on SIGN_IN_SUCCESS", () => {
    const mockUser = { id: 1, displayName: "hoang" };

    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGN_IN_SUCCESS,
        payload: mockUser,
      }).currentUser
    ).toEqual(mockUser);
  });

  it("should set currentUser to null on SIGN_OUT_SUCCESS", () => {
    expect(
      userReducer(initialState, { type: UserActionTypes.SIGN_OUT_SUCCESS })
        .currentUser
    ).toBe(null);
  });

  it("should set errorMessage to payload on SIGN_IN_FAILURE, SIGN_OUT_FAILURE, SIGN_UP_FAILURE", () => {
    const mockError = {
      message: "errorMessage",
      code: 404,
    };

    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGN_IN_FAILURE,
        payload: mockError,
      }).error
    ).toEqual(mockError);

    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGN_OUT_FAILURE,
        payload: mockError,
      }).error
    ).toEqual(mockError);

    expect(
      userReducer(initialState, {
        type: UserActionTypes.SIGN_UP_FAILURE,
        payload: mockError,
      }).error
    ).toEqual(mockError);
  });
});
