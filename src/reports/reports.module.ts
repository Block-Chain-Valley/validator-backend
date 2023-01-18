import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportsService } from "./reports.service";
import { Report } from "./report.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Report])],
    controllers: [],
    providers: [ReportsService],
    exports: [ReportsService],
})
export class ReportsModule {}
