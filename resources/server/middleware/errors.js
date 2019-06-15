const error_not_found = (req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
};

const error_not_caught = (error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
};

module.exports = {
  error_not_found,
  error_not_caught
};
