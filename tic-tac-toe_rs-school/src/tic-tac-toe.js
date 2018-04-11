class TicTacToe {
    constructor(player = 1) {
      this.player = player;
      this.storage = [];
    }

    getCurrentPlayerSymbol() {
      if (this.player === 1) {
        return 'x';
      }
      return 'o';
    }

    nextTurn(rowIndex, columnIndex) {
      const currentSymbol = this.getCurrentPlayerSymbol();
      const currentCoordinates = { rowIndex, columnIndex, currentSymbol };
      let isVisited = false;
      if (this.storage) {
        this.storage.map((object) => {
          if (object.rowIndex === currentCoordinates.rowIndex
            && object.columnIndex === currentCoordinates.columnIndex){
            isVisited = true;
          }
        })
      }
      if(isVisited) {
        return;
      }
      this.storage.push(currentCoordinates);
      this.player = (this.player === 1) ? 2 : 1;
      return this;
    }

    isFinished() {
      if (this.getWinner() || this.noMoreTurns()) {
        return true;
      } else {
        return false;
      }
    }

    getWinner() {
      const point00 = this.getFieldValue(0,0);
      const point01 = this.getFieldValue(0,1);
      const point02 = this.getFieldValue(0,2);
      const point10 = this.getFieldValue(1,0);
      const point11 = this.getFieldValue(1,1);
      const point12 = this.getFieldValue(1,2);
      const point20 = this.getFieldValue(2,0);
      const point21 = this.getFieldValue(2,1);
      const point22 = this.getFieldValue(2,2);
      //horisontal
      if (point00 === point01 && point00 === point02 && point00 !== null) {
        return point00;
      }

      if (point10 === point11 && point10 === point12 && point10 !== null) {
        return point10;
      }

      if (point20 === point21 && point20 === point22 && point20 !== null) {
        return point20;
      }
      //vertical
      if (point00 === point10 && point00 === point20 && point00 !== null) {
        return point00;
      }

      if (point01 === point11 && point01 === point21 && point00 !== null) {
        return point01;
      }

      if (point02 === point12 && point02 === point22 && point02 !== null) {
        return point02;
      }
      //diagonal
      if (point00 === point11 && point00 === point22 && point00 !== null) {
        return point00;
      }

      if (point20 === point11 && point20 === point02 && point20 !== null) {
        return point20;
      }

      return null;
    }

    noMoreTurns() {
      return this.storage.length === 9 ? true : false;
    }

    isDraw() {
      if (!this.isFinished() || this.getWinner()) {
        return false;
      }
      return true;
    }

    getFieldValue(rowIndex, colIndex) {
      let fieldValue = null;
      if (this.storage) {
        this.storage.map((object) => {
          if (object.rowIndex === rowIndex && object.columnIndex === colIndex) {
            fieldValue = object.currentSymbol;
            return;
          }
        });
      }
      return fieldValue;
    }
}

module.exports = TicTacToe;
