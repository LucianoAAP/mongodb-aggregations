db.movies.aggregate([
  { $match: {
    countries: { $all: ["USA"] },
    "tomatoes.viewer.rating": { $gte: 3 },
  } },
  { $sort: {
    "tomatoes.viewer.rating": -1,
    title: -1,
  } },
]);
