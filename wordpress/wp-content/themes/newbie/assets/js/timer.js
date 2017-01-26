var stopwatch;
var runningstate = 0; // 1 means counter is running, 0 means counter stopped
var stoptime = 0;
var lapcounter = 0;
var lapdate = '';
var list;

//format time to min, sec, decisec
function formattedtime(unformattedtime)
{
  var decisec = Math.floor(unformattedtime/100) + '';
  var second = Math.floor(unformattedtime/1000);
  var minute = Math.floor(unformattedtime/60000);

  decisec = decisec.charAt(decisec.length - 1);
  second = second - 60 * minute + '';

  return minute + ':' + second + ':' + decisec;
}

function timecounter(starttime)
{
  currentdate = new Date();
  stopwatch = document.getElementById('stopwatch');
  list = document.getElementById("counterTableBody");
  var timediff = currentdate.getTime() - starttime;
  if(runningstate == 0)
  {
    timediff = timediff + stoptime
  }
  if(runningstate == 1)
  {
    stopwatch.value = formattedtime(timediff);
    refresh = setTimeout('timecounter(' + starttime + ');',10);
  }
  else
  {
    window.clearTimeout(refresh);
    stoptime = timediff;
  }
}

function marklap()
{
  if(runningstate == 1)
  {
    if(lapdate != '')
    {
      var lapold = lapdate.split(':');
      var lapnow = stopwatch.value.split(':');
      var lapcount = new Array();
      var x = 0;
      for(x; x < lapold.length; x++)
      {
        lapcount[x] = new Array();
        lapcount[x][0] = lapold[x]*1;
        lapcount[x][1] = lapnow[x]*1;
      }
      if(lapcount[1][1] < lapcount[1][0])
      {
        lapcount[1][1] += 60;
        lapcount[0][1] -= 1;
      }
      if(lapcount[2][1] < lapcount[2][0])
      {
        lapcount[2][1] += 10;
        lapcount[1][1] -= 1;
      }
      var mzeros = (lapcount[0][1] - lapcount[0][0]) < 10?'0':'';
      var szeros = (lapcount[1][1] - lapcount[1][0]) < 10?'0':'';

      // + min:sec:decisec (minus prev)
      var lapinterval = '\t+' + mzeros + (lapcount[0][1] - lapcount[0][0]) + ':'
          + szeros + (lapcount[1][1] - lapcount[1][0]) + ':'
          + (lapcount[2][1] - lapcount[2][0]);
    }
    lapdate = stopwatch.value;

    // append after old TR
    var lapinfo = document.createElement("TR");
    var id = "id" + (++lapcounter);
    lapinfo.setAttribute("id", id);

    // Get the <TR> element to insert a new node
    list.insertBefore(lapinfo, list.childNodes[0]); // append before old TR

    //lab nr#
    var td1 = document.createElement("TH");
    var lapnumber = document.createTextNode(+lapcounter);
    td1.appendChild(lapnumber);

    //lap starttime
    var td2 = document.createElement("TD");
    var laptime = document.createTextNode(lapdate);
    td2.appendChild(laptime);

    //lap start new contraction or lapinterval
    var td3 = document.createElement("TD");
    if (lapinterval == null){
      var lapvalue = document.createTextNode("Start nieuwe wee");

    }
    else {
      var lapvalue = document.createTextNode(lapinterval);
    }
    td3.appendChild(lapvalue);

    document.getElementById(id).appendChild(td1);
    document.getElementById(id).appendChild(td2);
    document.getElementById(id).appendChild(td3);

  }
}
function startandstop()
{
  var startandstop = document.getElementById('startandstopbutton');
  var startdate = new Date();
  var starttime = startdate.getTime();
  if(runningstate==0)
  {
    startandstop.className += "button icons icon-control-end";
    runningstate = 1;
    timecounter(starttime);
  }
  else
  {
    startandstop.className = "button icons icon-control-play";
    runningstate = 0;
    lapdate = '';
  }
}
function resetstopwatch()
{
  list.innerHTML = '';
  lapcounter = 0;
  stoptime = 0;
  lapdate = '';
  window.clearTimeout(refresh);
  if(runningstate == 1)
  {
    var resetdate = new Date();
    var resettime = resetdate.getTime();
    timecounter(resettime);
  }
  else
  {
    stopwatch.value = "0:0:0";
  }
}
