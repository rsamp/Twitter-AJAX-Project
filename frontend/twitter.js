var FollowToggle = require("./follow_toggle");
var UserSearch = require("./user_search");

$(function(){
  $(".follow-toggle").each(function(_i, followBtn) {
    new FollowToggle(followBtn);
  });
  $("nav.users-search").each(function(_i, userSearch){
    new UserSearch(userSearch);
  });
});
