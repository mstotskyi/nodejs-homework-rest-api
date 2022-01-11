import { HttpCode } from '../../libs/constants';
import AuthService from '../../service';

const authService = new AuthService();

export const registration = async (req, res, next) => {
  const { email } = req.body;
  const isUserExist = await authService.isUserExist(email);
  if (isUserExist) {
    return res.status(HttpCode.CONFLICT).json({
      status: 'error',
      code: HttpCode.CONFLICT,
      message: 'Email in use',
    });
  }
  const data = await authService.create(req.body);
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.getUser(email, password);
  if (!user) {
    return res.status(HttpCode.UNAUTHORIZED).json({
      status: 'error',
      code: HttpCode.UNAUTHORIZED,
      message: 'Not authorized',
    });
  }
  const token = authService.getToken(user);
  await authService.setToken(user.id, token);
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { token },
  });
};

export const current = (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { email, subscription },
  });
};

export const logout = async (req, res, next) => {
  await authService.setToken(req.user.id, null);
  res.status(HttpCode.NO_CONTENT).json({
    status: 'success',
    code: HttpCode.NO_CONTENT,
  });
};

export const updateSubscription = async (req, res, next) => {
  const { id, subscription } = req.body;
  console.log(req.body);
  const { name, email } = await authService.updateUserSubscription(
    id,
    subscription,
  );
  res.status(HttpCode.OK).json({
    status: 'success',
    code: HttpCode.OK,
    data: { id, name, email, subscription },
  });
};
