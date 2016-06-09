$(function(){

  console.log("we gucci")
  var count = 0

  $('body').delegate('div', 'click', function() {
    console.log("bang!")
    $(this).remove();
  });




  function spawn(){
    console.log("I'm here!")
    var randomLeft = Math.floor(Math.random()*$(".container").width());
    var randomTop = Math.floor(Math.random()*$(".container").height());
    $(".container")
      .append($("<div>")
        .addClass("target")
        .attr('id', 'tie'+count)
        .css({
          'left': randomLeft+'px',
          'top': randomTop+'px',
          'z-index': 100-count,  // new fighters spawn behind existing fighters
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


  var timer = setInterval(spawn, 2200);

  $('body').delegate($(".target"), 'click', destroy);

  function destroy(){
    $(this).remove();
    console.log($(this));
  }



  //  $('.target').one('click', destroy)


   // $('.target').on('click', function(e){
   //  if($(this).hasClass("container")){
   //    console.log("you clicked the container")
   //  } else if($(this).hasClass("target")) {
   //    $(this).remove()
   //    console.log("boom!")
   //  } else {
   //    console.log("nope")
   //    console.log($(this))
   //  }
  });








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

