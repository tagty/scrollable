import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetPresentation = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetPresentation),
  resolver.authorize(),
  async ({ id }, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
    if (!user) throw new NotFoundError()

    const presentation = await db.presentation.findFirst({
      where: {
        id,
        userId: user.id,
      },
    })

    if (!presentation) throw new NotFoundError()

    return presentation
  }
)
