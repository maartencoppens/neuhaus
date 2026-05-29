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

  return scoredPralines
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, amount);
}
