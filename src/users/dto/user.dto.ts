import { Expose } from 'class-transformer';

export class UserDto{
    @Expose()
    id : string;

    @Expose()
    name : string;

    @Expose()
    lastNameF : string;

    @Expose()
    lastNameM : string;

    @Expose()
    email : string;
}