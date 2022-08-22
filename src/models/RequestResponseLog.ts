import { model, Schema, Document } from "mongoose";

export interface IRequestResponseLog extends Document {
  //Reqeust
  protocol: string;
  host: string;
  path: string;
  reqHeaders: any;
  method: string;
  reqData: any;
  reqTime: string;
  query: any;
  params: any;
  //Response
  status: "SUCCESS" | "ERROR" | "TIMEOUT";
  statusCode: string;
  resHeaders: any;
  resTime: string;
  resData: any;
  error: any;
}

const RequestResponseLogSchema = new Schema<IRequestResponseLog>({
  protocol: { type: String },
  host: { type: String },
  path: { type: String },
  reqHeaders: { type: Schema.Types.Mixed },
  method: { type: String },
  reqData: { type: Schema.Types.Mixed },
  query: { type: Schema.Types.Mixed },
  params: { type: Schema.Types.Mixed },
  reqTime: { type: String },
  status: { type: String },
  statusCode: { type: String },
  resHeaders: { type: Schema.Types.Mixed },
  resTime: { type: String },
  resData: { type: Schema.Types.Mixed },
  error: { type: Schema.Types.Mixed },
});

const RequestResponseLog = model<IRequestResponseLog>(
  "RequestResponseLog",
  RequestResponseLogSchema
);

export default RequestResponseLog;
