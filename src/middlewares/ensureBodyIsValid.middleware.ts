import { NextFunction, Request, Response } from "express"
import { ZodTypeAny } from "zod"

const ensureBodyisValidMiddleware =
  (schema: ZodTypeAny) => (req: Request, res: Response, next: NextFunction) => {
    const validadeBody = schema.parse(req.body)

    req.body = validadeBody

    return next()
  }

export { ensureBodyisValidMiddleware }
