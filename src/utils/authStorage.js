export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem("users")) || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const saveUser = (newUser) => {
  try {
    const users = getUsers();
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
  } catch (error) { }
};

export const saveCurrentUser = (user) => {
  localStorage.setItem("currentUser", JSON.stringify(user));
};

export const removeCurrentUser = () => {
  localStorage.removeItem("currentUser");
};
