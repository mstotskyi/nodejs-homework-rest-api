/* eslint-disable no-unused-vars */
import { HttpCode } from '../../libs/constants';
import repositoryUsers from '../../repository/users';
import { EmailService, SenderSendGrid } from '../../service/email';

import {
  UploadFileService,
  // eslint-disable-next-line no-unused-vars
  LocalFileStorage,
  CloudFileStorage,
} from '../../service/file-storage';

const uploadAvatar = async (req, res, next) => {
  const uploadService = new UploadFileService(
    LocalFileStorage,
    req.file,
    req.user,
  );
  const avatarUrl = await uploadService.updateAvatar();
  res
    .status(HttpCode.OK)
    .json({ status: 'success', code: HttpCode.OK, data: { avatarUrl } });
};

const verifyUser = async (req, res, next) => {
  const verifyToken = req.params.token;
  const currentUser = await repositoryUsers.findByVerifyToken(verifyToken);

  if (currentUser) {
    await repositoryUsers.updateVerify(currentUser.id, true);

    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      data: { message: 'Success' },
    });
  }
  res.status(HttpCode.BAD_REQUEST).json({
    status: 'success',
    code: HttpCode.BAD_REQUEST,
    data: { message: 'Invalid token' },
  });
};

const repeatEmailForVrifyUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await repositoryUsers.findByEmail(email);
  if (user) {
    const { email, name, verifyToken } = user;
    const emailService = new EmailService(
      process.env.NODE_ENV,
      new SenderSendGrid(),
    );
    const isSend = await emailService.sendVerifyEmail(email, name, verifyToken);
    if (isSend) {
      return res.status(HttpCode.OK).json({
        status: 'success',
        code: HttpCode.OK,
        data: { message: 'Success' },
      });
    }
    return res.status(HttpCode.UE).json({
      status: 'error',
      code: HttpCode.UE,
      data: { message: 'Unprocessable Entity' },
    });
  }

  res.status(HttpCode.NOT_FOUND).json({
    status: 'error',
    code: HttpCode.NOT_FOUND,
    data: { message: `User with ${email} not found` },
  });
};

export { uploadAvatar, verifyUser, repeatEmailForVrifyUser };
