db.trips.aggregate([
  { $group: {
    _id: "$bikeid",
    duracaoMedia: { $avg: {
      $divide: [
        { $subtract: ["$stopTime", "$startTime"] },
        60000,
      ],
    } },
  } },
  { $sort: { duracaoMedia: -1 } },
  { $limit: 5 },
  { $project: {
    bikeId: "$_id",
    duracaoMedia: { $ceil: "$duracaoMedia" },
    _id: 0,
  } },
]);
