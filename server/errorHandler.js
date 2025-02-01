const errorHandler = {
  UserNotFound: {
    code: 404,
    error: {
      name: "UserNotFound",
      message: "User doesn't exist.",
    },
  },
  UsernameNotProvidedError: {
    code: 400,
    error: {
      name: "UsernameNotProvidedError",
      message: "Username hasn't been provided.",
    },
  },
  PasswordNotProvidedError: {
    code: 400,
    error: {
      name: "PasswordNotProvidedError",
      message: "Password hasn't been provided.",
    },
  },
  EmailNotProvidedError: {
    code: 400,
    error: {
      name: "EmailNotProvidedError",
      message: "Email hasn't been provided.",
    },
  },
  TaskStateNotProvidedError: {
    code: 400,
    error: {
      name: "TaskStateNotProvidedError",
      message: "Task state (finished) hasn't been provided.",
    },
  },
  TaskIdNotProvidedError: {
    code: 400,
    error: {
      name: "TaskIdNotProvidedError",
      message: "Task id (t_id) hasn't been provided.",
    },
  },
  WrongCredentials: {
    code: 400,
    error: {
      name: "WrongCredentials",
      message: "Wrong username or password.",
    },
  },
  UsersFetchingError: {
    code: 500,
    error: {
      name: "UsersFetchingError",
      message: "Failed to fetch users.",
    },
  },
  AccessTokenNotProvided: {
    code: 400,
    error: {
      name: "AccessTokenNotProvided",
      message: "Access token hasn't been provided.",
    },
  },
  AccessTokenNotProvided: {
    code: 400,
    error: {
      name: "AccessTokenNotProvided",
      message: "Access token hasn't been provided.",
    },
  },
  TokenExpiredError: {
    code: 403,
    error: {
      name: "TokenExpiredError",
      message:
        "Access token was expired, tried to generate new one but refresh token hasn't been provided.",
    },
  },
  InvalidToken: {
    code: 403,
    error: {
      name: "InvalidToken",
      message: "Access token is invalid",
    },
  },
  TodoOwnershipError: {
    code: 401,
    error: {
      name: "TodoOwnershipError",
      message: "User isn't an owner of provided todo.",
    },
  },
};

module.exports = errorHandler;
