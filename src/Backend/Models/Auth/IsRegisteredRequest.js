import RequestModel from "../RequestModel";
import {ISREGISTERED} from "../methods";

export default class IsRegisteredRequest extends RequestModel {
    service = 'auth'
    method = ISREGISTERED
    data = {
        username: '',
        email: '',
    }
}
