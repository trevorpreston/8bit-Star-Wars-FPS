$(function(){

  //set variables

  console.log("we gucci")
  var count = 0
  var level = 1
  var score = 0
  var health = 100
  var startRound = window.setInterval(spawn, 1500);  //second part of this function dictates enemy spawn rate

  function die(){
    $('.tie').removeClass('tie');
    $('.health').text('HEALTH: X')

  }

  function hit(){
    if(health>0){
    var $hit = $('<div>')
        .addClass('hit')
        setTimeout(function(){
          $hit.fadeOut(500, function(){
          })
      },600)
    $('body').prepend($hit)


   }
  }


  //spawn enemies

  function spawn(){
    if(health>0){
      console.log("I'm here!")
      var randomLeft = Math.floor(Math.random()*$(".container").width());
      var randomTop = Math.floor(Math.random()*$(".container").height());
      var $tie = $("<div>")         //enemy parameter
          .addClass("tie")
          .attr('id', 'tie'+count)
          .css({
            'left': randomLeft+'px',
            'top': randomTop+'px',
            'z-index': 100-count,  // new fighters spawn behind existing fighters
          })
          .animate({
          height: '400px',
          width: '500px',
          margin: '-150px',
          }, 5000 , 'linear')
          .fadeOut(100,
            function(){
            hit();
            $(this).remove();
            if(health>0){
              health -= 20;
             }
            $('.health').text('HEALTH: '+health)
            })
    }

    if(health>0){
      $(".container").append($tie);               //create enemy
    } else {
      die()
    }


    if(++count === (10*level)) {                  // start next level and reset timer after 10*level of spawns
      window.clearInterval(startRound)
      var startRound = window.setInterval(spawn, 1500)
      if(health>0){level++}
      $('.level').text("LEVEL: "+level)
    }
  }



  //set event listener for enemies

  function kill(){
    $('body').on('click', '.tie', function(e){
      score+=100;
      $('.score').text('SCORE: '+score);                    // add score
      $(this).css('background-image','url(images/boom.gif)'); //explode
      $(this).stop(true); //stop spawn animation
      var deadTie=$(this);
      setTimeout(function(){
        deadTie.remove();
    },600)
  })
  }

  kill()




});





