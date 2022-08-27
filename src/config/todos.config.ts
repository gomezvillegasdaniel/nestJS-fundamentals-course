import { registerAs } from '@nestjs/config';

export default registerAs('todos', () => ({
  foo: 'bar',
}));
