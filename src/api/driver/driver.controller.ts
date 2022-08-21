import axios from "axios";
import { Request, Response } from "express";
import { ErrorResponse } from "../../helpers/response";
import { v4 as uuidv4 } from 'uuid';
const amqplib = require('amqplib');
const amqp_url = process.env.CLOUDAMQP_URL || 'amqps://lbyjdacl:whjFKganLPxFsFeyzYA_ipgVkergjEmH@armadillo.rmq.cloudamqp.com/lbyjdacl';


const authController = {
  async booking(req: Request, res: Response) {
    const body = req.body;

    try {
      body.requestID = uuidv4();

      const conn = await amqplib.connect(amqp_url, "heartbeat=60");
      const ch = await conn.createChannel()
      const exch = 'EXCHANGE_Gateway';
      const q = 'QUEUE_Gateway';
      const rkey = 'Route_Gateway';

      await ch.assertExchange(exch, 'direct', { durable: true }).catch(console.error);
      await ch.assertQueue(q, { durable: true });
      await ch.bindQueue(q, exch, rkey);
      await ch.publish(exch, rkey, Buffer.from(JSON.stringify(body)));

      setTimeout(function () {
        ch.close();
        conn.close();
      }, 500);

      return res.send(
        "send rabbit ok"
      );
    } catch (err: any) {
      return ErrorResponse(
        res,
        err?.response?.data?.error?.message || "Hệ thống bảo trì"
      );
    }
  },
};

export default authController;
