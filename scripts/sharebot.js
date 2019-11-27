window.ShareBot = function(btnSharing,chkBottom,nmbShareInterval){
    var firstItem = $('div.col-x12.col-l6.col-s8','#tiles-con').first();
    var isSharing = false;
    var currentItem = null;
    window.STOP_ALL_SCRIPTS=false;
    window.START_AT_BOTTOM=false;

    function getShareInterval(){
        return parseInt(nmbShareInterval.val());
    }
    
    function getLastItem(){
        return $('div.col-x12.col-l6.col-s8','#tiles-con').last();
    }
    
    function isBottom(){
       return chkBottom.prop('checked');
    }
    
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


    function goDownwardsFN(elem){
        elem[0].scrollIntoView();
        var nextItem = elem.next();
        setTimeout(function(){
            if(nextItem.length > 0){
                goDownwardsFN(nextItem);
            } else{
                window.START_AT_BOTTOM = true;
                goUpwardsFN(elem);
            }
        },1000);
    }
    
    function goUpwardsFN(elem){
        elem[0].scrollIntoView();
        var prevItem = elem.prev();
        if(prevItem.length > 0){
            if(isSharing === false || window.STOP_ALL_SCRIPTS || isCaptcha()){
                console.log('stopping...')
                currentItem = elem;
                isSharing = false;
            } else {
                shareFN(elem).then(function(){
                    goUpwardsFN(prevItem);
                });
            }
        } else {
            console.log('done sharing')
        }
    }
    
    function toMyFollowers(){
        return Promise.delay(1000).then(function(){
            var popup = $('#share-popup');
            var ul = $('ul.internal-shares',popup);
            var link = $('li a.pm-followers-share-link',ul);
            link[0].click();
            return {};
        });
    }
    
    function clickShare(elem){
        return Promise.delay(1000).then(function(){
            var ul = $('ul.listing-actions-con',elem);
            var link = $('li a.share',ul);
            link[0].click();
            return elem;
        });
    }
    
    
    function shareFN(elem){
        return Promise.delay(1000).then(function(){
            var isNotForSale = $('.not-for-sale-tag',elem).length > 0;
            var isSold = $('.inventory-tag.sold-tag',elem).length > 0;
            if(isNotForSale || isSold){
                return elem;
            } else {
                return clickShare(elem).then(toMyFollowers)
            }
        });
    }


    btnSharing.click(function(){
        if(isSharing){
            isSharing = false;
            btnSharing.html('Start Sharing');
        } else {
            console.log('started Sharing!');
            isSharing = true;
            console.log('started share at '+ moment().format('dddd MMMM, D h:mmA'));
            btnSharing.html('Stop Sharing');
            if(window.START_AT_BOTTOM ||  isBottom()){
                goUpwardsFN(currentItem || getLastItem());
                setInterval(function(){
                    console.log('doing the share');
                    console.log('started share at '+ moment().format('dddd MMMM, D h:mmA'));
                    isSharing = true;
                    goUpwardsFN(getLastItem());
                },1000*60*getShareInterval());
            } else {
                goDownwardsFN(firstItem);
            }
        }
    });
}
