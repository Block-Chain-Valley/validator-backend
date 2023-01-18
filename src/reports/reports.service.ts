import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { ReportDto } from "src/app.dtos";

@Injectable()
export class ReportsService {
    private readonly logger = new Logger();

    constructor(@InjectRepository(Report) private reportRepository: Repository<Report>) {}

    async initializeReport(req: ReportDto) {
        const newReport = await this.reportRepository.create({
            project_name: req.project_name,
            data: req.data,
            reason: req.reason,
            reporter: req.reporter,
        });

        await this.reportRepository.save(newReport);

        return newReport;
    }

    async findReport(projectName: string): Promise<Report> {
        const report = await this.reportRepository.findOneBy({ project_name: projectName });

        return report;
    }

    async addReportCount(projectName: string) {
        const report = await this.findReport(projectName);

        /* Report 카운트 횟수 1 증가하여, DB에 업데이트 */
        report.reportNum = report.reportNum + 1;
        return this.reportRepository.save(report);
    }

    async addSafeCount(projectName: string) {
        const report = await this.findReport(projectName);

        /* Safe 카운트 횟수 1 증가하여, DB에 업데이트 */
        report.safeNum = report.safeNum + 1;
        return this.reportRepository.save(report);
    }

    // async updateReport() {}

    async getAllReport(): Promise<Report[]> {
        const reports = this.reportRepository.find();

        return reports;
    }
}
