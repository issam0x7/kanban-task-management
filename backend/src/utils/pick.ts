

/**
 *  A funtion return an Object from a given Keys
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */


const pick = (object,keys) => {
    return keys.reduce((obj, key) => {
        if(object && Object.prototype.hasOwnProperty.call(object,key)) {
            obj[key] = object[key] 
        }
        return obj;
    }, {})
}


export default pick;