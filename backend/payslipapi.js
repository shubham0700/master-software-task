const userpostdb = require("./schema");

module.exports = {
  createDetails: function(data) {
    return new Promise((res, rej) => {
      userpostdb.create(data, function(err, result) {
        if (err) {
          rej(err);
        } else {
          let result1 = userpostdb.find({});

          res(result1);
        }
      });
    });
  },
  getall: function() {
    return new Promise((res, rej) => {
      userpostdb.find({}, function(err, result) {
        if (err) {
          rej(err);
        } else {
          res(result);
        }
      });
    });
  }
};
