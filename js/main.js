$(document).ready(function() {
  var $authorQuote = $("#quote");
  var $authorPhoto = $("#author-photo");
  var $authorName = $("#author-name");
  var quoteArr = [
    ['Success is the sum of small efforts, repeated day in and day out.','Robert J. Collier'],
    ['Just as man cannot live without dreams, he cannot live without hope. If dreams reflect the past, hope summons the future.', 'Elie Wiesel'],
    ['Being Yourself Always Plays Out.', 'Garyvee'],
    ['If you want a thing done well, do it yourself.', 'Napoleon Bonaparte'],
    ['Art is making something out of nothing and selling it.', 'Frank Zappa'],
    ['If the path be beautiful, let us not ask where it leads.', 'Anatole France'],
    ['Life in abundance comes only through great love.', 'Elbert Hubbard'],
    ['Imagination is more important than knowledge.', 'Albert Einstein']
  ];

  $.ajax({
    url: 'data/data.json',
    type: 'GET',
    dataType: 'json',
    success(response) {

      $('#generate-btn').click(function() {
        var name, photo;
        var eachData = [];

        for (name in response) {
          eachData = response[name];
          photo = eachData[0];
          quote = eachData[1];
          $authorQuote.html(quote);
          $authorName.html(name);
          $authorPhoto.css('background-image','url(data/' + photo + ')');
          delete response[name];
          break;
        }
      });

    },
    error(jqXHR,status,errorThrown) {

      var $quoteBtn = $('#generate-btn');
      $authorPhoto.css('background-image','url(data/brain.jpg)');

      $quoteBtn.on('click',function() {
        var rndm = Math.floor(Math.random()*quoteArr.length);
        $authorQuote.html(quoteArr[rndm][0]);
        $authorName.html(quoteArr[rndm][1]);
        quoteArr.splice(rndm,1);

        if (quoteArr.length < 1) {

          $authorQuote.html('Sorry, No More Quotes.<br>');
          $authorName.html('Please Reload to View Again.');

        }
      });
    }
  });





});
