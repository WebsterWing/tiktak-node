module.exports = function makeEmulator(game) {
  const moves = [
    {value: 'X', square: 4, sequence_num: 0},
    {value: 'O', square: 0, sequence_num: 1},
    {value: 'X', square: 3, sequence_num: 2},
    {value: 'O', square: 5, sequence_num: 3},
    {value: 'X', square: 2, sequence_num: 4},
    {value: 'O', square: 6, sequence_num: 5},
    {value: 'X', square: 7, sequence_num: 6},
    {value: 'O', square: 1, sequence_num: 7},
    {value: 'X', square: 8, sequence_num: 8},
  ];
  var i = 0

  return () => {
    if (i < 9) {
      game.makeMove(moves[i])
      i++
    } else {
      game.reset()
      i = 0
    }
  }
}