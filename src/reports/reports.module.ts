import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportsService } from "./reports.service";
import { Report } from "./report.entity";
import { Data } from "src/report_data/data.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Report, Data])],
    controllers: [],
    providers: [ReportsService],
    exports: [ReportsService],
})
export class ReportsModule {}
