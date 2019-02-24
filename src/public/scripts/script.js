$("#login").submit(login);
$("#register").submit(register);
$("#buddies").submit(createBuddy);

function login(event) {
  event.preventDefault();
  var loginRequest = {
    'email': $('input[name=email]').val(),
    'password': $('input[name=password]').val()
  };

  $.ajax({
    url: '/login',
    type: 'POST',
    data: loginRequest,
    dataType:'application/json',
    success: function(data) {
      if(data.redirect) {
        location.replace(data.redirect);
      } else {
        location.replace('/');
      }
    },
    error: function(error) {
      // TODO: investigate strange bug
      if(error.status === 200) {
        location.replace('/');
      } else{
        var message = JSON.parse(error.responseText).error;
        $('#error').html(message);
        $('.toast').toast('show');
      }
   }
  });
}

function register(event) {
  event.preventDefault();
  var registerRequest = {
    'name': $('input[name=name]').val(),
    'email': $('input[name=email]').val(),
    'password': $('input[name=password]').val(),
    'confirmPassword': $('input[name=confirmPassword]').val()
  };

  $.ajax({
    url: '/register',
    type: 'POST',
    data: registerRequest,
    success: function(data) {
      if(data.redirect) {
        location.replace(data.redirect);
      } else {
        location.replace('/');
      }
    },
    error: function(error) {
      // TODO: investigate strange bug
      if(error.status === 200) {
        location.replace('/');
      } else{
        var message = JSON.parse(error.responseText).error;
        $('#error').html(message);
        $('.toast').toast('show');
      }
   }
  });
}

function createBuddy(event) {
  event.preventDefault();
  var createBuddyRequest = {
    'email': $('input[name=email]').val(),
    'message': $('input[name=message]').val()
  };

  $.ajax({
    url: '/buddies',
    type: 'POST',
    data: createBuddyRequest,
    success: function(data) {
      if(data.redirect) {
        location.replace(data.redirect);
      } else {
        location.replace('/');
      }
    },
    error: function(error) {
      // TODO: investigate strange bug
      if(error.status === 200) {
        location.replace('/');
      } else{
        var message = JSON.parse(error.responseText).error;
        $('#error').html(message);
        $('.toast').toast('show');
      }
   }
  });


}

function acceptBuddy(buddyId) {
  $.ajax({
    url: '/buddies',
    type: 'PUT',
    data: `id=${buddyId}`,
    success: function(data) {
      if(data.redirect) {
        location.replace(data.redirect);
      } else {
        location.replace('/');
      }
    },
    error: function(error) {
      // TODO: investigate strange bug
      if(error.status === 200) {
        location.replace('/');
      } else{
        var message = JSON.parse(error.responseText).error;
        $('#error').html(message);
        $('.toast').toast('show');
      }
   }
  });
}

