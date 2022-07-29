const pool = require("../db/db.connect");

module.exports = {
  test: (callBack) => {
    try {
        pool.query(
        "SELECT a.documentId,a.tongId,a.linenumber,b.* FROM	tong AS a INNER JOIN	tong_detail AS b ON a.tongId = b.tongId;",
        [],
        (error, results, fields) => {
          if (error) {
            return callBack(error);
          }
          return callBack(null, results);
        }
      );
    } catch (error) {
      return callBack(error);
    }
  },
};

