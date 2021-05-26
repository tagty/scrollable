import { NotFoundError, paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetSlidesInput
  extends Pick<Prisma.SlideFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetSlidesInput, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
    if (!user) throw new NotFoundError()

    const presentation = await db.presentation.findFirst({
      where: {
        id: where?.id,
        userId: user.id,
      },
    })

    const {
      items: slides,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.slide.count({ where }),
      query: (paginateArgs) =>
        db.slide.findMany({
          ...paginateArgs,
          where: {
            presentationId: presentation?.id,
          },
          orderBy,
        }),
    })

    return {
      slides,
      nextPage,
      hasMore,
      count,
    }
  }
)
