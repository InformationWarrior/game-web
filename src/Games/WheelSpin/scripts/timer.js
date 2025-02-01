// timer.js
export default class Timer {
    constructor(duration, onTick, onComplete) {
      this.duration = duration; // Total time in seconds
      this.remainingTime = duration; // Remaining time in seconds
      this.onTick = onTick; // Callback for each tick
      this.onComplete = onComplete; // Callback when the timer completes
      this.interval = null;
    }
  
    start() {
      if (this.interval) return; // Prevent multiple intervals
  
      this.interval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
          this.onTick(this.formatTime(this.remainingTime)); // Update UI
        } else {
          this.stop();
          if (this.onComplete) this.onComplete(); // Timer is complete
        }
      }, 1000);
    }
  
    stop() {
      clearInterval(this.interval);
      this.interval = null;
    }
  
    reset() {
      this.stop();
      this.remainingTime = this.duration;
      this.onTick(this.formatTime(this.remainingTime)); // Reset UI
    }
  
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
      const secs = (seconds % 60).toString().padStart(2, "0");
      return `${minutes}:${secs}`;
    }
  }
  