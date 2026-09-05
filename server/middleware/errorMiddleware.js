const errorMiddleware = (error, req, res, next) => {
  console.error(error);

  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "SKU already exists"
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error"
  });
};

export default errorMiddleware;