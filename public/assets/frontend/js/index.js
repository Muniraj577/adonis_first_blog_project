// sticky top
$(function () {

    window.onscroll = function () {
        myFunction()
    };

    var navbar = document.getElementById("main_menus");
    var sticky = navbar.offsetTop;

    function myFunction() {
        if (window.pageYOffset > sticky) {

            navbar.classList.add("sticky")
        } else {

            navbar.classList.remove("sticky");
        }
    }


});
//  end sticky top
// scroll to top
var btn = $('#button');

$(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
        btn.addClass('show');
    } else {
        btn.removeClass('show');
    }
});

btn.on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: 0
    }, '300');
});
// end of scroll to top

// user profile script navbar
$("#user_profile_icon").on("click", function () {
    $("#user_profile").toggleClass("user-card");
    if ($("#user_profile").hasClass("user-card")) {
        $("#user_profile").hide();
    } else {
        $("#user_profile").show();
    }
});
// image preview for setting page
function showImg(img, previewId) {
    readInputURL1(img, previewId);
}

function readInputURL1(input, idName) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $("#" + idName)
                .attr("src", e.target.result)
                .width(80)
                .height(80);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
