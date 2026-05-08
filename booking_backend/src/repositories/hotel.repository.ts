import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Hotel, HotelRelations} from '../models';

export class HotelRepository extends DefaultCrudRepository<
  Hotel,
  typeof Hotel.prototype.id,
  HotelRelations
> {
  constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
    super(Hotel, dataSource);
  }
}
