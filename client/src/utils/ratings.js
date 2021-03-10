export function getAverageRating(ratings) {
  let weightedTotal = 0;
  let ratingTotal = 0;
  const ratingValue = Object.keys(ratings);
  const ratingCount = Object.values(ratings);

  for (let i = 0; i < ratingValue.length; i += 1) {
    weightedTotal += ratingValue[i] * ratingCount[i];
    ratingTotal += Number(ratingCount[i]);
  }

  return (weightedTotal / ratingTotal).toFixed(1);
}

export function getStarBreakdown(ratings) {
  return ratings.reduce((breakdown, rating) => breakdown[rating] + 1, {});
}

export function roundToNearestQuarter(float) {
  const decimal = -(Math.floor(float) - float);
  let result = 0;

  if (decimal < 0.25) {
    result = Math.floor(float) + 0.25;
  } else if (decimal < 0.5) {
    result = Math.floor(float) + 0.5;
  } else if (decimal < 0.99) {
    result = Math.floor(float) + 0.75;
  } else {
    result = Math.ceil(float);
  }
  return result;
}

export function convertRatingsToNumberType(ratings) {
  return {
    5: Number(ratings[5]) || 0,
    4: Number(ratings[4]) || 0,
    3: Number(ratings[3]) || 0,
    2: Number(ratings[2]) || 0,
    1: Number(ratings[1]) || 0
  }
}
