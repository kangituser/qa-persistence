module.exports = (res, status, message) => {
  return res.status(status).send({ message: message });
}