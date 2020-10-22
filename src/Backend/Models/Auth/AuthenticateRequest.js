import RequestModel from "../RequestModel";

export default class AuthenticateRequest extends RequestModel{
    service = 'auth'
    method = 'authenticate'
    data = {
        username: '',
        password: '',
    }

}
