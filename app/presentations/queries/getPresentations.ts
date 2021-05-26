import { NotFoundError, paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetPresentationsInput
  extends Pick<Prisma.PresentationFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetPresentationsInput, ctx) => {
    const user = await db.user.findFirst({ where: { id: ctx.session.userId! } })
    if (!user) throw new NotFoundError()

    const {
      items: presentations,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.presentation.count({ where }),
      query: (paginateArgs) =>
        db.presentation.findMany({
          ...paginateArgs,
          where: {
            ...where,
            userId: user.id,
          },
          orderBy,
        }),
    })

    return {
      presentations,
      nextPage,
      hasMore,
      count,
    }
  }
)
