
$(function(){

  //Today's goals:
  //1.  Set up levels.
  //2.  Set up player 1 v 2
  //3.  clicking tie removes click event listener from that tie

  console.log("we gucci")
  $('#start-button').one('click', startGame)
  $('body').on('click', '.tie', killTie)

  gameController = {
    player: 1,
    level: 1,
    score: 0,
    health: 100,
    ties: 0,
    tiesKilledThisLevel: 0,
    totalTiesThisLevel: 0
  }

  levelData = [
    {
      tieTotalNumber: 10,
      tiesPerSpawn: 1,
      tieSpeed: 5000
    },
    {
      tieTotalNumber: 20,
      tiesPerSpawn: 2,
      tieSpeed: 5000
    },
    {
      tieTotalNumber: 30,
      tiesPerSpawn: 3,
      tieSpeed: 5000
    }
  ]

  function didPlayerDie(){
    console.log(gameController.health)
    if (gameController.health <= 0){
      console.log("you died, bitch")
      var $gameOver = $('<div>')
        .addClass('leveltransition')
        .text('GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER GAME OVER')
      $('.container').remove();
      ($gameOver).hide().appendTo($('body')).fadeIn(5000);
    }
  }



  function playerBeatLevel(){
    gameController.level++;
    gameController.totalTiesThisLevel = levelData[gameController.level].totalTiesThisLevel;
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
        levelController();
      });
    });
  }



  function startGame(){
    console.log("let's GOOOO");
    $('.button-container').remove();
    createScoreboard();
    $('body').css("cursor", "url(images/crosshair.png), crosshair");
    levelController();
  }

  function createScoreboard(){
    var scoreboard = $('<div>').addClass('score-board')
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

  function levelController(){
    var currentLevel = gameController.level;
    gameController.ties=0;
    var totalTies = levelData[currentLevel-1].tieTotalNumber;
    var tiesPerSpawn = levelData[currentLevel-1].tiesPerSpawn;
    gameController.totalTiesThisLevel = totalTies;
      for(i=0; i<(totalTies); i++){
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
    $(".container").append($tie);
  }


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
      didPlayerDie()
      });
    }

  }

  function killTie(){
    gameController.score+=100
    gameController.tiesKilledThisLevel++
    $('.score').text('SCORE: ' + gameController.score)
    var deadTie=$(this);
    deadTie.off('click', killTie);
    if(deadTie.attr('id')===('tie'+gameController.totalTiesThisLevel)){
      console.log("that's the last tie!")
      playerBeatLevel()
      deadTie
        .css('background-image','url(images/boom.gif)') //explode
        .stop(true); //stop spawn animation
      setTimeout(function(){
        deadTie.remove();
      },600)
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




