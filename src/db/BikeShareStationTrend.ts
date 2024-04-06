import { DataTypes, Sequelize } from "npm:sequelize";
export { default as pg } from "npm:pg"; // Sequelize peer dep

if (!Deno.env.has("SEQUELIZE_URL")) {
  console.log("No database string defined!");
  Deno.exit(1);
}
const sequelize = new Sequelize(Deno.env.get("SEQUELIZE_URL") ?? "");

export const BikeShareStationTrend = sequelize.define("BikeShareStationTrend", {
  station_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true,
  },
  numBikesAvailableEbike: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numBikesAvailableMechanical: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numBikesDisabled: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numDocksAvailable: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  numDocksDisabled: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

await sequelize.sync();
