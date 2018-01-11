class Time {
    constructor(time,type=true) {
        this.type = type;
        if (typeof(time)=="object") {
            this.seconds = type?time.getSeconds():time.seconds?time.seconds:0;
            this.minutes = type?time.getMinutes():time.minutes?time.minutes:0;
            this.hours = type?time.getHours():time.hours?time.hours:0;
        }else{
            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;
        }
        
        this.interval = null;
    }
    reset(time,type=true){
        if (typeof(time)=="object") {
            this.seconds = type?time.getSeconds():time.seconds?time.seconds:0;
            this.minutes = type?time.getMinutes():time.minutes?time.minutes:0;
            this.hours = type?time.getHours():time.hours?time.hours:0;
        }else{
            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;
        }
    }
    get(){
        return {hours: this.hours, minutes: this.minutes, seconds: this.seconds}
    }
    start(fn) {
        const d=()=>{
            this.seconds++;
            if (this.seconds == 60) {
                this.seconds = 0;
                this.minutes++;
            }
            if (this.minutes == 60) {
                this.minutes = 0;
                this.hours++;
            }
            if (typeof(fn) == 'function') {
                fn({hours: this.hours, minutes: this.minutes, seconds: this.seconds})
            }
        }
        const a=()=>{
            if (typeof(fn) == 'function') {
                fn({hours: this.hours, minutes: this.minutes, seconds: this.seconds})
            }
            this.seconds--;
            if (this.seconds == -1) {
                this.seconds = 59;
                this.minutes--;
            }
            if (this.minutes == -1) {
                this.minutes = 59;
                this.hours--;
            }
            if (this.hours==-1) {
                clearInterval(this.interval);
                return; 
            }
            
        }
        this.interval = setInterval(this.type?d:a, 1000)
    }
    stop() {
        if (this.interval != null) {
            clearInterval(this.interval);
            return true;
        }
        return false;
    }
}

if (typeof exports === 'undefined') {
    window.Time=Time;
} else {
    module.exports= Time;
}
     

