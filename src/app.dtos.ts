import { IsDate, IsNumber, IsString } from "class-validator";
import { IsAddress } from "./dtos.validation";

export class UserReq {
    @IsAddress()
    address: string;
}

export class ReportReq {
    @IsString()
    project_name: string;

    data: ProjectDataReq;

    @IsString()
    reason: string;

    @IsAddress()
    reporter: string;
}

export class ProjectDataReq {
    @IsString()
    chain_id: string;

    @IsString()
    address: string;

    @IsString()
    url: string;
}

export class UserDto {
    address: string;
}

export class ReportDto {
    project_name: string;
    data: ProjectDataDto;
    reason: string;
    reporter: string;
}

export class AddReportDto {
    project_name: string;
    data: ProjectDataDto;
    reason: string;
    reporter: string;
    safeNum: number;
    reportNum: number;
}

export class ProjectDataDto {
    chain_id: string;
    address: string;
    url: string;
}

export class BaseRes {
    resultCode: string;
    message: string;
}

export class UserRes extends BaseRes {
    address: string;
    last_report: Date;
    daily_report_num: number;
}

export class ReportRes extends BaseRes {}
