import { User } from '../models/user';
import { AddressPipe } from './address.pipe';

const testData: User['address'] = {
  city: 'Tel Aviv',
  geo: {
    lat: '1.23',
    lng: '2.34',
  },
  street: 'Manne',
  suite: '11',
  zipcode: '12345',
};

describe('AddressPipe', () => {
  let pipe: AddressPipe;
  beforeEach(() => {
    pipe = new AddressPipe();
  });
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform the address properly', () => {
    expect(pipe.transform(testData)).toBe('11 Manne, Tel Aviv');
  });
});
