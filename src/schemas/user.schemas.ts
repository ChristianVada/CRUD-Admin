import { z } from "zod"

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  admin: z.boolean(),
  active: z.boolean(),
})

const requestUserSchema = userSchema.omit({ id: true, active: true }).extend({
  admin: z.boolean().optional(),
})

const responseUserSchema = userSchema.omit({ password: true })

const arrayResponseUserSchema = z.array(responseUserSchema)

const patchUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
})

export {
  userSchema,
  requestUserSchema,
  responseUserSchema,
  arrayResponseUserSchema,
  patchUserSchema,
}
