var Categorizer = {
  categorize: function (text) {
    var category = "No category";
    if (text.indexOf("ate") >= 0 || text.indexOf("eat") >= 0) {
      category = "Restaurant";
    } else if (text.indexOf("stay") >= 0) {
      category = "Hotel";
    } else if (text.indexOf("listen") >= 0) {
      category = "Music";
    } else if (text.indexOf("watch") >= 0) {
      category = "Movies";
    }
    return category;
  }
};

module.exports = Categorizer;
