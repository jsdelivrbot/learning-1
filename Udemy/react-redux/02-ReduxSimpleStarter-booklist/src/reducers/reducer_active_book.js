// State argument is NOT application state,
// only the state that this reducer is responsible for
export default function(state = null, action) {
    switch(action.type) {
        case 'BOOK_SELECTED':
        return action.payload;
        break;
    }
    return state
}