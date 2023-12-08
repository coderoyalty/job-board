import React from "react";

const UserRegistrationContext = React.createContext({
  isSecondStep: 0,
  /**
   *
   * @param {React.SetStateAction<number>} value
   */
  setRegistrationStep: (value) => {},
});

export default UserRegistrationContext;
