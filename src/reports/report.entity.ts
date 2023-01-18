import { Data } from "src/report_data/data.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    project_name: string;

    @OneToOne(() => Data, (data) => data.chain_id, { cascade: true })
    @JoinColumn()
    data: Data;

    @Column()
    reporter: string;
}
