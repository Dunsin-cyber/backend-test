export class ApiResponse<T> {
    status: "success" | "fail";
    data: T | string;

    constructor(status: "success" | "fail", data: T | string) {
        this.status = status;
        this.data = data;
    }
}
