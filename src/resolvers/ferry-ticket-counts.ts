import { GraphQLResolveInfo } from "npm:graphql";
import { FerryTicketCount } from "../generated/graphql.ts";
import { z } from "npm:zod";
import dayjs from "npm:dayjs";
import { FerryTicketCountDateFilter } from "../generated/graphql.ts";
import { QueryFerryTicketCountsArgs } from "../generated/graphql.ts";

const url = `https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/toronto-island-ferry-ticket-counts/resource/21d44bb7-6ca6-45fa-91bd-4c38071ec9a3/download/toronto-island-ferry-ticket-counts.json`;
const ResponseSchema = z.array(
  z.object({
    _id: z.number().int(),
    Timestamp: z.string(),
    "Redemption Count": z.number().int(),
    "Sales Count": z.number().int(),
  })
);

let cachedData: z.infer<typeof ResponseSchema> = [];
let cachedDate = dayjs(0);
const ferryTicketCounts = async (
  _parent: Record<string | number | symbol, never>,
  args: QueryFerryTicketCountsArgs,
  _context: Record<string | number | symbol, never>,
  _info: GraphQLResolveInfo
): Promise<FerryTicketCount[]> => {
  if (dayjs(dayjs()).diff(cachedDate, 'minute', true) > 5) {
    const response = await fetch(url);
    const json = await response.json();
    cachedData = ResponseSchema.parse(json);
    cachedDate = dayjs();
  }

  return cachedData.filter(a => {
    const diff = dayjs().diff(dayjs(a.Timestamp), 'day');
    let maxAllowedDiff;
    switch (args.filter) {
      case FerryTicketCountDateFilter.Day:
        maxAllowedDiff = 1;
        break;
      case FerryTicketCountDateFilter.Month:
        maxAllowedDiff = 30;
        break;
      case FerryTicketCountDateFilter.Week:
        maxAllowedDiff = 7;
        break;
      case FerryTicketCountDateFilter.Year:
        maxAllowedDiff = 365;
        break;
    }
    return diff <= maxAllowedDiff;
  }).map(a => ({
    date: a.Timestamp,
    redemptionCount: a["Redemption Count"],
    salesCount: a["Sales Count"],
  }));
};

export default ferryTicketCounts;
