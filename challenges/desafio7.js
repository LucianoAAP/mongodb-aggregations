db.movies.aggregate([
  {
    $match: {
      cast: { $exists: 1 },
      languages: { $all: ["English"] },
    },
  },
  { $unwind: "$cast" },
  { $group: {
    _id: "$cast",
    numeroFilmes: { $sum: 1 },
    mediaIMDB: { $avg: "$imdb.rating" },
  } },
  { $set: {
    mediaIMDB: { $round: ["$mediaIMDB", 1] },
  } },
  {
    $sort: { numeroFilmes: -1, _id: -1 },
  },
]);
