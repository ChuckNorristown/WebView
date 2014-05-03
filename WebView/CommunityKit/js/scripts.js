var pagewidth = ($(window).outerWidth() > 954) ? 954 : $(window).outerWidth(),
    currsec = 0;
    animTime = 500;

$(window).load(function () {
    pageCount = $('.section').length;

    $('.inner').css('width', pagewidth + 'px');

    $('.section').not($('.section').eq(0)).find('.back').css('-webkit-transform', 'rotateY(180deg)');
    $('.section').not($('.section').eq(currsec)).css('display', 'none');
    var z = 1000;
    $('.section').each(function () {
        $(this).css('z-index', z).attr('data-z', z--);
        $(this).find('.front').css('-webkit-transform', 'rotate(0deg)');

    });

    $('#pagination').css({
        'z-index': pageCount
    });
    $('#swipe').css({
        'z-index': pageCount
    });

    $('.currsec').text(currsec + 1);
    $('.totalPages').text(pageCount);

    if (pageCount > 1) {
        showSwipeNow();
        removeSwipeTimer();
    }
});

$(window).resize(function () {
    pagewidth = ($(window).outerWidth() > 954) ? 954 : $(window).outerWidth();
    $('.inner').css('width', pagewidth + 'px');
});

var mouse = {
    ox: 0,
    x: 0,
    y: 0,
    down: false,
    ontab: false,
    onlink: false
}

var page, delta, dir;

//opacity
var mult = 12;

$(document).on('mousedown touchstart', '.tabs, a, .front, .back', MouseDown);

function MouseDown(e) {
    if($(this).index('.tabs') >= 0) mouse.ontab = true;
    if($(this).index('a') >= 0) mouse.onlink = true;
    if(!mouse.ontab && !mouse.onlink)
    {
        if (!mouse.down && !mouse.onlink && delta == undefined) {
            e.preventDefault();
            mouse.down = true;
            var x = e.clientX || e.originalEvent.touches[0].pageX;
            mouse.x = x;
            mouse.ox = x;
            page = $(this);
            if (page == undefined) return;

            if (currsec - 1 >= 0) $('.section').eq(currsec - 1).css('z-index', 70000);
            $('.section').eq(currsec).css('z-index', 90000);
            $('.section').eq(currsec + 1).css('z-index', 70000);
        }
    }
}

function updatePagination() {
    $('.currsec').text(currsec + 1);
    $('#pagination').stop().animate({
        'opacity': 1
    }, animTime);
    removePagination();
}

function removePagination() {
    timeout = window.setTimeout(function() {
        $('#pagination').stop().animate({
            'opacity': 0
        }, animTime);
    }, 1000);
}

function showSwipeNow() {
    $('#swipe').stop().animate({
        'opacity': 1
    }, animTime);
}

function removeSwipeTimer() {
    window.setTimeout(function() {
        $('#swipe').stop().animate({
            'opacity': 0
        }, animTime);
    }, 1500 + animTime);
}

function removeSwipeNow() {
    $('#swipe').stop().animate({
        'opacity': 0
    }, animTime);
}


$(document).on('mouseup touchend', MouseUp);

