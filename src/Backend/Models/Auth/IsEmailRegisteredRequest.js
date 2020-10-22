import RequestModel from "../RequestModel";
import {IS_EMAIL_REGISTERED, ISREGISTERED} from "../methods";

export default class IsEmailRegisteredRequest extends RequestModel {
    service = 'auth'
    method = IS_EMAIL_REGISTERED
    data = {
        email: '',
    }
}
