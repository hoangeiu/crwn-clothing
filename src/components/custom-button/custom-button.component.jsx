import React from "react";

import { CustomButtonContainer } from "./custom-button.styles";

const CustomeButton = ({ children, ...props }) => (
  <CustomButtonContainer {...props}>{children}</CustomButtonContainer>
);

export default CustomeButton;
