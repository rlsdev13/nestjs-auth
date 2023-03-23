import { MongoExceptionFilter } from './mongo.filter';

describe('MongoFilter', () => {
  it('should be defined', () => {
    expect(new MongoExceptionFilter()).toBeDefined();
  });
});
