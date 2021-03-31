import { takeLatest, put, call } from "redux-saga/effects";
import UserActionTypes from "./user.types";
import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
  signUpStart,
} from "./user.actions";
import {
  getSnapshotFromUserAuth,
  signInWithGoogle,
  signInWithEmail,
  isUserAuthenticated,
  signOut,
  signUp,
  signInAfterSignUp,
  onGoogleSignInStart,
  onCheckUserSession,
  onSignOutStart,
  onSignUpStart,
  onSignUpSuccess,
  onEmailSignInStart,
} from "./user.sagas";

describe("on signup start saga", () => {
  it("should trigger on SIGN_UP_START", () => {
    const generator = onSignUpStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_UP_START, signUp)
    );
  });
});

describe("on signup success saga", () => {
  it("should trigger on SIGN_UP_SUCCESS", () => {
    const generator = onSignUpSuccess();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
    );
  });
});

describe("on signout start saga", () => {
  it("should trigger on SIGN_OUT_START", () => {
    const generator = onSignOutStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
    );
  });
});

describe("on check user session saga", () => {
  it("should trigger CHECK_USER_SESSION", () => {
    const generator = onCheckUserSession();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
    );
  });
});

describe("on email sign in start saga", () => {
  it("should trigger EMAIL_SIGN_IN_START", () => {
    const generator = onEmailSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
    );
  });
});

describe("on google sign in start saga", () => {
  it("should trigger GOOGLE_SIGN_IN_START", () => {
    const generator = onGoogleSignInStart();
    expect(generator.next().value).toEqual(
      takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
    );
  });
});

describe("on sign in after sign up saga", () => {
  it("should fire getSnapshotFromUserAuth", () => {
    const mockUser = {};
    const mockAdditionalData = {};
    const mockAction = {
      payload: {
        user: mockUser,
        additionalData: mockAdditionalData,
      },
    };

    const generator = signInAfterSignUp(mockAction);
    expect(generator.next().value).toEqual(
      getSnapshotFromUserAuth(mockUser, mockAdditionalData)
    );
  });
});

describe("on sign up saga", () => {
  const mockEmail = "test@test.com";
  const mockPassword = "test123";
  const mockDisplayName = "test";
  const mockAction = {
    payload: {
      email: mockEmail,
      password: mockPassword,
      displayName: mockDisplayName,
    },
  };

  const generator = signUp(mockAction);

  it("should call auth.createUserWithEmailAndPassword", () => {
    const createUserWithEmailAndPassword = jest.spyOn(
      auth,
      "createUserWithEmailAndPassword"
    );
    generator.next();
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
  });
});

describe("sign out saga", () => {
  const generator = signOut();

  it("should call auth.signOut", () => {
    const expectSignOut = jest.spyOn(auth, "signOut");
    generator.next();
    expect(expectSignOut).toHaveBeenCalled();
  });

  it("should call signOutSuccess", () => {
    expect(generator.next().value).toEqual(put(signOutSuccess()));
  });

  it("should call signOutFailure on error", () => {
    const newGenerator = signOut();
    newGenerator.next();
    expect(newGenerator.throw("error").value).toEqual(
      put(signOutFailure("error"))
    );
  });
});

describe("isUserAuthenticated saga", () => {
  const generator = isUserAuthenticated();

  it("should call getCurrentUser", () => {
    expect(generator.next().value).toEqual(getCurrentUser());
  });

  it("should call getSnapshotFromUserAuth", () => {
    const mockUserAuth = { uid: "123abc" };
    expect(generator.next(mockUserAuth).value).toEqual(
      getSnapshotFromUserAuth(mockUserAuth)
    );
  });

  it("should call signInFailure on error", () => {
    const newGenerator = isUserAuthenticated();
    newGenerator.next();
    expect(newGenerator.throw("error").value).toEqual(
      put(signInFailure("error"))
    );
  });
});

describe("getSnapshotFromUserAuth saga", () => {
  const mockUser = {};
  const mockAdditionalData = {};
  const generator = getSnapshotFromUserAuth(mockUser, mockAdditionalData);

  expect(generator.next().value).toEqual(
    call(createUserProfileDocument, mockUser, mockAdditionalData)
  );
});
