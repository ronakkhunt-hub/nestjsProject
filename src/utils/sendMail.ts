import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class sendMailerService {
  constructor(private mailer: MailerService) {}

  async sendMailForStudent(email, data) {
    await this.mailer.sendMail({
      from: 'ronak.amylesoft@gmail.com',
      to: email,
      template: join(__dirname, '../../../assets/template.hbs'),
      context: {
        email: email,
        password: data.password,
      },
    });
  }
}
