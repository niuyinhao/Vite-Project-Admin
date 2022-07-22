const initmyApp = {
    name: '',
    age: 1,
    sex: ''
};
const myApp = (state = initmyApp, action = '') => {
    if (action.type === 'my/myApp') {
        return {
            ...state,
            ...action.payload
        }
    }
    if (action.type === 'num/update') {
        return {
            ...state,
            ...action.payload
        }
    }
    return state;
}

export default myApp