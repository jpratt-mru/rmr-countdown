
// ****  Time Zone Count Down Javascript  **** //
/*
Visit http://rainbow.arch.scriptmania.com/scripts/
 for this script and many more
*/

////////// CONFIGURE THE COUNTDOWN SCRIPT HERE //////////////////

var month = 3;     //  '*' for next month, '0' for this month or 1 through 12 for the month 
var day = '26';        //  Offset for day of month day or + day  
var hour = '14';        //  0 through 23 for the hours of the day
var tz = '-6';          //  Offset for your timezone in hours from UTC
var lab = 'tzcd';      //  The id of the page entry where the timezone countdown is to show

function start() {displayTZCountDown(setTZCountDown(month,day,hour,tz),lab);}

    // **    The start function can be changed if required   **
window.onload = start;

////////// DO NOT EDIT PAST THIS LINE //////////////////

function setTZCountDown(month,day,hour,tz) 
{
    var toDate = new Date();
    
    
    if (month == '*') {
        toDate.setMonth(toDate.getMonth() + 1);
    }
    else if (month > 0) {
    if (month <= toDate.getMonth()) {
        
            toDate.setFullYear(toDate.getFullYear() + 1);
        } else {
            toDate.setMonth(month - 1);
        }      
    }
    if (day.substring(0, 1) == '+') {
        var day1 = parseInt(day.substring(1));
        toDate.setDate(toDate.getDate()+day1);
    } else {
        toDate.setDate(day);
    }

    toDate.setHours(hour);
    toDate.setMinutes(0-(tz*60));
    toDate.setSeconds(0);

    var fromDate = new Date();
    fromDate.setMinutes(fromDate.getMinutes() + fromDate.getTimezoneOffset());
    var diffDate = new Date(0);
    diffDate.setMilliseconds(toDate - fromDate);

    return Math.floor(diffDate.valueOf()/1000);
}

function displayTZCountDown(countdown,tzcd) 
{
if (countdown < 0) document.getElementById(tzcd).innerHTML = "Sorry, you are too late."; 
else {var secs = countdown % 60; 
if (secs < 10) secs = '0'+secs;
var countdown1 = (countdown - secs) / 60;
var mins = countdown1 % 60; 
if (mins < 10) mins = '0'+mins;
countdown1 = (countdown1 - mins) / 60;
var hours = countdown1 % 24;
var days = (countdown1 - hours) / 24;
document.getElementById(tzcd).innerHTML = '<span id="days">' + days + ' day' + (days == 1 ? '' : 's') + '</span> <br /><span id="time"> + ' +hours+ 'h : ' +mins+ 'm : '+secs+'s</span>';
setTimeout('displayTZCountDown('+(countdown-1)+',\''+tzcd+'\');',999);
}
}
