module.exports =  class TicTacToe {
  squares = Array(9).fill(null);
  moves = [];

  makeMove({value, square, sequence_num}) {
    if (sequence_num !== this.moves.length) {
      throw new Error(`Wrong sequence number. expected = ${this.moves.length}, current = ${sequence_num}`)
    } else if (this.squares[square] != null) {
      throw new Error("This tile has a move in it already")
    } else if (value !== this.getNextMoveValue()) {
      throw new Error(`It is ${this.getNextMoveValue()}'s turn to move, not ${value}'s`)
    } else if (this.calculateWinner() != null) {
      throw new  Error("The game is already over")
    }

    this.moves.push({value, square, sequence_num});
    this.squares[square] = value;
  }

  reset() {
    this.squares = Array(9).fill(null);
    this.moves = [];
  }

  getNextMoveValue() {
    if (this.moves.length == 0) {
      return 'X';
    }
    const lastValue = this.moves[this.moves.length - 1].value;
    if (lastValue == 'X') {
      return 'O';
    } else {
      return 'X';
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const squares = this.squares;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
}