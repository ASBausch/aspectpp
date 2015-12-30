/**
 * Created by manadab on 12/29/15.
 */
//jQuery functional as angular alternative

jQuery(document).ready(function() {
    jQuery('.styleBtn').click(function () {
        var style = jQuery(this);
        var currentId = jQuery('.styleBtn').data('id');
        var currentUrl = jQuery('styleBtn').data('url');
        $.get('/style', function (req, res, next) {
            console.log(style.val());
            console.log(currentId);
        });

    });
});
