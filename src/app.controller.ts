import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { ReportDto, ReportReq, ReportRes, UserDto, UserReq, UserRes } from "./app.dtos";
import { Report } from "./reports/report.entity";
import { User } from "./users/user.entity";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post("/user")
    @HttpCode(HttpStatus.OK)
    async createUser(@Body() req: UserReq): Promise<UserRes> {
        const reqDto = Object.assign(new UserDto(), req);
        return this.appService.createUser(reqDto);
    }

    @Get("/user")
    @HttpCode(HttpStatus.OK)
    async getAllUser(): Promise<User[]> {
        return this.appService.getAllUser();
    }

    @Post("/report")
    @HttpCode(HttpStatus.OK)
    async createReport(@Body() req: ReportReq): Promise<ReportRes> {
        const reqDto = Object.assign(new ReportDto(), req);
        return this.appService.createReport(reqDto);
    }

    @Post("/count/safe")
    @HttpCode(HttpStatus.OK)
    async addSafeCount(@Body() req: ReportReq): Promise<ReportRes> {
        const reqDto = Object.assign(new ReportDto(), req);
        return this.appService.addSafeCount(reqDto);
    }

    @Post("/count/report")
    @HttpCode(HttpStatus.OK)
    async addReportCount(@Body() req: ReportReq): Promise<ReportRes> {
        const reqDto = Object.assign(new ReportDto(), req);
        return this.appService.addReportCount(reqDto);
    }

    @Get("/all")
    @HttpCode(HttpStatus.OK)
    async getAllReport(): Promise<Report[]> {
        return this.appService.getAllReport();
    }
}
