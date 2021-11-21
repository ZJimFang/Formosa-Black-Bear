$(document).ready(function () {
    let $title;
    let otherPage;
    let handleSame = -1;
    let $scrollVal;
    let pagePhoto_number = 1;
    let information_number;
    let loopIndex = 0;
    let direct = 0;
    reset();
    //show anotherPage
    $('.menu>div').click(showPage);
    $('.more').click(showPage);

    //Pressing the space outside the box will also close the page
    $('#container').click(function () {
        newVideoPage = `#pageVideo`;//In order to turn off pageVideo and pageFormosa1 at once
        if ($(otherPage).attr('class') === 'showPage') {
            handleSame++;//Avoid processing at the same time as above
            if (handleSame > 0) {
                $(otherPage).attr('class', 'hidePage');
                $(newVideoPage).attr('class', 'hidePage');//In order to turn off pageVideo and pageFormosa1 at once
                $('#container').attr('class', '');
                handleSame = -1;
                reset();
                $('html').attr('class', '');
                $('video')[0].pause();//pause the video if it run
            }
        }
    })
    //show video
    $('#video').click(function () {
        $('.player').animate({ height: 410 }, "slow", "swing");
    })

    //show personal photos
    $('#about').click(function () {
        $('.pageAbout_photo').fadeIn(2000);
    })

    //show top btn
    $(window).scroll(function () {
        $scrollVal = Math.floor($(window).scrollTop());
        if ($scrollVal > 30) {
            $('#toTop').fadeIn(2000);
        }
        else if ($scrollVal < 40) {
            $('#toTop').fadeOut(1000);
        }
    })

    //highlight the information 
    $('.highlight').hover(function () {
        $(this).animate({ color: '#e40f0fcc' }, 500);
    })

    //to Video page 
    $('#toVideo').click(function () {
        newVideoPage = `#pageVideo`;
        $(newVideoPage).attr('class', 'showPage');
        $('.player').animate({ height: 410 }, "slow", "swing");
        $('#container').attr('class', 'opacity');//show page
        $('.cancel').click(function () {
            $(newVideoPage).attr('class', 'hidePage');
            $('#container').attr('class', '');
            handleSync = -1;
            reset();
        });
    });

    //page trivia click img event
    $('#imgSelect a').click(function (e) {
        e.preventDefault();
        var imagePath = $(this).attr('href');
        var $newImage = $(`<img src = "${imagePath}">`);
        var $oldImage = $('#showBox img');
        $newImage.hide();
        $('#showBox').prepend($newImage);
        $newImage.fadeIn(1000);
        $oldImage.remove();
    });


    //page Types lantern slide
    $('#Types_picture1').each(pageTypes_lanternSlide);
    $('#Photos_picture1').each(pageTypes_lanternSlide);

    //page photo change photo
    $('#next').click(function () {
        pagePhoto_number++;
        pageNext_changePhoto();
    })
    $('#last').click(function () {
        pagePhoto_number--;
        pageNext_changePhoto();
    })

    //page Information pick the picture
    $('#Appearance').click(function () {
        information_number = 1;
        pageInformation_pick(information_number);
        $('#W_Appearance').show();
    })
    $('#Feeding').click(function () {
        information_number = 2;
        pageInformation_pick(information_number);
        $('#W_Feeding').show();
    })
    $('#Activity').click(function () {
        information_number = 3;
        pageInformation_pick(information_number);
        $('#W_Activity').show();
    })
    $('#Childbirth').click(function () {
        information_number = 4;
        pageInformation_pick(information_number);
        $('#W_Childbirth').show();
    })

    // page How-to-protect rotate the formosa black bear
    $("#How-To-Protect_picture").rotate({ //black bear's head
        bind: {
            mouseover: function () {
                $(this).rotate({ animateTo: 360 });
            },
            mouseout: function () {
                $(this).rotate({ animateTo: 0 });
            }
        }
    });
    // page How-to-protect show "Become a part of us!!"btn
    $('#pageHow-to-protect').scroll(function () {
        $protect_scrollValue = Math.floor($('#pageHow-to-protect').scrollTop());
        if ($protect_scrollValue > 20) {
            $('#How-To-Protect_button').fadeIn(2000);
        }
        else if ($protect_scrollValue < 20) {
            $('#How-To-Protect_button').hide();
        }
    })

    // page How-to-protect show "Read the Act!!"btn
    $(document).ready(function () {
        $("#Read-the-Act_button").click(function () {
            $(".panel").slideToggle(3000);
        });
    });
    // page Characteristics show pic
    $('#pageCharacteristics').scroll(function () {
        $Characteristics_scrollValue = Math.floor($('#pageCharacteristics').scrollTop());
        if ($Characteristics_scrollValue > 20 || $Characteristics_scrollValue < -20) {
            $('#blackbear_characteristic_photo1').fadeIn(2000);
        }
        if ($Characteristics_scrollValue > 25 || $Characteristics_scrollValue < -25) {
            $('#blackbear_characteristic_photo2').fadeIn(2000);
        }
        if ($Characteristics_scrollValue > 30 || $Characteristics_scrollValue < -30) {
            $('#blackbear_characteristic_photo3').fadeIn(2000);
        }
        if ($Characteristics_scrollValue > 35 || $Characteristics_scrollValue < -35) {
            $('#blackbear_characteristic_photo4').fadeIn(2000);
        }

    })
    //Message board
    $('#btn').click(function () {
        let title = $('#name').val();
        let comments = $('#comment_content').val();
        if (title != "" && comments != "") {
            $('.comment_container').prepend(`<span class="comment_name">${title}</span><div class="comment">${comments}</div>`)
        }
        $('#name').val("");
        $('#comment_content').val("");
    })
    $(function () {
        autoLoop();
        $(".btn_right").click(function () {
            direct = 0;
            autoLoop();
        });
        $(".btn_left").click(function () {
            direct = 1;
            autoLoop();
        });
        $("#box").hover(function () {
            $("#box .btn").show();
        }, function () {
            $("#box .btn").hide();
        });
    });
    function autoLoop() {
        $("#big_img li").eq(loopIndex).fadeIn(1000).siblings("li").hide();
        if (direct == 0) {
            loopIndex++;
            if (loopIndex == $("#big_img li").length) {
                loopIndex = 0;
            }
        } else {
            loopIndex--;
            if (loopIndex == -1) {
                loopIndex = $("#big_img li").length - 1;
            }
        }
    }
    function pageInformation_pick(i) {
        $('#Information_picture2 img').attr("src", `photo/pageInformation2_${i}.jpg`).fadeIn(3000);
        $('#W_Appearance').hide();
        $('#W_Feeding').hide();
        $('#W_Activity').hide();
        $('#W_Childbirth').hide();
    }

    function pageNext_changePhoto() {
        if (pagePhoto_number == 4) {
            pagePhoto_number = 1;
        }
        if (pagePhoto_number == 0) {
            pagePhoto_number = 3;
        }
        $('#Photos_picture2 img').attr("src", `photo/pagePhotos2_${pagePhoto_number}.jpg`).fadeIn(3000);
        switch (pagePhoto_number) {
            case 1:
                $('#Jimmy').show();
                $('#Teacher').hide();
                $('#Mr').hide();
                break;
            case 2:
                $('#Jimmy').hide();
                $('#Teacher').show();
                $('#Mr').hide();
                break;
            case 3:
                $('#Jimmy').hide();
                $('#Teacher').hide();
                $('#Mr').show();
                break;
        }
    }

    function pageTypes_lanternSlide() {
        let slideImgs = $(this).find('img');
        let slideImgsCount = slideImgs.length;
        let currentIndex = 0;
        slideImgs.eq(currentIndex).fadeIn();
        setInterval(function () {
            let nextIndex = (currentIndex + 1) % slideImgsCount;
            slideImgs.eq(currentIndex).fadeOut();
            slideImgs.eq(nextIndex).fadeIn();
            currentIndex = nextIndex;
        }, 3000);
    }

    //reset the setting
    function reset() {
        $('.player').css('height', '0');
        $('#toTop').hide();
        $('.pageAbout_photo').hide();
        /*-------How-To-Protect下方的"Become a part of us!!"按鈕_-------*/
        $('#How-To-Protect_button').hide();
        /*-------Characteristics的黑熊照片-------*/
        $('#blackbear_characteristic_photo1').hide();
        $('#blackbear_characteristic_photo2').hide();
        $('#blackbear_characteristic_photo3').hide();
        $('#blackbear_characteristic_photo4').hide();

    }
    //show page
    function showPage() {
        $title = $(this).html();
        otherPage = `#page${$title}`;
        $(otherPage).attr('class', 'showPage');
        $('#container').attr('class', 'opacity');
        $('.cancel').click(function () {
            $(otherPage).attr('class', 'hidePage');
            $('#container').attr('class', '');
            handleSync = -1;
            reset();
            $('html').attr('class', '');
            $('video')[0].pause();//pause the video if it run
        });
        $('html').attr('class', 'hideScroll');
    }
})
