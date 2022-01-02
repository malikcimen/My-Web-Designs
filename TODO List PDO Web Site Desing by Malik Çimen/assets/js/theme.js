(function($) {
    'use strict';


    // ie
    if (!!navigator.userAgent.match(/MSIE/i) || !!navigator.userAgent.match(/Trident.*rv:11\./)) {
        $('body').addClass('ie');
    }

    // iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
    var ua = window['navigator']['userAgent'] || window['navigator']['vendor'] || window['opera'];
    if ((/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua)) {
        $('body').addClass('touch');
    }

    // fix z-index on ios safari
    if ((/iPhone|iPod|iPad/).test(ua)) {
        $(document, '.modal, .aside').on('shown.bs.modal', function(e) {
            var backDrop = $('.modal-backdrop');
            $(e.target).after($(backDrop));
        });
    }
    //resize
    var $w = $(window).width(),
        $lg = 1200,
        $md = 991,
        $sm = 768;
    $(window).on('resize', function() {
        var $w = $(window).width(),
            $lg = 1200,
            $md = 991,
            $sm = 768;
        if ($w > $lg) {
            $('.aside-lg').modal('hide');
        }
        if ($w > $md) {
            $('#aside').modal('hide');
            $('.aside-md, .aside-sm').modal('hide'); 
        }
        if ($w > $sm) {
            $('.aside-sm').modal('hide');
        }
    });
        if ($w > $md) {
    var c, currentScrollTop = 0,
        navbar = $('.app-header');

    $(window).scroll(function() {
        var a = $(window).scrollTop();
        var b = navbar.height();

        currentScrollTop = a;

        if (c < currentScrollTop && a > b + b) {
            navbar.addClass("is-hidden");
        } else if (c > currentScrollTop && !(a <= b)) {
            navbar.removeClass("is-hidden");
        }
        c = currentScrollTop;
    });
             
    }
  
 
    $("body").on("submit", "form", function(event) { 
        var submitable = true;
        $(this).find('button').attr('disabled',true);
        $(this).find("[required]:visible").not(":disabled").each(function() {
            if (!$(this).val()) {
                var submitable = false;
            }
        });
        if (submitable) {
            $("body").addClass("onprogress");
            return true;
        }
    });
    

    $('html').click(function(event) {
        if ($(event.target).closest('.navbar-search-suggestions').length === 0) {
            $(".navbar-search-suggestions").removeClass('show');
        }
    });
    // modal
    $('body').on('click', '[data-toggle="modal"]', function() {
        $('.modal').modal('hide');
        $('.aside').modal('hide');
        if ($(this).data("target") != '#mobile-menu') {
            $($(this).data("target") + ' .modal-dialog').load($(this).data("remote"), function() {});
        }
    });
    $(document).on('hide.bs.modal', '#modal', function() {
        $('#modal .modal-dialog').html('');
    });


    $(".preview-btn").on("click", function(event) {
        var id = $(this).attr('id');
        $('#file-' + id).click();
    });
    $(".preview-input").on("change", function(event) {
        var id = $(this).attr('data-preview');
        if (this.files && this.files[0]) {

            var reader = new FileReader();
            reader.onload = function(e) {
                $('.' + id).css('background-image', 'url(' + e.target.result + ')');
                $('.shop-cover.shop-edit').backgroundDraggable({ axis: 'y' });
            }
            reader.readAsDataURL(this.files[0]);
        }
    });


    $(document).on('click', '.search-btn', function(e) {
        $('body').addClass('navbar-search-open');
        $('.navbar-search').addClass('show');
        $('.navbar-search-overlay').addClass('show');
        $('.navbar-search-form .form-control').focus();
    });
    $(document).on('click', '.filter-nav a', function(e) {
        $(this).addClass('active');
        return false;
    }); 
    $(document).on('click', '.navbar-search-overlay', function(e) {
        $('body').removeClass('navbar-search-open');
        $('.navbar-search').removeClass('show');
        $('.navbar-search-overlay').removeClass('show');
        $('.support-content').removeClass('show');
        $('.support-btn').removeClass('show');
    });

    $(document).on('keypress keyup blur', '.upper', function() {

        var box = event.target;
        var txt = $(this).val();
        var start = box.selectionStart;
        var end = box.selectionEnd;

        $(this).val(txt.replace(/^(.)|(\s|\-)(.)/g,
            function(c) {
                c = c.replace(new RegExp('i', 'g'), 'İ');
                return c.toUpperCase();
            }));
        box.setSelectionRange(start, end);
        return this;
    });
    $(".number").on("keypress keyup blur", function(event) {
        $(this).val($(this).val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });

    var init = function() {
        bsCustomFileInput.init();
        $('[data-toggle="popover"]').popover();

        $('[data-toggle="tooltip"]').tooltip({
            trigger: "hover"
        });

        // nav
        $(document).on('click', '[data-nav] a', function(e) {
            var $this = $(this),
                $active, $li, $li_li;

            $li = $this.parent();
            $li_li = $li.parents('li');

            $active = $li.closest("[data-nav]").find('.active');

            $li_li.addClass('active');
            ($this.next().is('ul') && $li.toggleClass('active') && e.preventDefault()) || $li.addClass('active');

            $active.not($li_li).not($li).removeClass('active');

            if ($this.attr('href') && $this.attr('href') != '#') {
                $(document).trigger('Nav:changed');
            }
        });

        // active nav item   
        var urls = window.location;
        if (urls.length > 0) url = urls[urls.length - 1];
        $('[data-nav] li.active').removeClass('active');
        $('[data-nav] a').filter(function() {

            return urls == $(this).attr('href') && $(this).attr('href') !== '#';
        }).parents('li').addClass('active');

    }
    $(document, '.modal, .aside').on('shown.bs.modal', function(e) {
        init();
    });
    init();



})(jQuery);