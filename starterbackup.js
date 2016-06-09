$(function(){

  console.log("we gucci")
  var count = 0

  function spawn(){
    console.log("I'm here!")
    var randomLeft = Math.floor(Math.random()*$(".container").width());
    var randomTop = Math.floor(Math.random()*$(".container").height());
    $(".container")
      .append($("<div>")
        .addClass("target")
        .css({
          'left': randomLeft+'px',
          'top': randomTop+'px',
          'z-index': -count,  // new fighters spawn behind existing fighters
        })
        .animate({
        height: '400px',
        width: '400px',
        margin: '-150px',
      }, 15000 , 'linear')
      );

    if(++count === 10) {                  // kill timer after 10 spawns
      window.clearInterval(timer);
    }
  }

  // function eliminate() {
  //   console.log("boom")
  //   $(this).replaceWith(("img").attr('src', './images/boom.gif'))
  // }

  // $(".target").on('click',eliminate)








  var timer = setInterval(spawn, 2200);




})



// //Gameplan:
// circle elements:
//   are translucent
//   grow over time
//   spawn randomly
//   are worth more the smaller they are

// on click:
//   circle elements disappear
//   score is logged and displayed

// score board:
//   contains score
//   time

