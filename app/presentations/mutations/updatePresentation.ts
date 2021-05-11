import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdatePresentation = z
  .object({
    id: z.number(),
    title: z.string(),
    text: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdatePresentation),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const presentation = await db.presentation.update({ where: { id }, data })

    await db.slide.deleteMany({
      where: {
        presentationId: id,
      },
    })

    const texts = data.text.split("---\n")

    texts.forEach(async (text) => {
      await db.slide.create({
        data: {
          text: text.trim(),
          presentationId: id,
        },
      })
    })

    return presentation
  }
)
