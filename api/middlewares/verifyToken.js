const verifyToken = (req, res, next) => {
  console.log('mpike stin verify');
  const authorisationHeader = req.headers.authorisation;
  if (authorisationHeader) {
    // it is common to send the token as a string with Bearer prepend followed by a space. if that's the case
    // we split the Bearer from the string... e.g. Bearer kljhj23h4khjkjgasl783.sdf23rsdf.23523ts
    // const token = authorisationHeader.split(' ')[1];
    const token = authorisationHeader;
    jwt.verify(token, secret, (err, jwtPayload) => {
      if (err) return res.status(401).json('token is not valid');
      req.jwtPayload = jwtPayload;
      next();
    });
  } else {
    res.status(401).json('you are not authenticated');
  }
};
module.exports.verifyToken = verifyToken;
