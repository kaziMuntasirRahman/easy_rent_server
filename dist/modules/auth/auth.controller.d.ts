import { Request, Response } from "express";
export declare const authController: {
    createUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    loginUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=auth.controller.d.ts.map