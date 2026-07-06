import { UserPaginationDto } from "@app/common/dto/users/user-pagination.dto";
import { Prisma } from "@prisma/client";

export class UsersFilter {
    static build(
        query: UserPaginationDto,
    ): Prisma.UserWhereInput {

        const where: Prisma.UserWhereInput = {
            roleId: { not: 5 },
        };

        if (query.search) {
            where.OR = [
                { name: { contains: query.search, mode: 'insensitive' } },
                { email: { contains: query.search, mode: 'insensitive' } },
            ]
        }

        if (query.roleId) {
            where.roleId = query.roleId;
        }

        if (query.isActive !== undefined) {
            where.isActive = query.isActive
        }

        if (query.createdAtStart || query.createdAtEnd) {
            where.createdAt = {}

            if (query.createdAtStart) {
                where.createdAt.gte = new Date(`${query.createdAtStart} 00:00:00`)
            }

            if (query.createdAtEnd) {
                where.createdAt.lte = new Date(`${query.createdAtEnd} 23:59:59`)
            }

        }

        return where;
    }

}