function MouseUp() {
    mouse.ontab = false;
    mouse.onlink = false;
    if (page == undefined) return;
    mouse.down = false;

    if (Math.abs(delta) >= 90) {
        if (dir == 1) {
            if (delta <= -90) {
                if (currsec < $('.section').length - 1) {
                    page.css({
                        '-webkit-transition': 'all .2s linear',
                        'transition': 'all .2s linear',
                        '-webkit-transform': 'rotateY(-180deg)'
                    });
                    $('.section').eq(currsec + 1).find('.back').css({
                        '-webkit-transition': 'all .2s linear',
                        'transition': 'all .2s linear',
                        '-webkit-transform': 'rotateY(0deg)'
                    });
                    $('.section').each(function () {
                        $(this).css('z-index', $(this).attr('data-z'));
                    });

                    $('.section').eq(currsec).css('z-index', 70000);
                    $('.section').eq(currsec + 1).css('z-index', 90000);
                    $('.section').eq(currsec + 2).css('z-index', 70000);

                    $('.section').eq(currsec).find('.back').find('.overlay').stop().animate({
                        'opacity': 1 / mult
                    }, 210, function () {
                        $(this).removeAttr('style');
                    });
                    $('.section').eq(currsec + 1).find('.front').find('.overlay').stop().animate({
                        'opacity': 0
                    }, 210, function () {
                        $(this).removeAttr('style');
                    });
                    currsec++;
                    updatePagination();
                }
            }
        } else {
            if (currsec != 0) {
                if (delta >= 90) {
                    page.css({
                        '-webkit-transition': 'all .2s linear',
                        '-webkit-transform': 'rotateY(180deg)'
                    });
                    $('.section').eq(currsec - 1).find('.front').css({
                        '-webkit-transition': 'all .2s linear',
                        '-webkit-transform': 'rotateY(0deg)'
                    });
                    $('.section').each(function () {
                        $(this).css('z-index', $(this).attr('data-z'));
                    });
                    $('.section').eq(currsec).css('z-index', 70000);
                    $('.section').eq(currsec - 1).css('z-index', 90000);
                    if (currsec - 2 >= 0) $('.section').eq(currsec - 2).css('z-index', 70000);

                    $('.section').eq(currsec).find('.front').find('.overlay').stop().animate({
                        'opacity': 1 / mult
                    }, 210, function () {
                        $(this).removeAttr('style');
                    });
                    $('.section').eq(currsec - 1).find('.back').find('.overlay').stop().animate({
                        'opacity': 0
                    }, 210, function () {
                        $(this).removeAttr('style');
                    });
                    currsec--;
                    updatePagination();
                }
            }
        }
    } else {
        if (dir == 1) {
            if (currsec < $('.section').length - 1) {
                page.css({
                    '-webkit-transition': 'all .2s linear',
                    '-webkit-transform': 'rotateY(0deg)'
                });
                $('.section').eq(currsec + 1).find('.back').css({
                    '-webkit-transition': 'all .2s linear',
                    '-webkit-transform': 'rotateY(180deg)'
                });
                $('.section').each(function () {
                    $(this).css('z-index', $(this).attr('data-z'));
                });
                $('.section').eq(currsec + 1).css('z-index', 70000);
                $('.section').eq(currsec).css('z-index', 90000);
                if (currsec - 1 >= 0) $('.section').eq(currsec - 1).css('z-index', 70000);

                $('.section').eq(currsec).find('.back').find('.overlay').stop().animate({
                    'opacity': 0
                }, 210, function () {
                    $(this).removeAttr('style');
                });
            }
        } else {
            if (currsec != 0) {
                page.css({
                    '-webkit-transition': 'all .2s linear',
                    '-webkit-transform': 'rotateY(0deg)'
                });
                if (currsec - 1 >= 0) $('.section').eq(currsec - 1).find('.front').css({
                    '-webkit-transition': 'all .2s linear',
                    '-webkit-transform': 'rotateY(-180deg)'
                });
                $('.section').each(function () {
                    $(this).css('z-index', $(this).attr('data-z'));
                });

                $('.section').eq(currsec + 1).css('z-index', 70000);
                $('.section').eq(currsec).css('z-index', 90000);
                if (currsec - 1 >= 0) $('.section').eq(currsec - 1).css('z-index', 70000);

                $('.section').eq(currsec).find('.front').find('.overlay').stop().animate({
                    'opacity': 0
                }, 210, function () {
                    $(this).removeAttr('style');
                });
            }
        }
    }

    setTimeout(function () {
        $('.section').each(function () {
            $(this).find('.front').css('-webkit-transition', '');
            $(this).find('.back').css('-webkit-transition', '');
        });
    }, 210);

    page = undefined;
    delta = undefined;
    dir = undefined;
}

var flipping = false,
    sec1 = 2,
    sec2 = 5,
    sec3 = 10;
    sec4 = 12;

