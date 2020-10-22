import RequestModel from "../RequestModel";
import {REGISTER} from "../methods";

export default class RegisterRequest extends RequestModel {
    service = 'auth'
    method = REGISTER
    data = {
        email: '',
        username: '',
        password: ''
    }
}
