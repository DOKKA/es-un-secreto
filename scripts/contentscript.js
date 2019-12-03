var template = `    <div id="A4EXCDR" class="XYXYXY">
<span id="PMDSUIOMOW">Poshmark Ambassador 💯😂</span>
<fieldset>
  <legend>Share Bot</legend>
  <label><input type="checkbox" id="VSIQJQMCNC" checked="checked" /> Start at bottom</label>
  <br />
  <label>Share Interval<input type="number" id="LZTFEXHPBZ" value="120" /></label>
  <label>±<input type="number" id="DKEFAQZDGU" value="10" /> mins</label>
  <br />
  <button id="BQKNYHUMTX">Start Sharing</button>
  <br />
</fieldset>

<br />
<fieldset>
  <legend>Follow Bot</legend>
  <button id="NTWNEGDCTD">Start Following</button>
  <br /> 
  <label>Follow Interval(ms) <input type="number" id="AQQQVMEAKW"></label>
  <br />
</fieldset>
</div>`

/*



"VHQAKFHVWZ"
"IGAOAMGWRM"
"MQSSUWGERU"
"FIUBCQZBKD"
"RNWLUOVDHA"
"GADCARRELU"
"QANPVSQJSD"
*/


var audioCon=null; // browsers limit the number of concurrent audio contexts, so you better re-use'em

function beep(vol, freq, duration){
  var v=audioCon.createOscillator()
  var u=audioCon.createGain()
  v.connect(u)
  v.frequency.value=freq
  v.type="square"
  u.connect(audioCon.destination)
  u.gain.value=vol*0.01
  v.start(audioCon.currentTime)
  v.stop(audioCon.currentTime+duration*0.001)
}

function shortBeep(){
    return new Promise(function(resolve, reject){
        beep(100,900,50);
        setTimeout(function(){
            resolve();
        },100);
    });
}

function beepPattern(){
 return shortBeep().then(shortBeep).then(shortBeep).then(shortBeep).then(shortBeep);
}

$(document).ready( function() {
    $('body').append(template);
    $('#A4EXCDR').draggable();
    var btnSharing = $('#BQKNYHUMTX');
    var chkBottom = $('#VSIQJQMCNC');
    var nmbShareInterval = $('#LZTFEXHPBZ');
    var nmbShareIntRand = $('#DKEFAQZDGU');
    window.ShareBot(btnSharing,chkBottom,nmbShareInterval,nmbShareIntRand);

    var btnFollowing = $('#NTWNEGDCTD');
    window.FollowBot(btnFollowing);

    $('#PMDSUIOMOW').on('dblclick',function(){
      if(audioCon===null){
        audioCon = new AudioContext();
      }
      $('#A4EXCDR').toggleClass('XYXYXY');
    });
     
  } );