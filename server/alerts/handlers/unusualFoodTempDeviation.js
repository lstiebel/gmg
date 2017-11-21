const alertTypes = require('../../constants/alertTypes')
const path = require('path')
let desiredTempPrevReached

module.exports.name = path.basename(__filename)

module.exports.handle = (status) => {
    const delta = Math.abs(status.desiredFoodTemp - status.currentFoodTemp)
    if (!desiredTempPrevReached) {
        desiredTempPrevReached = delta <= 1
    }

    return {
        triggered: desiredTempPrevReached && delta > 5,
        createAlert() {
            return {
                type: alertTypes.unusualFoodTempDeviation,
                name: 'Unusual Food Temperature Deviation',
                reason: 'An unusual change in the food temperature was detected!'
            }
        }
    }
}

module.exports.reset = () => {
    desiredTempPrevReached = false
}