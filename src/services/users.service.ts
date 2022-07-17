/**
 * 用户服务
 */

import { hash } from 'bcrypt'
import { PrismaClient, User } from '@prisma/client'
import { HttpException } from '@/exceptions/HttpException'
import { isEmpty } from '@/utils/util'
import { CreateUserDto } from '@/dtos/users.dto'

class UserService {
    public users = new PrismaClient().user

    public async findAllUser(): Promise<User[]> {
        const allUser: User[] = await this.users.findMany()

        return allUser
    }

    public async findUserById(userId: number): Promise<User> {
        if (isEmpty(userId)) throw new HttpException(400, 'User id not found')

        const findUser: User = (await this.users.findUnique({
            where: {
                id: userId,
            },
        })) as User

        if (!findUser) throw new HttpException(409, `${userId} not user.`)

        return findUser
    }

    public async createUser(userData: CreateUserDto): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, "That's not user data:" + userData.email)

        const findUser: User = (await this.users.findUnique({
            where: {
                email: userData.email,
            },
        })) as User

        if (!findUser) throw new HttpException(409, `Email ${userData.email} already exists`)

        const hashedPassword: string = await hash(userData.password, 10)
        const createData: User = await this.users.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        })

        return createData
    }

    public async updateUser(userId: number, userData: CreateUserDto): Promise<User> {
        if (isEmpty(userData)) throw new HttpException(400, 'Not userdata')

        const findUser: User = (await this.users.findUnique({
            where: {
                id: userId,
            },
        })) as User

        if (!findUser) throw new HttpException(409, 'Not user:' + userId)

        const hashedPassword = await hash(userData.password, 10)
        const updateUserData = await this.users.update({
            where: {
                id: userId,
            },
            data: {
                ...userData,
                password: hashedPassword,
            },
        })

        return updateUserData
    }

    public async deleteUser(userId: number): Promise<User> {
        if (isEmpty(userId)) throw new HttpException(400, 'Not user:' + userId)

        const findUser: User = (await this.users.findUnique({
            where: {
                id: userId,
            },
        })) as User

        if (!findUser) throw new HttpException(409, 'Not user:' + userId)

        const deleteUserData = await this.users.delete({
            where: {
                id: userId,
            },
        })

        return deleteUserData
    }
}

export default UserService