$(document).on('mousedown touchstart','.tab',function(){
    switch($(this).index())
    {
        case 0:
            if(currsec > sec1)
            {
                for(var i = 0; i < Math.abs(currsec - sec1); i++)
                {
                    setTimeout(function(){
                        TurnLeft();
                    },(i * 250));
                    setTimeout(function(){
                        flipping = false;
                    },Math.abs(currsec - sec1) * 250);
                }
            }
            else
            {
                for(var i = 0; i < Math.abs(currsec - sec1); i++)
                {
                    setTimeout(function(){
                        TurnRight();
                    },(i * 250));
                    setTimeout(function(){
                        flipping = false;
                    },Math.abs(currsec - sec1) * 250);
                }
            }
        break;
        case 1:
            if(currsec > sec2)
            {
                for(var i = 0; i < Math.abs(currsec - sec2); i++)
                {
                    setTimeout(function(){
                        TurnLeft();
                    },(i * 250));
                    setTimeout(function(){
                        flipping = false;
                    },Math.abs(currsec - sec2) * 250);
                }
            }
            else
            {
                for(var i = 0; i < Math.abs(currsec - sec2); i++)
                {
                    setTimeout(function(){
                        TurnRight();
                    },(i * 250));
                    setTimeout(function(){
                        flipping = false;
                    },Math.abs(currsec - sec2) * 250);
                }
            }
        break;
        case 2:
            if(currsec > sec3)
            {
                for(var i = 0; i < Math.abs(currsec - sec3); i++)
                {
                    setTimeout(function(){
                        TurnLeft();
                    },(i * 250));
                    setTimeout(function(){
                        flipping = false;
                    },Math.abs(currsec - sec3) * 250);
                }
            }
            else
            {
                for(var i = 0; i < Math.abs(currsec - sec3); i++)
                {
                    setTimeout(function(){
                        TurnRight();
                    },(i * 250));
                    setTimeout(function(){
                        flipping = false;
                    },Math.abs(currsec - sec3) * 250);
                }
            }
        break;
        case 3:
            if(currsec > sec4)
            {
                for(var i = 0; i < Math.abs(currsec - sec4); i++)
                {
                    setTimeout(function(){
                        TurnLeft();
                    },(i * 250));
                    setTimeout(function(){
                        flipping = false;
                    },Math.abs(currsec - sec4) * 250);
                }
            }
            else
            {
                for(var i = 0; i < Math.abs(currsec - sec4); i++)
                {
                    setTimeout(function(){
                        TurnRight();
                    },(i * 250));
                    setTimeout(function(){
                        flipping = false;
                    },Math.abs(currsec - sec4) * 250);
                }
            }
        break;
    }
});

$(document).on('keypress', function (e) {
    //48 - 57 / 0 - 9
    if(!flipping)
    {

        flipping = true;

        if (e.which == 100) {
            TurnRight();
        } // right
        else if (e.which == 97) {
            TurnLeft();
        } // left
        else if(e.which == 48) {
            for(var i = 0; i < Math.abs(currsec - 0); i++)
            {
                setTimeout(function(){
                    if(currsec == 0) flipping = false;
                    TurnLeft();
                },(i * 250));
            }
        }
    }
})

function TurnLeft(){
    flipping = true;
    SimMouseDown(0);
    SimMouseMove(1);
    setTimeout(MouseUp,1);
    setTimeout(function () {
        $('.section').each(function () {
            $(this).find('.front').css('-webkit-transition', '');
            $(this).find('.back').css('-webkit-transition', '');
        });
    }, 210);
}

function TurnRight(){
    flipping = true;
    SimMouseDown(1);
    SimMouseMove(1);
    setTimeout(MouseUp,1);
    setTimeout(function () {
        $('.section').each(function () {
            mouse.ontab = false;
            $(this).find('.front').css('-webkit-transition', '');
            $(this).find('.back').css('-webkit-transition', '');
        });
    }, 210);
}


var compressor = 4;

