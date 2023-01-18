import { Data } from "src/report_data/data.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    project_name: string;

    @OneToOne(() => Data, (data) => data.chain_id)
    @JoinColumn()
    data: Data;

    @Column()
    reason: string;

    @Column()
    reporter: string;

    @Column({ default: 0 })
    safeNum: number;

    @Column({ default: 1 })
    reportNum: number;
}
