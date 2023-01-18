import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Report } from "./report.entity";
import { Repository } from "typeorm";
import { ReportDto } from "src/app.dtos";
import { Data } from "src/report_data/data.entity";

@Injectable()
export class ReportsService {
    private readonly logger = new Logger();

    constructor(
        @InjectRepository(Report) private reportRepository: Repository<Report>,
        @InjectRepository(Data) private dataRepository: Repository<Data>,
    ) {}

    async initializeReport(req: ReportDto) {
        const newReport = await this.reportRepository.create({
            project_name: req.project_name,
            data: req.data,
            reporter: req.reporter,
        });

        await this.reportRepository.save(newReport);
        console.log(newReport);
        return newReport;
    }

    async findReport(projectName: string): Promise<Report> {
        const report = await this.reportRepository.findOneBy({ project_name: projectName });

        return report;
    }

    async addReportCount(projectName: string): Promise<void> {
        const report = await this.findReport(projectName);

        /* Report 카운트 횟수 1 증가하여, DB에 업데이트 */
        const data = await this.dataRepository.findOneBy({ id: report.id });
        data.reportNum = data.reportNum + 1;
        await this.dataRepository.save(data);
    }

    async addSafeCount(projectName: string): Promise<void> {
        const report = await this.findReport(projectName);

        /* Safe 카운트 횟수 1 증가하여, DB에 업데이트 */
        const data = await this.dataRepository.findOneBy({ id: report.id });
        data.safeNum = data.safeNum + 1;
        await this.dataRepository.save(data);
    }

    // async updateReport() {}

    async getAllReport(): Promise<Report[]> {
        const reports = await this.reportRepository.find();

        for (let i = 0; i < reports.length; i++) {
            const reportData = await this.dataRepository.findOneBy({ id: reports[i].id });
            reports[i].data = reportData;
        }
        return reports;
    }
}
