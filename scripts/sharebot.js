window.ShareBot = function(btnSharing,chkBottom,nmbShareInterval,nmbShareIntRand){
    var firstItem = $('div.col-x12.col-l6.col-s8','#tiles-con').first();
    var isSharing = false;
    var currentItem = null;
    
    function randoMin(){
        return Math.floor(Math.random()*getShareIntRand())+1;
    }

    function randoSec(){
        return Math.floor(Math.random()*1000)+2000;
    }

    function timestr(theTime){
        if(theTime){
            return theTime.format('dddd MMMM, D h:mmA');
        }else{
            return moment().format('dddd MMMM, D h:mmA');
        }
        
    }

    function getShareIntRand(){
        return parseInt(nmbShareIntRand.val());
    }
    
    
    function getShareInterval(){
        return parseInt(nmbShareInterval.val());
    }
    
    function getLastItem(){
        var last = $('div.col-x12.col-l6.col-s8','.m--t--1').last();
        return last;
    }
    
    function startAtBottom(){
       return chkBottom.prop('checked');
    }
    
    function isCaptcha(){
        var captchaPop = $('#captcha-popup');
        if(captchaPop.length > 0){
            var captchaClasses = captchaPop.attr('class').split(/\s+/);
            if(captchaClasses.indexOf('in') !== -1){
                console.log('captcha detected!!!!!!');
                beepPattern();
                return true;
            }
        }
        return false;
    }



    function setStopSharing(elem){
        isSharing = false;
        console.log('Stopped sharing at '+ timestr());
        btnSharing.html('Start Sharing');
        if(elem){
            currentItem = elem;
        } else {
            currentItem = null;
        }
    }

    function setStartSharing(){
        isSharing = true;
        btnSharing.html('Stop Sharing');
        console.log('Started sharing at '+ timestr());
        if(currentItem !== null){
            goUpwardsFN(currentItem);
        } else {
            if(startAtBottom()){
                goUpwardsFN(getLastItem());
            } else {
                goDownwardsFN(firstItem);
            }
        }
    }

    function startSharingAfterTimeout(){
        var shareInterval = getShareInterval()+randoMin();
        var nextShareTime = moment().add(shareInterval,'minutes');
        console.log('next share will start at '+ timestr(nextShareTime));
        setTimeout(function(){
            setStartSharing();
        },1000*60*shareInterval);
    }

    function goDownwardsFN(elem){
        elem[0].scrollIntoView();
        var nextItem = elem.next();
        setTimeout(function(){
            if(nextItem.length > 0){
                goDownwardsFN(nextItem);
            } else{
                goUpwardsFN(elem);
            }
        },1000);
    }

    function goUpwardsFN(elem){
        elem[0].scrollIntoView();
        var prevItem = elem.prev();
        //there is a captcha or you stopped the share
        if(isSharing === false || isCaptcha()){
            setStopSharing(elem);
        } else {
            if(prevItem.length > 0){
                shareFN(elem)
                .then(function(){
                    goUpwardsFN(prevItem);
                });
            } else {
                shareFN(elem)
                .then(function(){
                    setStopSharing();
                    console.log('Successfully finished sharing at '+ timestr());
                    startSharingAfterTimeout();
                });
            }
        }
    }

    function toMyFollowers(){
        return Promise.delay(randoSec()).then(function(){
            var popup = $('.share-modal');
            var ul = $('ul.internal-shares',popup);
            var link = $('li a.internal-share__link',ul);
            link[0].click();
            return {};
        });
    }
    
    function clickShare(elem){
        return Promise.delay(randoSec()).then(function(){
            var ul = $('.social-action-bar',elem);
            var link = $('.social-action-bar__share',ul);
            link[0].click();
            return elem;
        });
    }
    
    
    function shareFN(elem){
        return Promise.delay(1000).then(function(){
            var isNotForSale = $('.not-for-sale-tag',elem).length > 0;
            var isSold = $('.sold-tag',elem).length > 0;
            var title = $('a.tile__title',elem).html();
            if(isNotForSale || isSold){
                return elem;
            } else {
                //console.log('about to share ' + title);
                return clickShare(elem).then(toMyFollowers)
            }
        });
    }



    btnSharing.click(function(){
        if(isSharing){
            setStopSharing();
        } else {
            setStartSharing();
        }
    });


}
