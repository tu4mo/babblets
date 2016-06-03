$(function() {
  $('body').on('keyup', 'input[name="email[]"]', function() {
    validateEmails();
  });

  $('#add').click(function() {
    var element = $('.friends-email').last();
    var clone = element.clone().addClass('friends-email-animate');
    clone.find('input').val('');
    $(element).after(clone);
    clone.find('input').focus();
    validateEmails();
  });

  $('#create').click(function(event) {
    var emails = [];

    $('#error').hide();

    $('input[name="email[]"]').each(function(index, element) {
      emails.push(element.value);
    });

    $.ajax({
      type: 'POST',
      url: '/api/chat',
      data: {
        emails: emails
      }
    }).done(function(data) {
      $('#form').hide();
      $('#success').show();
    }).fail(function() {
      $('#error').show();
    });
  });
});

function validateEmails() {
  var error = false;
  var filledFields = 0;

  $('input[name="email[]"]').each(function() {
    if ($(this).val() == '') {
      error = true;
    }
  });

  if (error) {
    $('#create').prop('disabled', true);
  } else {
    $('#create').prop('disabled', false);
  }
}
