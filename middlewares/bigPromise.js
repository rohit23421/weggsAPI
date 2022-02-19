//using promise because it is better than using try-catch or async-await

module.exports = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch(next);
};
