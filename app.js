new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    gameTurnHistory: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack: function() {
      const damage = this.calculateDamage(3, 10);

      this.monsterHealth -= damage;
      this.gameTurnHistory.unshift({
        isPlayer: true,
        text: `Player hits monster for ${damage}`
      });

      if (this.checkWin()) {
        return;
      };

      this.monsterAttack();
    },
    specialAttack: function() {
      const damage = this.calculateDamage(10, 20);

      this.monsterHealth -= damage;

      this.gameTurnHistory.unshift({
        isPlayer: true,
        text: `Player critically hits monster for ${damage}`
      });

      if (this.checkWin()) {
        return;
      };

      this.monsterAttack();
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }

      this.gameTurnHistory.unshift({
        isPlayer: true,
        text: `Player heals for 10`
      });

      this.monsterAttack();
    },
    forfeit: function() {
      this.gameIsRunning = false;
      this.gameTurnHistory = [];
    },
    monsterAttack: function() {
      const damage = this.calculateDamage(2, 12);

      this.playerHealth -= damage;
      this.gameTurnHistory.unshift({
        isPlayer: false,
        text: `Monster hits player for ${damage}`
      });
      this.checkWin();
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! Play again?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return;
      } else if (this.playerHealth <= 0) {
          if (confirm('You lost! Play again?')) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
          return true;
      }
      return false;
    }
  }
})
