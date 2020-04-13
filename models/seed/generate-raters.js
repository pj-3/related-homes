module.exports.generateRaters = function () {
    let totalRaters = 100000;
    let votersCount = (Math.floor(Math.random() * totalRaters)) * (Math.random() / 10000);
    let raters = [];
    for (let i = 0; i < votersCount; i++) {
        let rater = {};
        let voterRating = parseFloat(Math.random() * 5);
        rater.raters_id = Math.floor(Math.random() * totalRaters);
        rater.voters_rating = voterRating;
        raters.push(rater);
        rater = null;
    }
    return raters;
}

const raters = generateRaters();
module.exports = raters;