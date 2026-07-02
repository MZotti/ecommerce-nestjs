import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository {
    constructor(private prisma: PrismaService) { }

    private readonly listSelect = {
        id: true,
        name: true,
        email: true,
        isActive: true,
        role: true,
        createdAt: true,
    } satisfies Prisma.UserSelect;

    private readonly detailSelect = {
        id: true,
        name: true,
        email: true,
        isActive: true,
        roleId: true,
        role: true,
        createdAt: true,
        customer: true,
    } satisfies Prisma.UserSelect;

    findMany(args: { skip: number; take: number; where?: Prisma.UserWhereInput }) {
        return this.prisma.user.findMany({
            ...args,
            orderBy: { createdAt: 'desc' },
            select: this.listSelect,
        });
    }

    count(where?: Prisma.UserWhereInput) {
        return this.prisma.user.count({ where });
    }

    findById(id: number) {
        return this.prisma.user.findUnique({
            where: { id },
            select: this.detailSelect,
        });
    }

    findByEmail(email: string, excludeId?: number) {
        return this.prisma.user.findUnique({
            where: excludeId ? { email, NOT: { id: excludeId } } : { email },
        });
    }

    create(data: { name: string; email: string; password: string; roleId: number }) {
        return this.prisma.user.create({
            data,
            select: this.detailSelect,
        });
    }

    update(id: number, data: Prisma.UserUncheckedUpdateInput) {
        return this.prisma.user.update({
            where: { id },
            data,
            select: this.detailSelect,
        });
    }

    active(id: number) {
        return this.prisma.user.update({
            where: { id },
            data: {
                isActive: true
            }
        })
    }

    inactive(id: number) {
        return this.prisma.user.update({
            where: { id },
            data: {
                isActive: false
            }
        })
    }

    delete(id: number) {
        return this.prisma.user.delete({ where: { id } });
    }
}
