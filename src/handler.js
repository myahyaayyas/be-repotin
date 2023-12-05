const { nanoid } = require("nanoid");

const users = [];

const signUpHandler = (request, h) => {
  const { username, password } = request.payload;

  if (!username || !password) {
    const response = h.response({
      status: "fail",
      message: "Username and password are required for sign-up.",
    });
    response.code(400);
    return response;
  }

  if (users.find((user) => user.username === username)) {
    const response = h.response({
      status: "fail",
      message: "Username is already taken.",
    });
    response.code(400);
    return response;
  }

  const userId = nanoid(16);
  const newUser = {
    id: userId,
    username,
    password, 
  };
  users.push(newUser);

  const response = h.response({
    status: "success",
    message: "User registration successful.",
    data: {
      userId,
    },
  });
  response.code(201);
  return response;
};

const signInHandler = (request, h) => {
  const { username, password } = request.payload;

  if (!username || !password) {
    const response = h.response({
      status: "fail",
      message: "Username and password are required for sign-in.",
    });
    response.code(400);
    return response;
  }

  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const response = h.response({
      status: "success",
      message: "Sign-in successful.",
      data: {
        userId: user.id,
      },
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Invalid username or password.",
    });
    response.code(401);
    return response;
  }
};

module.exports = {
  signUpHandler,
  signInHandler,
};
