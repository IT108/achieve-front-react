import RequestModel from "../RequestModel";
import {REGISTER} from "../methods";

export default class RegisterResponse extends RequestModel {
    responseCode
    error
    IsEmailRegistered
    IsUsernameRegistered
}
