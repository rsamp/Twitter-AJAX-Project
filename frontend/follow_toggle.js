function FollowToggle($el){
  this.$el = $el;
  this.userId = $el.data("user-id");
  this.followState = $el.data("initial-follow-state");
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
}

FollowToggle.prototype.render = function () {
  var buttonText;
  if (this.followState === "followed") {
    buttonText = "Unfollow";
  }else{
    buttonText = "Follow";
  }
  this.$el.html(buttonText);
};

FollowToggle.prototype.handleClick = function(e) {
  e.preventDefault();
  var method = this.followState === "followed" ? "DELETE" : "POST";
  $.ajax({
    url: "/users/" + this.userId + "/follow",
    method: method,
    dataType: "json",
    data: {},
    success: function(){
      this.followState = this.followState === "followed" ? "unfollwed" : "followed";
      this.render();
    }.bind(this)
  });
};

module.exports = FollowToggle;
