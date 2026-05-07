import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('login_logs')
export class LoginLog {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  ip: string;

  @CreateDateColumn()
  loginTime: Date;
}