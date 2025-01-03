export class ScoreManager {
    constructor() {
        this.credits = 1000; // Initial credits
        this.betArray = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 150, 200];
        this.currentBet = this.betArray[0]; // Default bet is the first in the array
        this.multiplier = 1; // Default multiplier
    }

    // Method to set the bet
    setBet(bet) {
        if (this.betArray.includes(bet)) {
            this.currentBet = bet;
            console.log(`Current bet set to: ${this.currentBet}`);
        } else {
            console.log("Invalid bet amount. Please choose a valid bet from the bet array.");
        }
    }

    // Method to set the multiplier
    setMultiplier(value) {
        if (value > 0) {
            this.multiplier = value;
            console.log(`Multiplier set to: ${this.multiplier}`);
        } else {
            console.log("Multiplier must be greater than 0.");
        }
    }

    // Calculate total win
    calculateTotalWin(multiplier) {
        const totalWin = this.currentBet * multiplier;
        console.log(`You won ${totalWin} points!`);
        return totalWin;
    }

    // Place a bet
    placeBet() {
        if (this.credits >= this.currentBet) {
            this.credits -= this.currentBet;
            console.log(`Bet placed: ${this.currentBet}. Remaining credits: ${this.credits}`);
        } else {
            console.log("Not enough credits to place the bet.");
        }
    }
}
