import { Test, TestingModule } from '@nestjs/testing';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';

describe('ContactController', () => {
  let controller: ContactController;
  let sendEmail: jest.Mock;

  beforeEach(async () => {
    sendEmail = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactController],
      providers: [
        {
          provide: ContactService,
          useValue: { sendEmail },
        },
      ],
    }).compile();

    controller = module.get<ContactController>(ContactController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendContact', () => {
    it('returns error when fields missing', async () => {
      const result = await controller.sendContact({
        nombre: '',
        email: 'a@b.com',
        mensaje: 'hi',
        privacy: true,
      });
      expect(result).toEqual({
        success: false,
        message: 'Todos los campos son obligatorios',
      });
      expect(sendEmail).not.toHaveBeenCalled();
    });

    it('returns error when privacy false', async () => {
      const result = await controller.sendContact({
        nombre: 'Juan',
        email: 'a@b.com',
        mensaje: 'hi',
        privacy: false,
      });
      expect(result).toEqual({
        success: false,
        message: 'Debes aceptar la política de privacidad',
      });
      expect(sendEmail).not.toHaveBeenCalled();
    });

    it('returns error when email invalid', async () => {
      const result = await controller.sendContact({
        nombre: 'Juan',
        email: 'not-an-email',
        mensaje: 'hi',
        privacy: true,
      });
      expect(result).toEqual({
        success: false,
        message: 'El email no es válido',
      });
      expect(sendEmail).not.toHaveBeenCalled();
    });

    it('calls service when valid', async () => {
      sendEmail.mockResolvedValueOnce({
        success: true,
        message: 'sent',
      });

      const result = await controller.sendContact({
        nombre: 'Juan',
        email: 'juan@test.com',
        mensaje: 'Hola',
        privacy: true,
      });

      expect(sendEmail).toHaveBeenCalledWith({
        nombre: 'Juan',
        email: 'juan@test.com',
        mensaje: 'Hola',
      });
      expect(result).toEqual({ success: true, message: 'sent' });
    });
  });
});
