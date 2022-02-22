import { Field, ID, ObjectType } from "type-graphql";
import { Entity, Column, ObjectIdColumn, BaseEntity, ObjectID } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {

  @Field(()=> ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({unique: true})
  email: string;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  mobile : string

  @Column()
  password : string

  @Field()
  @Column()
  confirmed : boolean
}
