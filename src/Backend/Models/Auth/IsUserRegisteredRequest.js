import RequestModel from "../RequestModel";
import {IS_EMAIL_REGISTERED, IS_USER_REGISTERED, ISREGISTERED} from "../methods";

export default class IsUserRegisteredRequest extends RequestModel {
    service = 'auth'
    method = IS_USER_REGISTERED
    data = {
        username: '',
    }
}
