import { Expose, Type } from 'class-transformer';
import { UserDto } from '../../users/dto/user.dto';

export class ResponseLogingDto {
    @Expose()
    access_token : string;

    @Expose()
    @Type(() => UserDto)
    user : UserDto;
}