import { NotFoundError, resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreatePresentation = z
  .object({
    title: z.string(),
    text: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreatePresentation),
  resolver.authorize(),
  async ({ title, text }, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
    if (!user) throw new NotFoundError()

    const presentation = await db.presentation.create({
      data: {
        title: title,
        text: text,
        userId: user.id,
      },
    })

    const texts = text.split("---\n")

    texts.forEach(async (text, index) => {
      await db.slide.create({
        data: {
          text: text.trim(),
          presentationId: presentation.id,
          number: index,
        },
      })
    })

    return presentation
  }
)
