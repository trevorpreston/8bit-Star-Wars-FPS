$(function(){

  //assign event listeners to the start button and to the tie fighters.
  $('#start-button').one('click', startGame)
  $('body').on('click', '.tie', killTie)

  //track higher level game stats
  gameController = {
    gameWinner: 0,
    player: 1,
    level: 1,
    score: 0,
    health: 100,
    ties: 1,
    tiesKilledThisLevel: 0,
    totalTiesThisLevel: 0
  }

  //presets for level difficulties
  levelData = [
    {
      tieTotalNumber: 5,
      tiesPerSpawn: 1,
      tieSpeed: 5000
    },
    {
      tieTotalNumber: 8,
      tiesPerSpawn: 1,
      tieSpeed: 2500
    },
    {
      tieTotalNumber: 10,
      tiesPerSpawn: 2,
      tieSpeed: 5000
    },
    {
      tieTotalNumber: 12,
      tiesPerSpawn: 2,
      tieSpeed: 3000
    },
    {
      tieTotalNumber: 12,
      tiesPerSpawn: 3,
      tieSpeed: 3000
    }
  ]

  //track player one stats
  playerOne = {
    level: 0,
    score: 0
  }

  //tracj player two stats
  playerTwo = {
    level: 0,
    score: 0
  }

  //clicking the start button removes the button, renders the scoreboard, and cues the first level to start.
  function startGame(){
    $('.button-container').remove();
    createScoreboard();
    $('body').css("cursor", "url(images/crosshair.png), crosshair");
    nextLevel();
  }

  //createScoreboard generates the scoreboard.
  function createScoreboard(){
    gameController.health = 100
    var scoreboard = $('<div>').addClass('score-board')
      .append(($('<div>'))
        .addClass('status player')
        .text('PLAYER: ' + gameController.player))
      .append(($('<div>'))
        .addClass('status level')
        .text('LEVEL: ' + gameController.level))
      .append(($('<div>'))
        .addClass('status score')
        .text('SCORE: ' + gameController.score))
      .append(($('<div>'))
        .addClass('status health')
        .text('HEALTH: ' + gameController.health))
    $('.container').prepend(scoreboard)
  }


  //the nextlevel function is the spawn controller for the levels.  It checks the levelData object to get that level's spawn numbers, enemy quantity and enemy speed.
  function nextLevel(){
    var currentLevel = gameController.level;
    gameController.ties = 0;
    var totalTies = levelData[currentLevel-1].tieTotalNumber;
    var tiesPerSpawn = levelData[currentLevel-1].tiesPerSpawn;
    gameController.totalTiesThisLevel = totalTies;
      for(let i=0; i<(totalTies/tiesPerSpawn); i++){
        for(let j=0; j<tiesPerSpawn; j++){
          setTimeout(tieController,(i*1000));
        };
      };
  };



  //controls tie fighter behavior.  It calculates a random spawn location, spawns each enemy at that location, animates the enemy getting closer, and the when the animation finishes it calls the tieHitsPlayer function.
  function tieController(){
    gameController.ties++
    var randomLeft = Math.floor(Math.random()*$(".container").width());
    var randomTop = Math.floor(Math.random()*$(".container").height());
    var tieSpeed = levelData[gameController.level-1].tieSpeed
    var $tie = $("<div>")
        .addClass("tie")
        .attr('id', 'tie'+gameController.ties)
        .css({
          'left': randomLeft+'px',
          'top': randomTop+'px',
          'z-index': 100-gameController.ties,  // new fighters spawn behind existing fighters
        })
        .animate({
        height: '400px',
        width: '500px',
        margin: '-150px',
        }, tieSpeed , 'linear', function(){
          tieHitsPlayer($(this))});
    $(".container").append($tie)
  }

  //When the enemy hits the player, the player is damaged by 20 health and the game animates a temporary red border to give feedback to the player that they have been damaged.  This function also checks the ID of the tie fighter to see if it was the last tie.  If the enemy that hit the player was the last tie, and the player is still alive, then the player beat the level and the playerBeatLevel function is called.  If it was not the last tie, then the damaged feedback is rendered and the health of the player is checked to see if they died.  The level continues this way until the last tie damages the player or is destroyed by the player.


  function tieHitsPlayer(tie){
    gameController.health -= 20;
    if((gameController.health>0) && (tie.attr('id')===('tie')+gameController.totalTiesThisLevel)){
      $('.health').text('HEALTH: '+gameController.health);
      tie.remove();
      var damage = $('<div>')
          .addClass('damageFeedback')
      $('.container').prepend(damage)
      $('.damageFeedback').fadeOut(700, function(){
        $('.damageFeedback').remove()
      });
      playerBeatLevel()
    } else {
      $('.health').text('HEALTH: '+gameController.health);
      tie.remove();
      var damage = $('<div>')
          .addClass('damageFeedback')
      $('.container').prepend(damage)
      $('.damageFeedback').fadeOut(700, function(){
        $('.damageFeedback').remove();
      playerController()
      });
    }

  }


  //the killTie function is called every time an enemy is clicked and killed by the player.  It renders the kill with the explosion gif, adds 100 points to the player score, and re-renders the score.  With each kill, it checks to see if the tie that was killed is the last enemy.  If it is the last enemy, then the player has beaten the level, and the playerBeatLevel function is called.

  function killTie(){
    var deadTie=$(this);
    gameController.score+=100
    gameController.tiesKilledThisLevel++
    $('.score').text('SCORE: ' + gameController.score)
    deadTie.off('click', deadTie, killTie);
    if(deadTie.attr('id')===('tie'+gameController.totalTiesThisLevel)){
      deadTie
        .css('background-image','url(images/boom.gif)') //explode
        .stop(true); //stop spawn animation
      setTimeout(function(){
        deadTie.remove();
      },600)
      playerBeatLevel()
     } else {
      deadTie
        .css('background-image','url(images/boom.gif)') //explode
        .stop(true); //stop spawn animation
      setTimeout(function(){
        deadTie.remove();
      },600)
     }
  }


  //The playerBeatLevel function is called only when the last tie fighter dies and if the players health is >0.  If these conditions are met, then this function tells the gameController to go to the nexxt level and updates it with the number of ties to spawn for the next level.  It then renders a screen saying the level is completed, followed by another screen to ready the player for the next level.  After that screen fade out, it triggers the next level and the process repeats.

  function playerBeatLevel(){
    gameController.level++;
    gameController.totalTiesThisLevel = levelData[gameController.level-1].tieTotalNumber;
    var oldLevel = gameController.level-1
    var $leveltransition1 = $('<div>')
      .addClass('leveltransition')
      .text('Level ' + oldLevel + ' Completed!')
    var $leveltransition2 = $('<div>')
      .addClass('leveltransition')
      .text('Level ' + gameController.level)
    $('.container').append($leveltransition1);
    $('.leveltransition').delay(1000).fadeOut(700, function(){
      $('.leveltransition').remove();
      $('.container').append($leveltransition2);
      $('.leveltransition').delay(3000).fadeOut(200, function(){
        $('.leveltransition').remove();
        $('.level').text('LEVEL: ' + gameController.level)
        nextLevel();
      });
    });
  }





  function playerController(){
    determineWinner();
    if (gameController.health <= 0){
      var $gameOver = $('<div>')
        .addClass('leveltransition')
        .text('GAME OVER')
      var container = $('.container')
      $('.container').remove();
      ($gameOver).hide().appendTo($('body')).fadeIn(2000);
      if(gameController.player===1){
        playerOne.level = gameController.level;
        playerOne.score = gameController.score;
        gameController.player = 2;
        gameController.level = 1;
        gameController.score = 0;
        gameController.health = 100;
        gameController.ties = 1;
        gameController.tiesKilledThisLevel = 0;
        gameController.totalTiesThisLevel = 0;
        $('.leveltransition').delay(2000).fadeOut(700, function(){
          $('.leveltransition').remove()
           var $promptPlayerTwo = ($('<div>'))
          .addClass('leveltransition')
          .text('Player 2!')
          $('body').append($promptPlayerTwo)
          $('.leveltransition').delay(2000).fadeOut(300, function(){
            $('.leveltransition').remove();
            var $newContainer = ($('<div>'))
              .addClass('container')
            $('body').append($newContainer);
            createScoreboard();
            nextLevel();
          })
        })
      } else if (gameController.player===2){
          playerTwo.level = gameController.level;
          playerTwo.score = gameController.score;
          if (gameController.gameWinner === 1) {
            $('.leveltransition').delay(2000).fadeOut(700, function(){
              $('.leveltransition').remove()
              var winner = ($('<div>'))
                .addClass('winner-screen')
                .text('Player One Wins!')
              var playerOneScore = ($('<div>'))
                .addClass('status')
                .text('PLAYER 1: ' + playerOne.score +' POINTS')
              var playerTwoScore = ($('<div>'))
                .addClass('status')
                .text('PLAYER 2: ' + playerTwo.score +' POINTS')
            $('body').append(winner);
            $('.winner-screen').append(playerOneScore);
            $('.winner-screen').append(playerTwoScore);
          })
          } else {
            $('.leveltransition').delay(2000).fadeOut(700, function(){
              $('.leveltransition').remove()
              var winner = ($('<div>'))
                .addClass('winner-screen')
                .text('Player Two Wins!')
              var playerOneScore = ($('<div>'))
                .addClass('status')
                .text('PLAYER 1: ' + playerOne.score +' POINTS')
              var playerTwoScore = ($('<div>'))
                .addClass('status')
                .text('PLAYER 2: ' + playerTwo.score +' POINTS')
            $('body').append(winner);
            $('.winner-screen').append(playerOneScore);
            $('.winner-screen').append(playerTwoScore);
          })
          }
      }
    }
  }

  function determineWinner(){
    if(playerTwo.score > playerOne.score){
      gameController.gameWinner = 2;
    } else if(playerOne.score > playerTwo.score){
      gameController.gameWinner = 1;
    }
  }




});




