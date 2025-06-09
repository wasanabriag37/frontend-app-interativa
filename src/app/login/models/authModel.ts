export interface JwtPayload {
  user: {
    userId: number;
    username: string;
    employeeCode: number;
    email?: string;
    phone?: string;
    names: string;
    lastNames: string;
    permissions: Array<{
      name: string;
      permissionId: number
    }>;
  };
  sub: string;
  iat: number;
  exp: number;
}