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

    @OneToOne(() => Report, (report) => report.data)
    report: Report;
}
