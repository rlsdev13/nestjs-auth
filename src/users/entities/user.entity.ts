import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true
})
export class User {
    @Prop({
        required: [true, 'The name is required']
    })
    name: string;

    @Prop({
        required: [true, 'The last name is required']
    })
    lastNameF: string;

    @Prop({
        required: [true, 'The last name is required']
    })
    lastNameM: string;

    @Prop({
        required: [true, 'The email is required'],
        unique : [true, 'The email already exist']
    })
    email: string;

    @Prop({
        required: [true, 'The password is required']
    })
    password: string;

    @Prop({
        default : false
    })
    deleted: boolean = false;

}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function () {
    const hash = await bcrypt.hashSync(this.password, 10);
    this.password = hash;
})