// GET HTML ELEMENTS
let backTime = document.querySelector(".display__end-time");
const displayTimeLeft = document.querySelector(".display__time-left");
var customTime = document.querySelector('input');
const enterBtn = document.querySelector(".submit__button");
const timerButton  = document.querySelectorAll(".timer__button")
// *********FUNCTIONALITY(COUNTCOWN)******
// TODO: Func to implement countdown
// timer function
let countDown;
const Timer = (secondsToCount) => {
    clearInterval(countDown)
    const countDownFunc = () => {
        //current time in countdown context
        const now =  Date.now()
        // console.log("now:",now);
         //future time in countdown  context
        const future = now + (secondsToCount * 1000); 
        // console.log("future:",future);
        //time difference in countdown context
        const timeDifference = future - now 
        // console.log("timeDifference:",timeDifference);
        // implement count down to execute after every second
        // console.log(secondsToCount)
        displayCountdown(secondsToCount);
        displayBackTimeFunc(future);
         countDown = setInterval(() => {
            const secondsLeft = Math.round((future - Date.now())/1000);
            // condition to stop countdown when it gets to 0 seconds left
            if(secondsLeft < 0){
                 clearInterval(countDown)
                 return
                // console.log("end of countdown")
            }
        // console.log(Math.abs(secondsLeft));
        displayCountdown(Math.abs(secondsLeft))
        },1000) 
    }
countDownFunc();
}
// **********DISPLAY(COUNTDOWN)*******
const displayCountdown = (secondsLeft) => {
    // minutes section
    let minutes = Math.floor(secondsLeft/60);
    // console.log("minutes:",minutes);
    // seconds section
    let seconds = secondsLeft % 60;
    // console.log("seconds:",seconds);
    // combine minutes and seconds countdown display
    const minSecDisplay = `${minutes}:${seconds < 10 ? "0": ""}${seconds}`
    // console.log("minSec:",minSecDisplay);

    displayTimeLeft.textContent = minSecDisplay;
}
// ***********HANDLE BUTTON CLICKS*************/
function handlingCountDown(){
        // console.log(this.dataset.time);
        const seconds = parseInt(this.dataset.time);
        Timer(seconds);
    }
    timerButton.forEach((button) => {
        button.addEventListener('click', handlingCountDown)
    });

// Custom time in minutes
enterBtn.addEventListener("click",(e)=> {
    e.preventDefault();
    let custMinutes = (customTime.value)*60
    // console.log("entered time:",custMinutes);
    Timer(custMinutes);
    customTime.value = ""
})
// **********DISPLAY(BACKTIME)*******
const displayBackTimeFunc = (future)=> {
    // console.log(future);   
    let time = new Date(future);
    let backHour = time.getHours();
    let backMinutes = time.getMinutes();
    // let backSeconds = time.getSeconds();
    // console.log("Be Back At:",backHour + ":"+ backMinutes)
    const displayBackTime = `Be Back At ${backHour > 12 ? backHour % 12 : backHour}:${backMinutes < 10 ? "0": ""}${backMinutes}`
    backTime.textContent = displayBackTime;
}