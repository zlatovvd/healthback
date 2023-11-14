const errorMessageList = {
  400: "Bad request",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not found",
  409: "Email is in use",
};

const HttpError = (status, message = errorMessageList[status]) => {

    const error = new Error(message);

    error.status = status;
    return error;
}

module.exports = HttpError;