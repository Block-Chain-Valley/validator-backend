import { Column, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    address: string;

    @UpdateDateColumn()
    last_report: Date;

    @Column({ default: 0 })
    daily_report_num: number;
}
