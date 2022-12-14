db.air_routes.aggregate([
  { $match: { airplane: { $in: ["747", "380"] } } },
  { $lookup: {
    from: "air_alliances",
    let: { airline_name: "$airline.name" },
    pipeline: [
      { $unwind: "$airlines" },
      { $match: {
        $expr: { $eq: ["$airlines", "$$airline_name"] },
      } },
    ],
    as: "alliance",
  } },
  { $unwind: "$alliance" },
  { $group: {
    _id: "$alliance.name",
    totalRotas: { $sum: 1 },
  } },
  { $sort: { totalRotas: -1 } },
  { $limit: 1 },
]);
