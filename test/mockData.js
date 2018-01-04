import jwt from 'jsonwebtoken';

import app from '../server';

export const nonAdminToken = jwt.sign({
  userId: 1,
  username: 'normalUser',
  firstName: 'norms',
  lastName: 'User',
  role: 'User',
}, app.settings.JsonSecret);
export const fakeMailInfo = {
  userEmail:
    'fakeemail@example.com',
  userFirstName:
    'fake Firstname',
  userLastName:
    'fake Lastname',
  username:
    'fakeUsername'
};
export const fakeMailInfoWrong = {
  userFirstName:
    'fake Firstname',
  userLastName:
    'fake Lastname',
  username:
    'fakeUsername'
};
export const fakeToken = 'thisisafaketokenyoudig';
export const invalidSignedToken = jwt.sign(
  {
    userId: 1,
    username: 'adminUser',
    firstName: 'admin',
    lastName: 'User',
    role: 'admin',
  }, 'fakeSecretcodefam');
export const expiredToken = jwt.sign({
  userId: 1,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User',
  role: 'Admin',
  iat: Math.floor(Date.now() / 1000) - 172800, // generated 2 days ago
  exp: Math.floor(Date.now() / 1000) - 86400, // expired 1 day ago
}, app.settings.JsonSecret);
export const noRoleToken = jwt.sign({
  userId: 1,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User'
}, app.settings.JsonSecret);
export const randomToken = jwt.sign({
  userId: 1,
  username: 'username',
  firstName: 'admin',
  lastName: 'User',
  role: 'User',
}, app.settings.JsonSecret);
export const firstValidToken = jwt.sign({
  userId: 1,
  username: 'SomebodyElse',
  firstName: 'Somebody',
  lastName: 'Else',
  role: 'User',
}, app.settings.JsonSecret);
export const secondValidToken = jwt.sign({
  userId: 2,
  username: 'SomebodyElse',
  firstName: 'Somebody',
  lastName: 'Else',
  role: 'User',
}, app.settings.JsonSecret);
export const todayDate = new Date();
export const expiredActivationToken = jwt.sign({
  username: 'SomebodyElse',
  userId: 1,
  email: 'somebodyelse@user.com.ng',
  authString: 'b921f6ff61ef9e63e4e38dfcedcd79ebdc16a66afef169e9',
  iat: Math.floor(Date.now() / 1000) - 172800, // generated 2 days ago
  exp: Math.floor(Date.now() / 1000) - 86400, // expired 1 day ago
}, app.settings.JsonSecret);
export const invalidUserActivationToken = jwt.sign({
  username: 'SomebodyElse',
  userId: 99999, // invalid user ID here
  email: 'somebodyelse@user.com.ng',
  authString: 'b921f6ff61ef9e63e4e38dfcedcd79ebdc16a66afef169e9',
}, app.settings.JsonSecret,
  {
    expiresIn: '24h',
  });
export const invalidActivationToken = jwt.sign({
  username: 'fakeuser', // token not generated for user
  userId: 1,
  email: 'fake@user.com.ng',
  authString: 'b921f6ff61ef9e63e4e38dfcedcd79ebdc16a66afef169e9',
}, app.settings.JsonSecret,
  {
    expiresIn: '24h',
  });
export const badSignatureActivationToken = jwt.sign({
  username: 'SomebodyElse',
  userId: 1, // invalid user ID here
  email: 'somebodyelse@user.com.ng',
  authString: 'b921f6ff61ef9e63e4e38dfcedcd79ebdc16a66afef169e9',
}, 'fakeToken_secret_here',
  {
    expiresIn: '24h',
  });
export const firstGoodToken = jwt.sign({
  userId: 1,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User',
  role: 'Admin',
}, app.settings.JsonSecret);
export const invalidUserIdToken = jwt.sign({
  userId: 'ab3c',
  username: 'normalUser',
  firstName: 'user',
  lastName: 'surname',
  role: 'User',
}, app.settings.JsonSecret);
export const secondGoodToken = jwt.sign({
  userId: 2,
  username: 'SomebodyElse',
  firstName: 'Somebody',
  lastName: 'Else',
  role: 'User',
}, app.settings.JsonSecret);
export const goodTokenInvalidUser = jwt.sign({
  userId: 60,
  username: 'adminUser',
  firstName: 'admin',
  lastName: 'User',
  role: 'Admin',
}, app.settings.JsonSecret);
export const due = todayDate.setMonth(todayDate.getMonth() + 1);
