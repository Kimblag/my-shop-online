export default interface IServerResponse{
    status: string,
    message: string,
    data?: any
    errors?: object
}