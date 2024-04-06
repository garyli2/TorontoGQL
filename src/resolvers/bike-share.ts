import { GraphQLResolveInfo } from "npm:graphql";
import { z } from "npm:zod";
import { BikeShareStation } from "../generated/graphql.ts";
export { default as pg } from "npm:pg"; // Sequelize peer dep

export const stationInfoUrl = `https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_information`;
export const stationStatusUrl = `https://tor.publicbikesystem.net/ube/gbfs/v1/en/station_status`;
export const StationInfoSchema = z.object({
  data: z.object({
    stations: z.array(
      z.object({
        station_id: z.string(),
        name: z.string(),
        lat: z.number(),
        lon: z.number(),
        address: z.string().optional(),
      })
    ),
  }),
  last_updated: z.number().int(),
});
export const StationStatusSchema = z.object({
  data: z.object({
    stations: z.array(
      z.object({
        station_id: z.string(),
        num_bikes_available: z.number().int().optional(),
        num_bikes_available_types: z
          .object({
            mechanical: z.number().int(),
            ebike: z.number().int(),
          })
          .partial()
          .optional(),
        num_bikes_disabled: z.number().int().optional(),
        num_docks_available: z.number().int().optional(),
        num_docks_disabled: z.number().int().optional(),
        last_reported: z.number().int().optional(),
        is_charging_station: z.boolean().optional(),
        status: z.string().optional(),
      })
    ),
  }),
  last_updated: z.number().int(),
});

const bikeShareStations = async (
  _parent: Record<string | number | symbol, never>,
  _args: Record<string | number | symbol, never>,
  _context: Record<string | number | symbol, never>,
  _info: GraphQLResolveInfo
): Promise<BikeShareStation[]> => {
  const stationInfoResponse = await fetch(stationInfoUrl);
  const stationStatusResponse = await fetch(stationStatusUrl);
  const stationInfo = StationInfoSchema.parse(await stationInfoResponse.json());
  const stationStatus = StationStatusSchema.parse(
    await stationStatusResponse.json()
  );

  const stationMap = new Map<
    string,
    z.infer<typeof StationInfoSchema>["data"]["stations"][number]
  >();
  stationInfo.data.stations.forEach((a) => stationMap.set(a.station_id, a));

  return stationStatus.data.stations
    .filter((a) => stationMap.has(a.station_id))
    .map((a) => {
      const info = stationMap.get(a.station_id);

      return {
        id: a.station_id,
        lat: info?.lat ?? 0,
        lon: info?.lon ?? 0,
        name: info?.name ?? "Unknown",
        address: info?.address ?? "",
        numBikesAvailableEbike: a.num_bikes_available_types?.ebike,
        numBikesAvailableMechanical: a.num_bikes_available_types?.mechanical,
        numBikesDisabled: a.num_bikes_disabled,
        numDocksAvailable: a.num_docks_available,
        numDocksDisabled: a.num_docks_disabled,
        status: a.status,
        lastReported: a.last_reported,
        isChargingStation: a.is_charging_station,
      };
    });
};

export default bikeShareStations;
