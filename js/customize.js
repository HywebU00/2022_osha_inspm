// 自行加入的JS請寫在這裡
$(function() {
    //燈箱slick+lightBox組合
    $('.cp_slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,
        pauseOnHover: true,
        pauseOnFocus: true,
        focusOnSelect: true,
        accessibility: true,
        lazyLoad: 'ondemand',
        ease: 'ease',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 545,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }]
    });
    $('.cp_slider').slickLightbox({
        caption: 'caption',
        lazyLoad: 'ondemand',
        useHistoryApi: 'true',
        ease: 'ease',
        lazy: true
    });
    // 
    $('.cppic_slider').slick({
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 1500,
        // pauseOnHover: true,
        // pauseOnFocus: true,
        // focusOnSelect: true,
        // accessibility: true,
        // lazyLoad: 'ondemand',
        // ease: 'ease',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            }
        }, {
            breakpoint: 545,
            settings: {
                arrows: true,
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                arrows: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }]
    });
    // cp_photo
    $('.Slider-for').on('init reInit afterChange', function(event, slick, currentSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('.controls').html(i + '/' + slick.slideCount);
    });
    $('.Slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        swipe: false,
        swipeToSlide: false,
        lazyLoad: 'ondemand',
        asNavFor: '.Slider-nav',
        infinite: true
    });
    $('.Slider-nav').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        asNavFor: '.Slider-for',
        dots: true,
        arrows: true,
        lazyLoad: 'ondemand',
        focusOnSelect: true,
        infinite: true
    });

    // password_toggle
    var passShow = false;
    $('.password_toggle').each(function(index, el) {
        $(this).find('.btn-icon').off().click(function(e) {
            if (!passShow) {
                $(this).children('i').removeClass().addClass('i_show');
                $(this).parents('.password_toggle').find('input[type="password"]').attr('type', 'text');
                passShow = true;
                // console.log(passShow);
            } else {
                $(this).children('i').removeClass().addClass('i_hide');
                $(this).parents('.password_toggle').find('input[type="text"]').attr('type', 'password');
                passShow = false;
                // console.log(passShow);
            }
            e.preventDefault();
        });
    });

    function tabFun() {
        var activeClass = 'active'; //啟動的 class
        var tabSet = $('.tabSet'); //tab名稱

        tabSet.each(function() {
            var _tabBtnBlock = $(this).find('.tabItems'); //頁籤按鈕區塊
            var _tabBtn = _tabBtnBlock.find('button'); //頁籤按鈕
            var _tabBtnLength = _tabBtn.length; //頁籤按鈕數量
            var _tabContentBlock = $(this).find('.tabContentGroup'); //頁籤內容區塊
            var _tabContent = _tabContentBlock.find('.tabContent'); //頁籤內容
            var _tabContentLength = _tabContent.length; //頁籤內容數量
            _tabBtn.eq(0).addClass(activeClass); //第一個頁籤按鈕active
            _tabContent.eq(0).show(); //第一個頁籤內容顯示

            for (var i = 0; i < _tabBtnLength; i++) {
                //綁定是哪一個頁籤
                (function(i) {
                    var _this = _tabBtn.eq(i); //綁定這一個頁籤按鈕
                    var _thisContent = _tabContent.eq(i); //綁定這一個頁籤內容
                    var _thisPrevItem = _tabContent.eq(i - 1); //綁定前一個頁籤按鈕
                    var _itemAllA = _thisContent.find('[href], input'); //這一個頁籤內容所有a和input項目
                    var _prevItemAllA = _thisPrevItem.find('[href], input'); //前一個頁籤內容所有a和input項目
                    var _isFirstTab = i === 0; //如果是第一個頁籤
                    var _isLastTab = i === _tabBtnLength - 1; //如果是最後一個頁籤
                    var _itemFirstA = _itemAllA.eq(0); //頁籤內容第一個a或是input
                    var _itemLastA = _itemAllA.eq(-1); //頁籤內容最後一個a或是input
                    var _prevItemLastA = _prevItemAllA.eq(-1); //前一個頁籤的最後一個a或是input

                    // _this頁籤觸發focus內容裡的第一個a
                    _this.on('keydown', function(e) {
                        //頁籤第幾個按鈕觸發時
                        if (e.which === 9 && !e.shiftKey) {
                            //e.which偵測按下哪個案件，9代表tab，shiftKey代表shift
                            e.preventDefault();
                            startTab(i); //啟動頁籤切換功能
                            if (_itemAllA.length) {
                                //type number = true，0是false
                                _itemFirstA.focus(); //第一個a或是input focus
                            } else {
                                _tabBtn.eq(i + 1).focus(); //當內容沒有a或是input跳轉下一個tab
                            }
                        } else if (e.which === 9 && e.shiftKey && !_isFirstTab) {
                            e.preventDefault();

                            startTab(i - 1); //啟動頁籤切換功能

                            if (_prevItemAllA.length) {
                                _prevItemLastA.focus(); //前一個頁籤內容的最後一個a或是input focus
                            } else {
                                _tabBtn.eq(i - 1).focus(); //當內容沒有a或是input跳轉上一個tab
                            }
                        }
                    });

                    //當按下shift+tab且為該內容的第一個a或是input
                    //將focus目標轉回tab頁籤上，呼叫上方功能startTab(i - 1);往前一個頁籤
                    _itemFirstA.on('keydown', function(e) {
                        console.log(i);
                        if (e.which === 9 && e.shiftKey) {
                            e.preventDefault();
                            _tabBtn.eq(i).focus();
                        }
                    });

                    //當按下shift+tab且為該內容的最後一個a或是input
                    //focus到下一個頁籤
                    _itemLastA.on('keydown', function(e) {
                        if (e.which === 9 && !e.shiftKey && !_isLastTab) {
                            e.preventDefault();
                            _tabBtn.eq(i + 1).focus();
                        }
                    });
                })(i);

                //滑鼠點擊事件
                _tabBtn.on('click', function(e) {
                    e.preventDefault();
                    var _nowBtn = $(this).index();
                    startTab(_nowBtn);
                });

                //切換tab
                function startTab(_now) {
                    _tabBtn.eq(_now).addClass(activeClass).siblings().removeClass(activeClass);
                    //頁籤按鈕增加指定class(active)，其他頁籤移除指定class
                    _tabContent.eq(_now).show().siblings().hide();
                    //顯示當下頁籤內，隱藏其他內容
                }
            }
        });
    }
    tabFun();
});