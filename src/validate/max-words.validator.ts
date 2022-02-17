


import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'MaxWords', async: false })
export class MaxWords implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    var str = text.replace(/(^\s*)|(\s*$)/gi, "");
    str = str.replace(/[ ]{2,}/gi, " ");
    str = str.replace(/\n /, "\n");
    const textLength = str.split(' ').length;
    return textLength <= args.constraints[0]
  }
  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `Text is longer than ${args.constraints[0]} words!`;
  }
}
