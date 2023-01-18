import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ReportsModule } from "./reports/reports.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { Report } from "./reports/report.entity";
import { Data } from "./report_data/data.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: "sqlite",
            database: "db.sqlite",
            entities: [Report, Data],
            synchronize: true,
        }),
        ReportsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
