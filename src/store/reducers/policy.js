const initPolicy = {
    agentCode: '',
    bankName: ''
}
const policy = (state = initPolicy, action = '') => {
    if (action.type === 'policy/update') {
        return {
            ...state,
            ...action.payload
        }
    }
    return state
}

export default policy