$(document).on('mousemove touchmove', function (e) {
    if(!mouse.ontab && !mouse.onlink)
    {
        if(!flipping)
        {
            if (page == undefined) return;
            e.preventDefault();
            var dy = e.clientY || e.originalEvent.touches[0].pageY;
            if (dy < 40) e.preventDefault();
            if (mouse.down) {
                var x = e.clientX || e.originalEvent.touches[0].pageX;
                if (mouse.x != x) {
                    //$('.delta').text(mouse.x - mouse.ox);
                    var dx = mouse.x - mouse.ox,
                        change;

                    delta = dx;

                    if (page.hasClass('front')) {
                        dir = 1;
                        if (x > mouse.x) {
                            delta = 0;
                        }
                        if (currsec < $('.section').length - 1) {
                            change = (dx / compressor < -180) ? -180 : (dx / compressor > 0) ? 0 : dx / compressor;
                            var backchange = (180 + dx / compressor < 1) ? 1 : (180 + dx / compressor > 180) ? 180 : 180 + dx / compressor;

                            var bo = -change / (180 * mult);
                            var nfo = (1 / mult) - ((-change / (180) * (1 / mult)));


                            $('.section').eq(currsec).find('.back').find('.overlay').css({
                                'opacity': bo
                            });
                            $('.section').eq(currsec + 1).find('.front').find('.overlay').css({
                                'opacity': nfo
                            });

                            if (change != 0) {
                                if (currsec + 1 <= $('.section').length - 1) $('.section').eq(currsec + 1).css('display', 'block');
                                if (currsec - 1 >= 0) $('.section').eq(currsec - 1).css('display', 'none');
                            } else $('.section').eq(currsec + 1).css('display', 'none');

                            $('.section').eq(currsec + 1).find('.back').css('webkit-transform', 'rotateY(' + backchange + 'deg)');

                            page.css('-webkit-transform', 'rotateY(' + change + 'deg)');
                        }
                    } else {
                        dir = 0;
                        if (x < mouse.x) {
                            delta = 0;
                        }
                        if (currsec != 0) {
                            change = (dx / compressor > 180) ? 180 : (dx / compressor < 0) ? 0 : dx / compressor;
                            var frontchange = (-180 + dx / compressor < -180) ? -180 : (-180 + dx / compressor > -1) ? -1 : -180 + dx / compressor;

                            var pbo = change / (180 * mult);
                            var fo = (1 / mult) - ((change / (180) * (1 / mult)));

                            $('.section').eq(currsec).find('.front').find('.overlay').css({
                                'opacity': pbo
                            });
                            $('.section').eq(currsec - 1).find('.back').find('.overlay').css({
                                'opacity': fo
                            });

                            if (change != 0) {
                                if (currsec - 1 >= 0) $('.section').eq(currsec - 1).css('display', 'block');
                                if (currsec + 1 <= $('.section').length - 1) $('.section').eq(currsec + 1).css('display', 'none');
                            } else $('.section').eq(currsec - 1).css('display', 'none');

                            $('.section').eq(currsec - 1).find('.front').css('webkit-transform', 'rotateY(' + frontchange + 'deg)');

                            page.css('-webkit-transform', 'rotateY(' + change + 'deg)');
                        }
                    }
                }
                mouse.x = x;
            }
        }
    }
});

function SimMouseDown(direction,toPage) {
    if (!mouse.down && delta == undefined) {
        mouse.down = true;
        mouse.x = 0;
        mouse.ox = 0;
        dir = (direction != null) ? direction : (currsec < toPage) ? 1 : 0;
        
        if(dir == 0)
        {
            page = $('.back').eq(currsec);
            delta = 91;
        }
        else
        {
            page = $('.front').eq(currsec);
            delta = -91;
        }
        if (page == undefined) return;
        
        if(toPage != null)
        {
            $('.section').eq(currsec).css('z-index', 90000);
            $('.section').eq(toPage).css('z-index', 70000);
            if(currsec + 1 != toPage) $('.section').eq(currsec + 1).css('z-index', $('.section').eq(currsec + 1).attr('data-z'));
            if(currsec - 1 != toPage) $('.section').eq(currsec - 1).css('z-index', $('.section').eq(currsec - 1).attr('data-z'));
        }
        else
        {
            $('.section').eq(currsec - 1).css('z-index', 70000);
            $('.section').eq(currsec).css('z-index', 90000);
            $('.section').eq(currsec + 1).css('z-index', 70000);
        }
    }
}

