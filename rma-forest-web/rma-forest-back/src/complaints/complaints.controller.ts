import { Controller, Post, Body, Get, Put, Param, UseGuards } from '@nestjs/common';
import { ComplaintsService } from './complaints.service';
import { AuthGuard } from '@nestjs/passport';
import { ComplaintStatus } from 'src/entities/complaints.entity';

@Controller('complaints')
export class ComplaintsController {
  constructor(private readonly complaintsService: ComplaintsService) {}

  @Post('create')
  async create(@Body() body: {
    subject: string;
    message: string;
    name?: string;
    email?: string;
    isAnonymous: boolean;
    recaptchaToken: string;
    relationship?: string;
    location?: string;
    incidentDate?: string;
    accused?: string;
  }) {
    try {
      const complaint = await this.complaintsService.create({
        subject: body.subject,
        message: body.message,
        name: body.isAnonymous ? undefined : body.name,
        email: body.isAnonymous ? undefined : body.email,
        isAnonymous: body.isAnonymous,
        recaptchaToken: body.recaptchaToken,
        relationship: body.relationship,
        location: body.location,
        incidentDate: body.incidentDate ? new Date(body.incidentDate) : undefined,
        accused: body.accused,
      });
      return { success: true, message: 'Complaint submitted successfully', id: (complaint as any).id };
    } catch (error) {
      return { success: false, message: 'Error submitting complaint' };
    }
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    return this.complaintsService.findAll();
  }

  @Put(':id/status')
  @UseGuards(AuthGuard('jwt'))
  async updateStatus(@Param('id') id: number, @Body() body: { status: ComplaintStatus }) {
    return this.complaintsService.updateStatus(id, body.status);
  }
}