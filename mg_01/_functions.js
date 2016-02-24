/*======================*/
/*** HELPER FUNCTIONS ***/

var getRandom = function(min, max) {
  var rand = Math.random() * (max - min) + min;
  if (Number.isInteger(min) && Number.isInteger(max))
    return Math.floor(rand);
  else
    return rand;
}