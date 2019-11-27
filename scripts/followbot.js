window.FollowBot = function(btnFollowing){

    var isFollowing = false;
    window.STOP_ALL_SCRIPTS=false;
    var lastItem = null;
    var firstItem = $('div.item','div.follower-following-list').first();
    
    function isCaptcha(){
        var captchaPop = $('#captcha-popup');
        if(captchaPop.length > 0){
            var captchaClasses = captchaPop.attr('class').split(/\s+/);
            if(captchaClasses.indexOf('in') !== -1){
                console.log('captcha detected!!!!!!');
                return true;
            }
        }
        return false;
    }
    
    function doFollow(elem){
        var zzz = $('div.d-fl.jc-sb',elem);
        var followLink = $('#follow-user',zzz);
        var randomTimePart = Math.floor(Math.random()*500);
        var didFollow = false;
        if(followLink.length > 0){
            var arrClasses = followLink.attr('class').split(/\s+/);
            if(arrClasses.indexOf('f-hide') === -1){
                followLink[0].click();
                didFollow = true;
            }
        }
        if(didFollow){
            return Promise.delay(1000+randomTimePart).then(function(){
                return elem;
            });
        } else {
            return Promise.delay(0).then(function(){
                return elem;
            });
        }
    }
    
    function followFN(elem){
        if(isFollowing===false || (!!window.STOP_ALL_SCRIPTS) || isCaptcha()){
            isFollowing = false;
            btnFollowing.html('Start Following');
            lastItem = elem;
        } else {
            animateToElem(elem)
            .then(doFollow)
            .then(function(){
                var nextItem = elem.next();
                if(nextItem.length === 1){
                    followFN(nextItem)
                } else {
                    console.log('DONE!!!!');
                }
            });
        }
    }
    
    function animateToElem(elem){
        return new Promise(function(resolve, reject){
            $('html,body').animate({
                scrollTop: $(elem).offset().top-100
            },{
                duration: 500,
                complete: function(){
                    resolve(elem);
                }
             });
        });
    }

    btnFollowing.click(function(){
        if(isFollowing){
            isFollowing = false;
            btnFollowing.html('Start Following');
        } else {
            console.log('started Following!');
            isFollowing = true;
            followFN(lastItem || firstItem);
            btnFollowing.html('Stop Following');
        }

    });
}
