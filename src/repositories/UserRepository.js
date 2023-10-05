import { User } from "../entity/user.js"
export class UserRepository {
  constructor(prisma) {
      this.prisma = prisma
  }

  async save(user) {
    try {
      const user2 = await this.prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
          password: user.password,
          address: user.address,
        },
      });
      return user2
    } catch (error) {
        console.log(error)
        return null
    }      
  }

  async findByEmail(email) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) return undefined;

    return new User(user.id, user.name, user.email, user.password, user.address);
  }
}