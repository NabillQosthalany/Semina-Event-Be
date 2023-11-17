const UserRefreshToken = require("../../api/v1/userRefreshToken/model");
const { NotFoundError } = require("../../errors");
const { createJWT, createTokenUser } = require("../../utils");
const { isTokenValidRefreshToken } = require("../../utils/jwt");

const createUserRefreshToken = async (payload) => {
  const result = await UserRefreshToken.create(payload);
};

const getUserRefreshToken = async (req) => {
  const { refreshToken } = req.params;
  const result = await UserRefreshToken.findOne({
    refreshToken,
  });
  if (!result) throw new NotFoundError(`refreshtoken tidak valid`);

  const payload = isTokenValidRefreshToken({ token: result.refreshToken });

  const userCheck = await Users.findOne({ email: payload.email });

  const token = createJWT({ payload: createTokenUser(userCheck) });

  return token;
};

module.exports = { createUserRefreshToken, getUserRefreshToken };
