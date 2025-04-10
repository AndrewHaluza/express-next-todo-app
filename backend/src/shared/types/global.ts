import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

export interface Request<Body = Record<string, any>> extends ExpressRequest {
  body: Body;
}

export interface Response<
  Body = Record<string, any>,
  Locals extends Record<string, any> = Record<string, any>
> extends ExpressResponse<Body, Locals> {}

export type CommonResponse<T> = {
  data: T;
};
