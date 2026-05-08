import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    mongodb: {
      collection: 'hotels',
    },
  },
})
export class Hotel extends Entity {
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
  })
  title: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  rating: number;

  constructor(data?: Partial<Hotel>) {
    super(data);
  }
}

export interface HotelRelations {
  // describe navigational properties here
}

export type HotelWithRelations = Hotel & HotelRelations;
