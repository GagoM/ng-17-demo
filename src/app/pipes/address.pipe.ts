import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'address',
  standalone: true,
})
export class AddressPipe implements PipeTransform {
  transform(value: User['address'], ...args: unknown[]): unknown {
    return `${value.suite} ${value.street}, ${value.city}`;
  }
}
