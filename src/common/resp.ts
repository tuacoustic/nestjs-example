// Struct API resp:
// 1. Success
// {
//     "status": number,
//     "data": []
// }
// 2. Failed
// {
//     "status": number,
//     "data": [
//         "error_code": string,
//         "message": string,
//     ]
// }

export interface Resp {
    status: number,
    data: any,
    message?: string,
    error?: string,
}