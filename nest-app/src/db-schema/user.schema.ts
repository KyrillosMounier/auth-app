import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import config from '../config';

@Schema({ collection: config.db_collection_name })
export class User extends Document {
    @Prop({ required: true })
    fullName: string;
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
