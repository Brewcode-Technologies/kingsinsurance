
(function($) {
    'use strict';
    var form = $('#contact-form');

    var formMessages = $('#form-messages');

    $(form).submit(function(e) {
        e.preventDefault();

        var formData = $(form).serialize();

        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: formData
        })
        .done(function(response) {
            $(formMessages).removeClass('error');
            $(formMessages).addClass('success');

            $(formMessages).text(response);

            
            $('#name, #email').val('');

            var phone = $('#phone');
            if (phone.length) {
                $('#phone').val('');
            }
            var subject = $('#subject');
            if (subject.length) {
                $('#subject').val('');
            }
            var insurance_type = $('#insurance-type');
            if (insurance_type.length) {
                $('#insurance-type').val('');
            }
            var balance_limits = $('#balance-limits');
            if (balance_limits.length) {
                $('#balance-limits').val('');
            }
            var message = $('#message');
            if (message.length) {
                $('#message').val('');
            }
        })
        .fail(function(data) {
            $(formMessages).removeClass('success');
            $(formMessages).addClass('error');

            if (data.responseText !== '') {
                $(formMessages).text(data.responseText);
            } else {
                $(formMessages).text('Oops! An error occured and your message could not be sent.');
            }
        });
    });

})(jQuery);