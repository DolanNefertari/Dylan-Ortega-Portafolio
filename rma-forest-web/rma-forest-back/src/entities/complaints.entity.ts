
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export type ComplaintStatus = 'received' | 'in_review' | 'closed';
@Entity('complaints')
export class Complaint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  email: string;

  @Column({ default: false })
  isAnonymous: boolean;

  @Column({ type: 'varchar', length: 20, default: 'received' })
  status: ComplaintStatus;

  @Column({ nullable: true })
  relationship: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  incidentDate: Date;

  @Column({ nullable: true })
  accused: string;

  @CreateDateColumn()
  createdAt: Date;
}