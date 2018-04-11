class FSM {
  /**
   * Creates new FSM instance.
   * @param config
   */
  constructor(config) {
    if (!config) {
      throw new Error('Configuration error');
    }
    this.currentState = config.initial;// normal
    this.states = config.states;// normal, busy, hungry, sleeping
    this.history = [];
    this.undoHistory = [];
  }

  /**
   * Returns active state.
   * @returns {String}
   */
  getState() {
    return this.currentState;
  }

  /**
   * Goes to specified state.
   * @param state
   */
  changeState(state) {
    if (state in this.states) {
      this.history.push(this.currentState);
      this.currentState = state;
    } else {
      throw new Error('Wrong state');
    }
  }

  /**
   * Changes state according to event transition rules.
   * @param event
   */
  trigger(event) {
    const currentTransitions = this.states[this.currentState].transitions;
    if (event in currentTransitions) {
      const newState = currentTransitions[event];
      this.history.push(this.currentState);
      this.currentState = newState;
    } else {
      throw new Error('Wrong event');
    }
  }

  /**
   * Resets FSM state to initial.
   */
  reset() {
    this.currentState = 'normal';
  }

  /**
   * Returns an array of states for which there are specified event transition rules.
   * Returns all states if argument is undefined.
   * @param event
   * @returns {Array}
   */
  getStates(event) {
    let states = [];
    const allStates = Object.keys(this.states);
    if (!event) {
      return allStates;
    }
    allStates.map((state) => {
      if (event in this.states[state].transitions) {
        states.push(state);
      }
    });
    return states;
  }

  /**
   * Goes back to previous state.
   * Returns false if undo is not available.
   * @returns {Boolean}
   */
  undo() {
    if (this.history.length === 0 || this.currentState === this.history[0]) {
      return false;
    }
    this.undoHistory.push(this.currentState);// save currentState to undo array
    this.currentState = this.history.pop();// change current State to undo
    return true;
  }

  /**
   * Goes redo to state.
   * Returns false if redo is not available.
   * @returns {Boolean}
   */
  redo() {
    const undoHistoryLength = this.undoHistory.length;
    if (this.undoHistory.length === 0 || this.currentState === this.undoHistory[0]) {
      return false;
    }
    this.currentState = this.undoHistory.pop();
    return true;
  }

  /**
   * Clears transition history
   */
  clearHistory() {
    this.currentState = this.history[0];
    this.history = [];
  }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
