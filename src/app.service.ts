import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { ReportsService } from "./reports/reports.service";
import { ReportDto, ReportRes, UserDto, UserRes } from "./app.dtos";
import { Report } from "./reports/report.entity";
import { UsersService } from "./users/users.service";
import { User } from "./users/user.entity";

@Injectable()
export class AppService {
    private readonly logger = new Logger();

    constructor(private reportsService: ReportsService, private usersService: UsersService) {}

    async createUser(req: UserDto): Promise<UserRes> {
        const newUser = await this.usersService.create(req);
        return {
            resultCode: "0",
            message: "success",
            address: newUser.address,
            last_report: newUser.last_report,
            daily_report_num: newUser.daily_report_num,
        };
    }

    async getAllUser(): Promise<User[]> {
        return this.usersService.findAll();
    }

    async createReport(req: ReportDto): Promise<ReportRes> {
        try {
            /* 기존에 존재하는 Report인지 확인 */
            const existReport = await this.reportsService.findReport(req.project_name);
            if (existReport) {
                this.logger.warn("SERVER_ERROR: EXISTING_REPORT");
                throw new BadRequestException("SERVER_ERROR: EXISTING_REPORT");
            }

            /* User의 일일 신고 횟수를 만족하는지 확인 */
            // TODO: 최대 숫자 수정 필요
            const user = await this.usersService.findOne(req.reporter);
            console.log(user.daily_report_num);
            if (user.daily_report_num >= 3) {
                this.logger.warn("SERVER_ERROR: REPORT_COUNT_EXCEED");
                throw new BadRequestException("SERVER_ERROR: REPORT_COUNT_EXCEED");
            }

            /* 그렇지 않을 시, Report 생성 */
            const newReport = await this.reportsService.initializeReport(req);

            /* User 일일 신고 횟수 추가 */
            await this.usersService.addDailyReportCount(req.reporter);

            /* Response 반환 */
            return {
                resultCode: "0",
                message: "success",
            };
        } catch (err: any) {
            const msg = err.message || "";
            throw new InternalServerErrorException(msg);
        }
    }

    async addSafeCount(req: ReportDto): Promise<ReportRes> {
        try {
            /* 이미 생성된 Report인지 확인 */
            const report = await this.reportsService.findReport(req.project_name);
            if (!report) {
                this.logger.warn("SERVER_ERROR: REPORT_NOT_FOUND");
                throw new NotFoundException("SERVER_ERROR: REPORT_NOT_FOUND");
            }

            /* 이미 신고한 Report인지 확인 */

            /* User의 일일 신고 횟수를 만족하는지 확인 */
            // TODO: 최대 숫자 수정 필요
            const user = await this.usersService.findOne(req.reporter);
            console.log(user.daily_report_num);
            if (user.daily_report_num >= 3) {
                this.logger.warn("SERVER_ERROR: REPORT_COUNT_EXCEED");
                throw new BadRequestException("SERVER_ERROR: REPORT_COUNT_EXCEED");
            }

            /* SafeCount 추가 */
            await this.reportsService.addSafeCount(req.project_name);

            /* User 일일 신고 횟수 추가 */
            await this.usersService.addDailyReportCount(req.reporter);

            /* Response 반환 */
            return {
                resultCode: "0",
                message: "success",
            };
        } catch (err: any) {
            const msg = err.message || "";
            throw new InternalServerErrorException(msg);
        }
    }

    async addReportCount(req: ReportDto): Promise<ReportRes> {
        try {
            /* 이미 생성된 Report인지 확인 */
            const report = await this.reportsService.findReport(req.project_name);
            if (!report) {
                this.logger.warn("SERVER_ERROR: REPORT_NOT_FOUND");
                throw new NotFoundException("SERVER_ERROR: REPORT_NOT_FOUND");
            }

            /* 이미 신고한 Report인지 확인 */

            /* User의 일일 신고 횟수를 만족하는지 확인 */
            // TODO: 최대 숫자 수정 필요
            const user = await this.usersService.findOne(req.reporter);
            console.log(user.daily_report_num);
            if (user.daily_report_num >= 3) {
                this.logger.warn("SERVER_ERROR: REPORT_COUNT_EXCEED");
                throw new BadRequestException("SERVER_ERROR: REPORT_COUNT_EXCEED");
            }

            /* SafeCount 추가 */
            await this.reportsService.addReportCount(req.project_name);

            /* User 일일 신고 횟수 추가 */
            await this.usersService.addDailyReportCount(req.reporter);

            /* Response 반환 */
            return {
                resultCode: "0",
                message: "success",
            };
        } catch (err: any) {
            const msg = err.message || "";
            throw new InternalServerErrorException(msg);
        }
    }

    async getAllReport(): Promise<Report[]> {
        return this.reportsService.getAllReport();
    }
}
