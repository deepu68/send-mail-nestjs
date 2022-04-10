import { EntityRepository, Repository } from "typeorm";
import { UserDto } from '../utils/dtos/user.dto';
import { User } from "src/entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async addUser(userDto: UserDto): Promise<User> {
        const user = new User();
        Object.assign(user, userDto);
        return await user.save();
    }

    public async getUserByEmail(email: string): Promise<User> {
        return await this.findOne({ email });
    }

    public async deleteUser(id: string): Promise<any> {
        try {
            return await this.softDelete({ id });
        }
        catch (error) {
            return error;
        }
    }
}