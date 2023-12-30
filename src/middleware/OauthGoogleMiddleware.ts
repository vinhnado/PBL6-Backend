import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

export const googleMiddleware = (req: any, res: any, next: any) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || 'defaultClientId',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'defaultClientSecret',
        callbackURL: process.env.GOOGLE_CLIENT_CALLBACK || 'http://localhost:8000/api/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // Kiểm tra xem người dùng đã đăng nhập hay là mới
        if (req.isAuthenticated()) {
          // Nếu đã đăng nhập, thực hiện chức năng liên kết
          const user = req.user;
         console.log(user)
          // Kiểm tra xem tài khoản đã liên kết chưa
          if (!user.linkedAccounts) {
            user.linkedAccounts = [];
          }

          // Kiểm tra xem tài khoản Google đã liên kết chưa
          const existingGoogleAccount = user.linkedAccounts.find(
            (account: any) => account.provider === 'google' && account.id === profile.id
          );

          if (existingGoogleAccount) {
            // Nếu đã liên kết, chuyển đến trang chủ hoặc trả về thông báo liên kết đã tồn tại
            return done(null, user);
          }

          // Nếu chưa liên kết, thêm tài khoản Google vào danh sách liên kết
          user.linkedAccounts.push({
            provider: 'google',
            id: profile.id,
            displayName: profile.displayName,
            email: profile.emails ? profile.emails[0].value : null,
          });

          // Cập nhật thông tin tài khoản đã đăng nhập (ví dụ: lưu vào cơ sở dữ liệu)
          // Đây chỉ là ví dụ, bạn có thể thay thế bằng cách lưu vào cơ sở dữ liệu của bạn
          // userDB.update(user);

          return done(null, user);
        } else {
          // Nếu là người dùng mới, tạo tài khoản mới và thực hiện đăng nhập
          const user = {
            id: profile.id,
            displayName: profile.displayName,
            email: profile.emails ? profile.emails[0].value : null,
            // Thêm các thông tin khác nếu cần
          };

          // Tạo JWT
          const token = jwt.sign(user, 'YOUR_JWT_SECRET', { expiresIn: '1h' });

          return done(null, { user, token });
        }
      }
    )
  );
  next();
};