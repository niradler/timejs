const Time = require('./dist/')

/*
stop watch example
count 5 seconds and then stop
*/
const stopWatch = new Time();
stopWatch.start((t)=>{
    console.log('stopWatch',t)
if (t.seconds==5) {
    stopWatch.stop()
}
})

/*
timer example
count 5 seconds and then stop
*/
const timer = new Time({seconds:5},false);
timer.start((t)=>{
    console.log('timer',t)
})

/*
clock
*/
const clock = new Time(new Date());
clock.start((t)=>{
console.log('clock',t)
})
setTimeout(() => {
    clock.stop()
}, 1000);
