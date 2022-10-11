$(function() {
    console.log( "ready!" );

    $('.js-menu-togle').on('click', function() {
        // $('.navbar__nav-list').toggleClass('navbar-open');
        $('.navbar__nav').toggleClass('navbar__nav-open');
    });

    $('.dropdown-toggle').on('click', function(e) {
        e.preventDefault();
        $(e.target).parent().toggleClass('dropdown--open');
    });

    //btn pressesd effect
    // $(".btn").mousedown(function(){
    //     // console.log($(e.target).html());
    //     $(this).addClass("btn-pressed");
    // });
    
    $(".btn").mouseup(function(){
       
        setTimeout(function(){
            $(this).removeClass("btn-pressed");
          }, 2000);
          
    });
    
    // $(".btn").on("tap",function(){
    //     $(this).addClass("btn-pressed");
    // });
    
    // $(".btn").on("tap",function(){
    //     $(this).removeClass("btn-pressed");
    // });
    
    

    //close menu on click outside
    $(document).on('click', function(e) {
        // console.log($(e.target).closest('header.main'));
        if (!$(e.target).closest('header.main').length) {
           if($('.navbar__nav-list').hasClass('navbar-open')){
               $('.navbar__nav-list').removeClass('navbar-open');
           }
            //$('.navbar__nav-list').hasClass('navbar-open');
            // $('.dropdown').removeClass('dropdown--open');
        }
    });
});


// Navigation mobile
var mtNavigationMobile = {

    navSection: $('.header-navigation'),
    navBlock: $('.navigation'),
    currentStep: 0,
    duration: 1000,

    init: function() {
        this.openNavigation();
        this.closeNavigation();
        this.buildNavigation();
    },

    /**
     * Build back button
     * @param {Object} parent
     * @param {String} txt
     */
    buildBackBtn: function(parent, txt) {

        parent.prepend('<li class="submenu-back-wrapper">' +
            '<button type="button" class="submenu-back">' +
            '<span>'+ txt +'</span>' +
            '</button>' +
            '</li>');
    },

    /**
     * Build submenu
     */
    buildNavigation: function() {

        var self = this;

        var submenus = $('ul.submenu');

        for(var i = 0; i < submenus.length; i++) {

            var submenu = submenus[i];

            // Add back btn
            var linkText = $(submenu).prev('a').text();
            self.buildBackBtn($(submenu), linkText);
        }

        self.goBack();
        self.goNext();
    },

    /**
     * Go to previous submenu
     */
    goBack: function() {

        var self = this;

        self.navSection.on('click', '.submenu-back',function() {

            self.navBlock.removeClass('level-'+self.currentStep);
            self.currentStep = self.currentStep - 1;

            setTimeout(function(){
                $(this).closest('li.parent').removeClass('submenu-is-open');

                if(self.currentStep === 0) {
                    $('li.level0.parent').removeClass('submenu-is-open');
                }
            }, self.duration);
        })
    },

    /**
     * Go to next submenu
     */
    goNext: function() {

        var self = this;
        var goTo = $('li.parent > a');

        goTo.on('click', function (e) {
            e.preventDefault();

            self.currentStep = self.currentStep + 1;

            if(self.currentStep === 1) {
                $('li.level0.parent').removeClass('submenu-is-open');
            } else if(self.currentStep === 2) {
                $('li.level1.parent').removeClass('submenu-is-open');
            } else if(self.currentStep === 3) {
                $('li.level2.parent').removeClass('submenu-is-open');
            }

            $(this).parent().addClass('submenu-is-open');
            self.navBlock.addClass('level-'+ self.currentStep);
        });
    },

    /**
     * Open navigation
     */
    openNavigation: function() {

        var self = this;

        $('#openNav').on('click', function(){
            self.navSection.addClass('is-active');
            $('.page-wrapper ').addClass('nav-is-open');
        });
    },

    /**
     * Close navigation
     */
    closeNavigation: function() {

        var self = this;

        $('#closeNav').on('click', function(){

            self.navSection.removeClass('is-active');
            $('.page-wrapper ').removeClass('nav-is-open');

            // Add setTimeout to preserve css transition
            setTimeout(function(){
                $('.navigation__list li').removeClass('submenu-is-open');
                self.navBlock.removeClass('level-3 level-2 level-1');
                self.currentStep = 0
            }, self.duration);
        });
    }
};
mtNavigationMobile.init();