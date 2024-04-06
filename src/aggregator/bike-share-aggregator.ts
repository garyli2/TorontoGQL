import {
  StationStatusSchema,
  stationStatusUrl,
} from "../resolvers/bike-share.ts";
import { BikeShareStationTrend } from "../db/BikeShareStationTrend.ts";

export const startBikeShareAggregator = () => {
  setInterval(async () => {
    const stationStatusResponse = await fetch(stationStatusUrl);
    const stationStatus = StationStatusSchema.parse(
      await stationStatusResponse.json(),
    );
    console.log(
      `[Station status aggregator]: Got ${stationStatus.data.stations.length} stations.`,
    );

    stationStatus.data.stations.forEach((a) => {
      BikeShareStationTrend.create({
        station_id: a.station_id,
        date: new Date(),
        numBikesAvailableEbike: a.num_bikes_available_types?.ebike,
        numBikesAvailableMechanical: a.num_bikes_available_types?.mechanical,
        numBikesDisabled: a.num_bikes_disabled,
        numDocksAvailable: a.num_docks_available,
        numDocksDisabled: a.num_docks_disabled,
      });
    });
  }, 1000 * 60 * 5);
};
