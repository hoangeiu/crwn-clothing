import React from "react";
import { shallow } from "enzyme";

import { Header } from "./header.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const findTestByAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

describe("Header component", () => {
  let wrapper;
  let mockSignOutStart;
  beforeEach(() => {
    mockSignOutStart = jest.fn();

    const mockProps = {
      currentUser: {
        uid: "123",
      },
      hidden: true,
      signOutStart: mockSignOutStart,
    };

    wrapper = shallow(<Header {...mockProps} />);
  });

  describe("Header component", () => {
    it("should Header component render without error", () => {
      expect(wrapper).toMatchSnapshot();
    });

    describe("check currentUser prop", () => {
      it("render SIGNOUT text if currentUser exist", () => {
        const signOutHeader = findTestByAttr(wrapper, "signOut");

        expect(signOutHeader.text()).toBe("SIGN OUT");
        // expect(wrapper.find("OptionLink").at(2).text()).toBe("SIGN OUT");
      });

      it("should call signOutStart if button SIGN OUT is clicked", () => {
        const signOutHeader = findTestByAttr(wrapper, "signOut");
        signOutHeader.simulate("click");

        expect(mockSignOutStart).toHaveBeenCalled();
      });

      it("render SIGNIN text if currentUser not exist", () => {
        const mockProps = {
          currentUser: null,
          hidden: true,
          signOutStart: mockSignOutStart,
        };

        wrapper = shallow(<Header {...mockProps} />);

        const signInHeader = findTestByAttr(wrapper, "signIn");

        expect(signInHeader.text()).toBe("SIGN IN");
      });
    });

    describe("check hidden prop", () => {
      it("should not render CartDropdown if hidden is true", () => {
        expect(wrapper.exists(CartDropdown)).toBeFalsy();
      });

      it("should render CartDropdown if hidden prop is false ", () => {
        const mockProps = {
          currentUser: {
            uid: "123",
          },
          hidden: false,
          signOutStart: mockSignOutStart,
        };

        wrapper = shallow(<Header {...mockProps} />);

        expect(wrapper.find(CartDropdown).length).toBe(1);
      });
    });
  });
});
