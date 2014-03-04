// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = {

    preload: function() {

      this.game.stage.backgroundColor = '#71c5cf';
	    this.game.load.image('horse','assets/horse.png');


    },

    create: function() {
      this.horse = this.game.add.sprite(20 ,20,'horse');
      this.horse.body.gravity.y = 1000;
      body.collideWorldBounds = true;

    },

    update: function() {
		// Function called 60 times per second
    },
};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);
game.state.start('main');
