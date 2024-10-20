module.exports = (min, max) => {
    if(isNaN(min) || isNaN(max)) return 0
    else return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}