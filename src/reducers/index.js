import * as actions from '../actions';

const initialState = {
	guesses: [],	
	feedback: "Make your guess!",
	correctAnswer: Math.round(Math.random() * 100),
	showInfoModal: false
};

export const gameReducer = (state=initialState, action) => {
	switch(action.type){
		case actions.MAKE_GUESS:
			return Object.assign({}, state, {
				feedback: getFeedback(state, action.guess),
				guesses: [...state.guesses, action.guess]
			})

		case actions.NEW_GAME:
			return Object.assign({}, state, {
				guesses: [],
				feedback: "Make your guess!",
				correctAnswer: Math.round(Math.random() * 100)
			})

		case actions.TOGGLE_INFO:
			return Object.assign({}, state, {
				showInfoModal: !state.showInfoModal
			})

		default:
			return state;
	}
}

const getFeedback = (state, guess) => {
    guess = parseInt(guess, 10);
    if (isNaN(guess)) {
        return 'Please enter a valid number';
    };

    const difference = Math.abs(guess - state.correctAnswer);

    let feedback;
    if (difference >= 50) {
        feedback = 'You\'re Ice Cold...';
    }
    else if (difference >= 30) {
        feedback = 'You\'re Cold...';
    }
    else if (difference >= 10) {
        feedback = 'You\'re Warm';
    }
    else if (difference >= 1) {
        feedback = 'You\'re Hot!';
    }
    else {
        feedback = 'You got it!';
    }

    return feedback;
}