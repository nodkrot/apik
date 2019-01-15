import Ajv from "ajv";
import schema from "./api.json";
import { Request, Response, NextFunction, RequestHandler } from "express";

const ajv = new Ajv({ allErrors: true }).addSchema(schema, "openapi.json");

// class HttpException extends Error {
//   constructor(
//     public status: number,
//     public message: string
//   ) {
//     super();
//   }
// }

export function validate(type: any): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const valid = ajv.validate({ $ref: `openapi.json#/components/schemas/${type.className}` }, req.body);

    if (valid) {
      return next();
    }

    res.status(400).json({ message: ajv.errorsText(ajv.errors) });
  };
}
