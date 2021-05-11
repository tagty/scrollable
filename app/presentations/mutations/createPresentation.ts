import { resolver } from "blitz"
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
  async (input) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const presentation = await db.presentation.create({ data: input })

    const texts = input.text.split("---\n")

    texts.forEach(async (text) => {
      await db.slide.create({
        data: {
          text: text.trim(),
          presentationId: presentation.id,
        },
      })
    })

    return presentation
  }
)
