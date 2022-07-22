
const updatemyApp = (newValue) => ({
    type: 'my/myApp',
    payload: newValue,
})
const numUpdate = (value) => ({
    type: 'num/update',
    payload: value
})
export default { updatemyApp, numUpdate };