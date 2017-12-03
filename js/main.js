$(document).ready(function() {
  var $authorQuote = $("#quote");
  var $authorPhoto = $("#author-photo");
  var $authorName = $("#author-name");
  var quoteArr = [
    ['collier.jpg','Success is the sum of small efforts, repeated day in and day out.','Robert J. Collier'],
    ['wiesel.jpg','Just as man cannot live without dreams, he cannot live without hope. If dreams reflect the past, hope summons the future.', 'Elie Wiesel'],
    ['garyvee.jpeg','Being Yourself Always Plays Out.', 'Garyvee'],
    ['zappa.jpg','Art is making something out of nothing and selling it.', 'Frank Zappa'],
    ['france.jpg','If the path be beautiful, let us not ask where it leads.', 'Anatole France'],
    ['hubbard.jpg','Life in abundance comes only through great love.', 'Elbert Hubbard'],
    ['garyvee.jpeg','Excuses are the currency that allow you to not act.', 'Garyvee'],
    ['einstein.jpg','Imagination is more important than knowledge.', 'Albert Einstein']
  ];

  $.ajax({
    url: 'data/data.json',
    type: 'GET',
    dataType: 'json',
    success(response) {

      $('#generate-btn').click(function() {
        var name, photo;
        var eachData = [];
        if ($.isEmptyObject(response)) {
          $authorQuote.html('Sorry, No More Quotes.<br>');
          $authorName.html('Please Reload to View Again.');
          $authorPhoto.css('background-image','url(data/brain.jpg)');
        }

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

      $quoteBtn.on('click',function() {
        var random = Math.floor(Math.random()*quoteArr.length);
        var photo = quoteArr[random][0];
        $authorPhoto.css('background-image','url(data/' + photo + ')');
        $authorQuote.html(quoteArr[random][1]);
        $authorName.html(quoteArr[random][2]);
        quoteArr.splice(random,1);

        if (quoteArr.length < 1) {

          $authorQuote.html('Sorry, No More Quotes.<br>');
          $authorName.html('Please Reload to View Again.');
          $authorPhoto.css('background-image','url(data/brain.jpg)');

        }
      });
    }
  });





});
