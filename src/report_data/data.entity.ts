import { Report } from "src/reports/report.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Data {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    chain_id: string;

    @Column()
    address: string;

    @Column()
    url: string;

    @Column()
    reason: string;

    @Column({ default: 0 })
    safeNum: number;

    @Column({ default: 1 })
    reportNum: number;

    @OneToOne(() => Report, (report) => report.data)
    report: Report;
}
