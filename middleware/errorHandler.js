const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    const messages = [];
    const errors = Object.values(err.errors);
    for (let i = 0; i < errors.length; i++) {
      messages.push(errors[i].message);
    }

    return res.status(400).json({
      success: false,
      error: "Validation failed",
      messages: messages,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: "Invalid ID format",
    });
  }

  res.status(500).json({
    success: false,
    error: "Something went wrong on the server",
  });
};

module.exports = errorHandler;
