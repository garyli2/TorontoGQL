import { GraphQLResolveInfo } from "npm:graphql";
import { QueryBikeStationTrendsArgs } from "../generated/graphql.ts";
import { BikeShareStationTrend } from "../db/BikeShareStationTrend.ts";
import dayjs from "npm:dayjs";
import { type BikeShareStationTrend as BikeShareStationTrendType } from "../generated/graphql.ts";
import z from "npm:zod";
import { Op } from "npm:sequelize";

const BikeStationTrendSchema = z.object({
  date: z.date(),
  numBikesAvailableEbike: z.number().int(),
  numBikesAvailableMechanical: z.number().int(),
  numBikesDisabled: z.number().int(),
  numDocksAvailable: z.number().int(),
  numDocksDisabled: z.number().int(),
});

const bikeStationTrends = async (
  _parent: Record<string | number | symbol, never>,
  args: QueryBikeStationTrendsArgs,
  _context: Record<string | number | symbol, never>,
  _info: GraphQLResolveInfo,
): Promise<BikeShareStationTrendType[]> => {
  // fetch all trend data points within the last 24 hours
  const results = await BikeShareStationTrend.findAll({
    where: {
      date: {
        [Op.gte]: dayjs().subtract(1, "day").toDate(),
      },
      station_id: args.id,
    },
  });

  return results.map((a) => {
    const dbResult = BikeStationTrendSchema.parse({
      date: a.get("date"),
      numBikesAvailableEbike: a.get("numBikesAvailableEbike"),
      numBikesAvailableMechanical: a.get("numBikesAvailableMechanical"),
      numBikesDisabled: a.get("numBikesDisabled"),
      numDocksAvailable: a.get("numDocksAvailable"),
      numDocksDisabled: a.get("numDocksDisabled"),
    });

    return {
      ...dbResult,
      date: dbResult.date.toISOString()
    }
  });
};

export default bikeStationTrends;