function SimMouseMove(amount,toPage){
    if (page == undefined) return;
    if (mouse.down) {
        var left = amount || 1,
            right = -amount || -1;
        var x = (dir == 0) ? left : right;
        if (mouse.x != x) {
            //$('.delta').text(mouse.x - mouse.ox);
            var dx = x,
                change;

            delta = dx;

            if (page.hasClass('front')) {
                if (currsec < $('.section').length - 1) {
                    change = x;
                    var backchange = 180 + x;

                    var bo = -change / (180 * mult);
                    var nfo = (1 / mult) - ((-change / (180) * (1 / mult)));

                    var togo = (toPage != null) ? toPage : currsec + 1;

                    $('.section').eq(currsec).find('.back').find('.overlay').css({
                        'opacity': bo
                    });
                    $('.section').eq(togo).find('.front').find('.overlay').css({
                        'opacity': nfo
                    });

                    $('.section').eq(togo).css('display', 'block');
                    if (currsec - 1 >= 0 && currsec - 1 != togo) $('.section').eq(currsec - 1).css('display', 'none');
                    if (currsec + 1 <= $('.section').length - 1 && currsec + 1 != togo) $('.section').eq(currsec + 1).css('display', 'none');

                    $('.section').eq(togo).find('.back').css('webkit-transform', 'rotateY(' + backchange + 'deg)');

                    page.css('-webkit-transform', 'rotateY(' + change + 'deg)');
                }
            } else {
                if (currsec != 0) {
                    change = x;
                    var frontchange = -180 + x;

                    var pbo = change / (180 * mult);
                    var fo = (1 / mult) - ((change / (180) * (1 / mult)));

                    var togo = (toPage != null) ? toPage : currsec - 1;

                    $('.section').eq(currsec).find('.front').find('.overlay').css({
                        'opacity': pbo
                    });
                    $('.section').eq(togo).find('.back').find('.overlay').css({
                        'opacity': fo
                    });

                    $('.section').eq(togo).css('display', 'block');
                    if (currsec - 1 >= 0 && currsec - 1 != togo) $('.section').eq(currsec - 1).css('display', 'none');
                    if (currsec + 1 <= $('.section').length - 1 && currsec + 1 != togo) $('.section').eq(currsec + 1).css('display', 'none');

                    $('.section').eq(togo).find('.front').css('webkit-transform', 'rotateY(' + frontchange + 'deg)');

                    page.css('-webkit-transform', 'rotateY(' + change + 'deg)');
                }
            }
        }
        mouse.x = x;
    }
    delta = (dir == 0) ? 91 : -91;
}

function SimMouseUp(toPage) {
    if (page == undefined) return;
    mouse.down = false;

    if (Math.abs(delta) >= 90) {
        if (dir == 1) {
            if (delta <= -90) {
                if (currsec < $('.section').length - 1) {
                    page.css({
                        '-webkit-transition': 'all .2s linear',
                        'transition': 'all .2s linear',
                        '-webkit-transform': 'rotateY(-180deg)'
                    });
                    $('.section').eq(currsec + 1).find('.back').css({
                        '-webkit-transition': 'all .2s linear',
                        'transition': 'all .2s linear',
                        '-webkit-transform': 'rotateY(0deg)'
                    });
                    
                    // $('.section').each(function () {
                    //     $(this).css('z-index', $(this).attr('data-z'));
                    // });

                    // $('.section').eq(currsec).css('z-index', 70000);
                    // $('.section').eq(currsec + 1).css('z-index', 90000);
                    // $('.section').eq(currsec + 2).css('z-index', 70000);

                    setTimeout(function(){
                        $('.section').eq(toPage).css('z-index', 90000);
                        $('.section').eq(currsec).css('z-index', 70000);
                        currsec = toPage;
                    },100);

                    $('.section').eq(currsec).find('.back').find('.overlay').stop().animate({
                        'opacity': 1 / mult
                    }, 210, function () {
                        $(this).removeAttr('style');
                    });
                    $('.section').eq(currsec + 1).find('.front').find('.overlay').stop().animate({
                        'opacity': 0
                    }, 210, function () {
                        $(this).removeAttr('style');
                    });

                    currsec++;
                }
            }
        } else {
            if (currsec != 0) {
                if (delta >= 90) {
                    page.css({
                        '-webkit-transition': 'all .2s linear',
                        '-webkit-transform': 'rotateY(180deg)'
                    });
                    $('.section').eq(toPage).find('.front').css({
                        '-webkit-transition': 'all .2s linear',
                        '-webkit-transform': 'rotateY(0deg)'
                    });
                    
                    setTimeout(function(){
                        $('.section').eq(toPage).css('z-index', 90000);
                        $('.section').eq(currsec).css('z-index', 70000);
                        currsec = toPage;
                    },100);
                    
                    // $('.section').eq(toPage).css('z-index', 90000);

                    $('.section').eq(currsec).find('.front').find('.overlay').stop().animate({
                        'opacity': 1 / mult
                    }, 210, function () {
                        $(this).removeAttr('style');
                    });
                    
                    $('.section').eq(toPage).find('.back').find('.overlay').stop().animate({
                        'opacity': 0
                    }, 210, function () {
                        $(this).removeAttr('style');
                    });
                }
            }
        }
    }


    setTimeout(function () {
        $('.section').each(function () {
            $(this).find('.front').css('-webkit-transition', '');
            $(this).find('.back').css('-webkit-transition', '');
        });
    }, 210);

    page = undefined;
    delta = undefined;
    dir = undefined;
}