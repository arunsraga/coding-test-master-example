exports = module.exports = function(app) {
  require('./pets')(app);
  require('./users')(app);
};
