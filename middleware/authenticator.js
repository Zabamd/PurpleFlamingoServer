const authenticator = (req, res, next) => {
  const authKey = req.headers.authtoken;
  if (authKey === process.env.AUTH_TOKEN) {
    return next();
  }
  res.status(401).end(
    JSON.stringify({
      status: "UNAUTHORIZED",
      message: "Incorrect authentication key",
    })
  );
};
module.exports = authenticator;
