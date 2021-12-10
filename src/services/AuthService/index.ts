import { decode } from 'jsonwebtoken';
import { UserRole } from '@/classes/User/Types/UserRole';
import { HttpService } from '../HttpService';

class AuthService {
  private authenticated : boolean;
  private subjectId : string;
  private role : UserRole;

  private PATHS = {
    login: '/user/login',
    signup: '/user',
    requestVerification: '/user/request-account-verification',
    verifyUser: '/user/verify-account',
    requestPasswordReset: '/user/request-password-reset',
    resetPassword: '/user/reset-password',
    requestEmailVerification: '/user/request-email-verification',
    changePassword: '/user/change-password',
  };

  public constructor() {
    const token = localStorage.getItem('token');
    if (token) {
      const payload: any = decode(token);
      this.authenticated = true;
      this.subjectId = payload.sub;
      this.role = payload.role;
    } else {
      this.authenticated = false;
      this.subjectId = null;
      this.role = null;
    }
  }

  public isAuthenticated() : boolean {
    return this.authenticated;
  }

  public getSubjectId(): string {
    return this.subjectId;
  }

  public getRole(): UserRole {
    return this.role;
  }

  public async login(mobile : string, password : string, fcmToken: string)
  : Promise<string> {
    const data = new FormData();
    data.append('mobile', mobile);
    data.append('password', password);
    if (fcmToken) {
      data.append('FCMToken', fcmToken);
    }
    try {
      const response = await HttpService.post(this.PATHS.login, data);
      const token: string = response.data.token;
      localStorage.setItem('token', token);
      const payload: any = decode(token);
      this.authenticated = true;
      this.subjectId = payload.sub;
      this.role = payload.role;
      return response.data;
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }

  public async requestVerification(mobile: string) : Promise<void> {
    const data = new FormData();
    data.append('mobile', mobile);
    try {
      await HttpService.post(this.PATHS.requestVerification, data);
      return Promise.resolve();
    } catch (error) {
      console.log(typeof error);
      if (error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject();
    }
  }

  public async verifyUser(mobile: string, code: string) : Promise<void> {
    const data = new FormData();
    data.append('mobileNo', mobile);
    data.append('code', code);
    try {
      await HttpService.put(this.PATHS.verifyUser, data);
      return Promise.resolve();
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }

  public async requestPasswordReset(mobile: string) : Promise<void> {
    const data = new FormData();
    data.append('mobile', mobile);
    try {
      await HttpService.post(this.PATHS.requestPasswordReset, data);
      return Promise.resolve();
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }

  public async resetPassword(
    mobile: string,
    resetCode: string,
    newPassword: string,
  ) : Promise<void> {
    try {
      const data = new FormData();
      data.append('mobile', mobile);
      data.append('resetCode', resetCode);
      data.append('newPassword', newPassword);
      await HttpService.put(this.PATHS.resetPassword, data);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async requestEmailVerification(): Promise<void> {
    try {
      const data = new FormData();
      data.append('id', this.getSubjectId());
      await HttpService.post(this.PATHS.requestEmailVerification, data);
      return Promise.resolve();
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }

  public async changePassword(currentPassword: string, newPassword: string)
  : Promise<void> {
    try {
      const data = new FormData();
      data.append('id', this.getSubjectId());
      data.append('currentPassword', currentPassword);
      data.append('newPassword', newPassword);
      await HttpService.put(this.PATHS.changePassword, data);
      return Promise.resolve();
    } catch (error) {
      if (error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }

  public logout() : void {
    localStorage.removeItem('token');
    this.authenticated = false;
  }
}

const instance = new AuthService();

export {
  instance as AuthService,
};