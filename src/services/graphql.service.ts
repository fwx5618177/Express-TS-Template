import { PrismaClient } from '@prisma/client'

class GraphqlService {
    public users = new PrismaClient().user
}

export default GraphqlService
