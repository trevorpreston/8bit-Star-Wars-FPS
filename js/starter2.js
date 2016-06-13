$(function(){

  //Today's goals:
  //1.  Set up levels.
  //2.  Set up player 1 v 2
  //3.  clicking tie removes click event listener from that tie

  console.log("we gucci")
  $('#start-button').one('click', startGame)
  $('body').on('click', '.tie', killTie)

  gameController = {
    gameWinner: 2,
    player: 1,
    level: 1,
    score: 0,
    health: 100,
    ties: 1,
    tiesKilledThisLevel: 0,
    totalTiesThisLevel: 0
  }

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

  playerOne = {
    level: 0,
    score: 0
  }

  playerTwo = {
    level: 0,
    score: 0
  }






  function playerController(){
    determineWinner();
    console.log(gameController.gameWinner)
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
          } else if (gameController.gameWinner === 2){
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





  function playerBeatLevel(){
    gameController.level++;
    gameController.totalTiesThisLevel = levelData[gameController.level-1].tieTotalNumber;
    var oldLevel = gameController.level-1
    console.log("level complete!")
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



  function startGame(){
    console.log("let's GOOOO");
    $('.button-container').remove();
    createScoreboard();
    $('body').css("cursor", "url(images/crosshair.png), crosshair");
    nextLevel();
  }

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

  function nextLevel(){
    var currentLevel = gameController.level;
    gameController.ties = 0;
    var totalTies = levelData[currentLevel-1].tieTotalNumber;
    var tiesPerSpawn = levelData[currentLevel-1].tiesPerSpawn;
    gameController.totalTiesThisLevel = totalTies;
      for(i=0; i<(totalTies/tiesPerSpawn); i++){
        for(j=0; j<tiesPerSpawn; j++){
          setTimeout(tieController,(i*1000));
        };
      };
  };

    //read level
    //spawn ties
    //end level on last Tie




  function tieController(){
    console.log("I'm here!")
    gameController.ties++
    var randomLeft = Math.floor(Math.random()*$(".container").width());
    var randomTop = Math.floor(Math.random()*$(".container").height());
    var tieSpeed = levelData[gameController.level-1].tieSpeed
    var $tie = $("<div>")         //enemy parameter
        .addClass("tie")
        .attr('id', 'tie'+gameController.ties)
        .css({
          'left': randomLeft+'px',
          'top': randomTop+'px',
          'z-index': 100-gameController.ties,  // new fighters spawn behind existing fighters
        })
        .animate({
        height: '400px',    // make as separate css class to animate object into
        width: '500px',
        margin: '-150px',
        }, tieSpeed , 'linear', function(){
          tieHitsPlayer($(this))})
    $(".container").append($tie)
    console.log($tie.attr('id'));
  }


  function tieHitsPlayer(tie){
    console.log(tie.attr('id'))
    gameController.health -= 50;
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

  function killTie(){
    var deadTie=$(this);
    gameController.score+=100
    gameController.tiesKilledThisLevel++
    $('.score').text('SCORE: ' + gameController.score)
    console.log(deadTie.attr('id'))
    deadTie.off('click', deadTie, killTie);
    if(deadTie.attr('id')===('tie'+gameController.totalTiesThisLevel)){
      console.log("that's the last tie!")
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




});




