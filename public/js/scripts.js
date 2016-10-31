function mainContentHeightAdjust() {
    // Adjust main content height
    var docHeight = $(window).height();
    var main = $('.main-content');
    main.css("min-height", docHeight);
}


(function () {
    "use strict";

    var body = $('body');

    // custom scrollbar

    $("html").niceScroll({
        styler: "fb",
        cursorcolor: "#65cea7",
        cursorwidth: '6',
        cursorborderradius: '0px',
        background: '#424f63',
        spacebarenabled: false,
        cursorborder: '0',
        zindex: '1000'
    });

    var leftSide = $(".left-side");

    leftSide.niceScroll({
        styler: "fb",
        cursorcolor: "#65cea7",
        cursorwidth: '3',
        cursorborderradius: '0px',
        background: '#424f63',
        spacebarenabled: false,
        cursorborder: '0'
    });

    leftSide.getNiceScroll();

    if (body.hasClass('left-side-collapsed')) {
        leftSide.getNiceScroll().hide();
    }

    // Toggle Left Menu
    $('.menu-list > a').click(function () {

        var parent = $(this).parent();
        var sub = parent.find('> ul');

        if (!body.hasClass('left-side-collapsed')) {
            if (sub.is(':visible')) {
                sub.slideUp(200, function () {
                    parent.removeClass('nav-active');
                    mainContentHeightAdjust();
                });
            } else {
                visibleSubMenuClose();
                parent.addClass('nav-active');
                sub.slideDown(200, function () {
                    mainContentHeightAdjust();
                });
            }
        }
        return false;
    });

    function visibleSubMenuClose() {
        $('.menu-list.nav-active > ul').slideUp(200, function () {
            $(this).parent().removeClass('nav-active');
        });
    }

    //  class add mouse hover
    $('.custom-nav > li')

        .hover(function () {
            $(this).addClass('nav-hover');
        }, function () {
            $(this).removeClass('nav-hover');
        })

        .click(function () {
            visibleSubMenuClose();
            $(this).addClass("active").siblings().removeClass("active");
            $(".sub-menu-list > li").removeClass("active");
        });

    $(".sub-menu-list > li").click(function () {
        $('.custom-nav > li').removeClass("active");
        $(this).addClass("active").siblings().removeClass("active");
        return false;
    });


    // Menu Toggle
    $('.toggle-btn').click(function () {
        leftSide.getNiceScroll().hide();

        if (body.hasClass('left-side-collapsed')) {
            leftSide.getNiceScroll().hide();
        }

        var bodyposition = body.css('position');

        if (bodyposition != 'relative') {

            if (!body.hasClass('left-side-collapsed')) {
                body.addClass('left-side-collapsed');
                $('.custom-nav ul').attr('style', '');

                $(this).addClass('menu-collapsed');

            } else {
                body.removeClass('left-side-collapsed chat-view');
                $('.custom-nav li.active ul').css({display: 'block'});

                $(this).removeClass('menu-collapsed');

            }
        } else {

            if (body.hasClass('left-side-show'))
                body.removeClass('left-side-show');
            else
                body.addClass('left-side-show');

            mainContentHeightAdjust();
        }

    });

    searchform_reposition();

    $(window).resize(function () {

        if (body.css('position') == 'relative') {

            body.removeClass('left-side-collapsed');

        } else {

            body.css({left: '', marginRight: ''});
        }

        searchform_reposition();
        mainContentHeightAdjust();
    });

    function searchform_reposition() {
        var searchform = $('.searchform');

        if (searchform.css('position') == 'relative') {
            searchform.insertBefore('.left-side-inner .logged-user');
        } else {
            searchform.insertBefore('.menu-right');
        }
    }

    // panel collapsible
    $('.panel .tools .fa').click(function () {
        var el = $(this).parents(".panel").children(".panel-body");
        if ($(this).hasClass("fa-chevron-down")) {
            $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
            el.slideUp(200);
        } else {
            $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
            el.slideDown(200);
        }
    });

    $('.todo-check label').click(function () {
        $(this).parents('li').children('.todo-title').toggleClass('line-through');
    });

    $(document).on('click', '.todo-remove', function () {
        $(this).closest("li").remove();
        return false;
    });


    // panel close
    $('.panel .tools .fa-times').click(function () {
        $(this).parents(".panel").parent().remove();
    });


    // tool tips

    $('.tooltips').tooltip();

    // popovers

    $('.popovers').popover();


    $(document).on("click", "a[data-href]", function () {
        var ajax = {
            url: $(this).data("href"),
            type: "get",
            dataType: "html",
            success: function (html) {
                $("#wrapper").html(html);
            },
            error: function (e) {
                switch (e.status) {
                    case 301:
                    case 302:
                        location.href = e.getResponseHeader("X-Redirect");
                        break;
                    case 400:
                        alert("参数错误");
                        break;
                    case 403:
                        alert("禁止");
                        break;
                    case 404:
                        alert("找不到");
                        break;
                    case 500:
                        alert(500);
                        console.log(e);
                }
            }
        };
        $.ajax(ajax);
    });

    $("a[data-href='/site/index']").get(0).click();

})($);

