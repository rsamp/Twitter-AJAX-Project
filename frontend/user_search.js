var FollowToggle = require("./follow_toggle");
function UserSearch(el){
  this.$el = $(el);
  this.$input = this.$el.find("input");
  this.$ul = this.$el.find("ul");
  this.$input.on("keyup", this.handleInput.bind(this));
}

UserSearch.prototype.handleInput = function (e) {
  var searchText = this.$input.val();
  $.ajax({
    url: "/users/search",
    method: "GET",
    dataType: "json",
    data: { query: searchText },
    success: function(res){
      this.renderResults(res);
    }.bind(this)
  });
};

UserSearch.prototype.renderResults = function (res) {
  console.log(res);
  var ul = this.$ul;
  ul.empty();
  if(res.length !== 0){
    res.forEach(function(user){
      var link = $("<a href='/users/" + user.id + "/' ></a>");
      link.text(user.username);
      ul.append($("<li>").append(link));

      var isFollowed = user.followed ? "followed" : "unfollowed";
      var $button = $('<button>').attr("type", "submit").addClass("follow-toggle");
      $button.attr("data-user-id", user.id).attr("data-initial-follow-state", isFollowed);
      new FollowToggle($button);
      ul.append($button);
    });
  }
};

module.exports = UserSearch;
