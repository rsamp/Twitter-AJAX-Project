function FollowToggle($el){
  this.$el = $el;
  this.userId = $el.data("user-id");
  this.followState = $el.data("initial-follow-state");
  this.render();
  this.$el.on("click", this.handleClick.bind(this));
}

FollowToggle.prototype.render = function () {
  var buttonText = this.followState === "followed" ? "Unfollow" : "Follow";
  var pending = (this.followState === "following"
            || this.followState === "unfollowing") ? true : false;
  this.$el.prop("disabled", pending);
  this.$el.html(buttonText);
};

FollowToggle.prototype.handleClick = function(e) {
  e.preventDefault();
  var method = this.followState === "followed" ? "DELETE" : "POST";
  this.followState = this.followState === "followed" ? "unfollowing" : "following";
  this.render();
  $.ajax({
    url: "/users/" + this.userId + "/follow",
    method: method,
    dataType: "json",
    data: { followee_id: this.userId },
    success: function(){
      this.followState = this.followState === "unfollowing" ? "unfollwed" : "followed";
      this.render();
    }.bind(this)
  });
};

module.exports = FollowToggle;
