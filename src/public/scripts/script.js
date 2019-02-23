function acceptBuddy(buddyId) {
  $.ajax({
    url: '/buddies',
    type: 'PUT',
    data: `id=${buddyId}`,
    success: function(result) {
        location.reload(true);
    }
  });
}
