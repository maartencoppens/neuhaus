export function matchPralines(pralines, tasteTags, amount = 16) {
  if (!tasteTags) return pralines.slice(0, amount);

  const scoredPralines = pralines.map((praline) => {
    let score = 0;

    if (tasteTags.chocolateType?.includes(praline.chocolateType)) {
      score += 4;
    }

    tasteTags.flavors?.forEach((flavor) => {
      if (praline.flavorProfile?.includes(flavor)) {
        score += 3;
      }

      if (praline.tags?.includes(flavor)) {
        score += 2;
      }

      if (praline.filling?.toLowerCase().includes(flavor)) {
        score += 2;
      }
    });

    return {
      ...praline,
      matchScore: score,
    };
  });

  const sortedPralines = scoredPralines
    .filter((praline) => praline.matchScore > 0)
    .sort((a, b) => b.matchScore - a.matchScore);

  const matchedPralines = sortedPralines.slice(0, amount);

  if (!matchedPralines.length) {
    return scoredPralines.slice(0, amount);
  }

  if (matchedPralines.length >= amount) {
    return matchedPralines;
  }

  const fillerPralines = Array.from(
    { length: amount - matchedPralines.length },
    (_, index) => matchedPralines[index % matchedPralines.length],
  );

  return [...matchedPralines, ...fillerPralines];
}
