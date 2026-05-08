import {Entity, model, property} from '@loopback/repository';

export type RoomStatus = 'available' | 'booked';

@model({
  settings: {
    mongodb: {
      collection: 'rooms',
    },
  },
})
export class Room extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
    mongodb: {
      dataType: 'ObjectID',
    },
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    mongodb: {
      dataType: 'ObjectID',
    },
  })
  hotelId: string;

  @property({
    type: 'string',
    required: true,
  })
  number: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  capacity: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['available', 'booked'],
    },
  })
  status: RoomStatus;

  constructor(data?: Partial<Room>) {
    super(data);
  }
}

export interface RoomRelations {
  // describe navigational properties here
}

export type RoomWithRelations = Room & RoomRelations;
