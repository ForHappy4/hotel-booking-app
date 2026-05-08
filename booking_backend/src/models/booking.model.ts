import {Entity, model, property} from '@loopback/repository';

export type BookingStatus = 'active' | 'cancelled';

@model({
  settings: {
    mongodb: {
      collection: 'bookings',
    },
  },
})
export class Booking extends Entity {
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
  userId: string;

  @property({
    type: 'string',
    required: true,
    mongodb: {
      dataType: 'ObjectID',
    },
  })
  roomId: string;

  @property({
    type: 'date',
    required: true,
  })
  checkIn: Date;

  @property({
    type: 'date',
    required: true,
  })
  checkOut: Date;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: ['active', 'cancelled'],
    },
  })
  status: BookingStatus;

  @property({
    type: 'date',
    required: true,
  })
  createdAt: Date;

  constructor(data?: Partial<Booking>) {
    super(data);
  }
}

export interface BookingRelations {
  // describe navigational properties here
}

export type BookingWithRelations = Booking & BookingRelations;
