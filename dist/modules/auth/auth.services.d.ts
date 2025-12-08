export declare const authServices: {
    createUser: (name: string, email: string, password: string, phone: string, role: string) => Promise<import("pg").QueryResult<any>>;
    loginUser: (email: string, password: string) => Promise<any>;
};
//# sourceMappingURL=auth.services.d.ts.map