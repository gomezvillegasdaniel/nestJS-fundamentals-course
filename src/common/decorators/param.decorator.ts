import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParamDecorator = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    // this decorator could be renamed as you want,
    // it could also be used to execute some code using the argument and return a value
    return `from a param decorator: this is an argument: ${data}`;
  },
);
