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
