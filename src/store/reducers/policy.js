// import dayjs from 'dayjs'
const insured = {
    name: '测试',
    age: '18',
    sex: '男',
    time: '',
    seqond: 1
}

let initPolicy = {
    agentCode: '',
    bankName: '',
    insureds: [insured]
}


const policy = (state = initPolicy, action = '') => {
    // console.log(action);
    if (action.type === 'policy/update') {
        return {
            ...state,
            ...action.payload
        }
    }
    if (action.type === 'policy/addInsure') {
        const newValue = state;
        newValue.insureds.push({
            ...insured,
            seqond: action.payload.seqond
        })
        console.log(action);
        // console.log(newValue);
        return {
            ...newValue,
            // ...action.payload
        }
    }
    return state
}

export default policy