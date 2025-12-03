import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({ timestamps: true })
export class Contact {
  @Prop({ required: true })
  name?: string;

  @Prop()
  email?: string;

  @Prop({ required: true, unique: true })
  phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
