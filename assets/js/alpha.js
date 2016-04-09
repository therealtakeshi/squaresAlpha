/**
 * squaresAlpha JS
 */

var alphaSquares = {};

var score = 100000;
var scoreKeeper = setInterval(function () {
    score = score - 50;

    clearInterval(scoreKeeper);

    if (score < 0) {
        alert("YOU FAILED TO WIN!\n\nAnd now you look to the squares as benevolent masters.\nBut truly you know the blood feud will end in extermination...");
        clearInterval(scoreKeeper);
    } else {
        $(".header-span").html("Score: " + score);
    }
}, 10);

var validHealthClasses = [
    "health-full",
    "health-half",
    "health-empty"
];

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

for (var i = 0; i < 14; i++) {
    var obj = $("<div>").addClass("object").addClass("grid-item");
    var health = getRandomInt(1, 10);

    if (health < 4) {
        $(obj).addClass("health-empty");
    } else if (health >= 4 && health <= 7) {
        $(obj).addClass("health-half");
    } else {
        $(obj).addClass("health-full");
    }

    obj.attr("health", health);

    $("#game_container").append(obj);
}

alphaSquares.grid = $(".grid").packery({
  itemSelector: ".grid-item",
  gutter: 8
});

alphaSquares.grid.on("click", ".grid-item", function () {
    var health = ($(this).attr("health")) - 1;

    $("<span class=\"damage\">" + health + "!</span>").appendTo($(this)).fadeOut(350, function () {
        $(this).remove();
    });

    if (health === 0) {
        $(this).fadeOut(50, function () {
            alphaSquares.grid.packery( 'remove', $(this) ).packery('layout');
            // $(this).remove(function() {
            //     alphaSquares.packery();
            // });
        });
    } else {
        $(this).removeClass(validHealthClasses.join(" "));
        if (health < 4) {
            $(this).addClass("health-empty");
        } else if (health >= 4 && health <= 7) {
            $(this).addClass("health-half");
        } else {
            $(this).addClass("health-full");
        }
    }

    $(this).attr("health", health);

});