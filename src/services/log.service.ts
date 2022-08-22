import { FilterQuery } from "mongoose";
import { processFilterOptions } from "../commons/functions";
import { CreateInput, FilterOptions, UpdateInput } from "../commons/interfaces";
import RequestResponseLog, {
  IRequestResponseLog,
} from "../models/RequestResponseLog";

export function getLogs(
  filter: FilterQuery<IRequestResponseLog> = {},
  options: Omit<FilterOptions<IRequestResponseLog>, "select"> = {}
) {
  let query = RequestResponseLog.find(filter);

  query = processFilterOptions(query, options);

  return query.lean();
}

export function getLog(
  filter: FilterQuery<IRequestResponseLog> = {},
  options: Omit<FilterOptions<IRequestResponseLog>, "select"> = {}
) {
  let query = RequestResponseLog.findOne(filter);

  query = processFilterOptions(query, options);

  return query.lean();
}

export async function createLog(
  data: CreateInput<IRequestResponseLog>,
  options: Omit<FilterOptions<IRequestResponseLog>, "select"> = {}
) {
  let user = await RequestResponseLog.create(data);

  return getLog({ _id: user._id }, options);
}
