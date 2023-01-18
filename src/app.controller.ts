import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AppService } from "./app.service";
import { ReportDto, ReportReq } from "./app.dtos";
import { Report } from "./reports/report.entity";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post("/report")
    @HttpCode(HttpStatus.OK)
    async createReport(@Body() req: ReportReq) {
        const reqDto = Object.assign(new ReportDto(), req);
        this.appService.createReport(reqDto);
    }

    @Post("/count/safe")
    @HttpCode(HttpStatus.OK)
    async addSafeCount(@Body() req: ReportReq) {
        const reqDto = Object.assign(new ReportDto(), req);
        this.appService.addSafeCount(reqDto);
    }

    @Post("/count/report")
    @HttpCode(HttpStatus.OK)
    async addReportCount(@Body() req: ReportReq) {
        const reqDto = Object.assign(new ReportDto(), req);
        this.appService.addReportCount(reqDto);
    }

    @Get("/all")
    @HttpCode(HttpStatus.OK)
    async getAllReport(): Promise<Report[]> {
        return this.appService.getAllReport();
    }
}
