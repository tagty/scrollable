import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeletePresentation = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(DeletePresentation),
  resolver.authorize(),
  async ({ id }) => {
    const slides = db.slide.deleteMany({
      where: {
        presentationId: id,
      },
    })
    const presentation = db.presentation.delete({
      where: {
        id,
      },
    })
    await db.$transaction([slides, presentation])

    return presentation
  }
)
