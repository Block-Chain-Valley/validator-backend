import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserDto, UserRes } from "src/app.dtos";

@Injectable()
export class UsersService {
    private readonly logger = new Logger();

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async create(req: UserDto): Promise<User> {
        const user = this.userRepository.create({ address: req.address });
        return this.userRepository.save(user);
    }

    async findOne(address: string): Promise<User> {
        return this.userRepository.findOneBy({ address });
    }

    async findAll() {
        return this.userRepository.find();
    }

    async addDailyReportCount(address: string): Promise<void> {
        const user = await this.findOne(address);
        const today = new Date().toISOString().substring(0, 10);
        const lastReportDay = user.last_report.toISOString().substring(0, 10);

        if (today == lastReportDay) {
            user.daily_report_num = user.daily_report_num + 1;
        } else {
            user.daily_report_num = 1;
        }

        await this.userRepository.save(user);
    }
}
