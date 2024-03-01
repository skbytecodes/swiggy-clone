export const showLoginForm = () => {
  return {
    type: "LOGIN",
  };
};

export const showSignupForm = () => {
  return {
    type: "SIGNUP",
  };
};

export const showAuthPage = () => {
  return {
    type: "SHOW",
  };
};
export const hideAuthPage = () => {
  return {
    type: "HIDE",
  };
};

export const login = () => {
  return {
    type: "login",
  };
};

export const logout = () => {
  return {
    type: "logout",
  };
};

export const selectedItem = (payload) => {
  return {
    type : "SELECTED_ITEM",
    payload
  }
}

export const addItem = (payload) => {
  return {
    type : "ADD_TO_CART",
    payload
  }
}


export const removeItem = (payload) => {
  return {
    type : "REMOVE_ITEM_FROM_CART",
    payload
  }
}


export const cartTotalValue = (payload) => {
  return {
    type : "CART_TOTAL_VALUE",
    payload
  }
}


export const showDeliveryAddress = () => {
  return {
    type: "SHOW_ADDRESS_FORM",
  };
};

export const hideDeliveryAddress = () => {
  return {
    type: "HIDE_ADDRESS_FORM",
  };
};