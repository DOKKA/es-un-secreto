var template = `    <div id="A4EXCDR">
<span id="PMDSUIOMOW">Poshmark Ambassador 💯😂</span>
<fieldset>
  <legend>Share Bot</legend>
  <button id="BQKNYHUMTX">Start Sharing</button>
  <br /> 
  <label><input type="checkbox" id="VSIQJQMCNC"> Start at bottom</label>
  <br />
  <label>Share Interval(mins) <input type="number" id="LZTFEXHPBZ" value="120"></label>
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
"DKEFAQZDGU"
"RAJCBUEQVM"
"JXSWBJXTLL"
"OAHMGCYHBL"
"VHQAKFHVWZ"
"IGAOAMGWRM"
"MQSSUWGERU"
"FIUBCQZBKD"
"RNWLUOVDHA"
"GADCARRELU"
"QANPVSQJSD"
*/

$(document).ready( function() {
    $('body').append(template);
    $('#A4EXCDR').draggable();
    var btnSharing = $('#BQKNYHUMTX');
    var chkBottom = $('#VSIQJQMCNC');
    var nmbShareInterval = $('#LZTFEXHPBZ');
    window.ShareBot(btnSharing,chkBottom,nmbShareInterval);

    var btnFollowing = $('#NTWNEGDCTD');
    window.FollowBot(btnFollowing);

    $('#PMDSUIOMOW').on('dblclick',function(){
      $('#A4EXCDR').toggleClass('XYXYXY');
    });
     
  } );