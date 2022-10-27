const updatePolicy = (payload) => ({
    type: 'policy/update',
    payload: payload
})

const addInsureds = (payload) => ({
    type: 'policy/addInsure',
    payload: payload
})
export default { updatePolicy, addInsureds }