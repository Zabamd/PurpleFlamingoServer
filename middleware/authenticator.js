const authenticator = (req, res, next) => {
  const authKey = req.headers["authToken"];
  if (authKey === process.env.AUTH_TOKEN) {
    next();
  }
  return res
    .status(401)
    .end(
      JSON.stringify({
        status: "UNAUTHORIZED",
        message: "Incorrect authentication key",
      })
    );
};

export default authenticator;
