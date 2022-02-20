


import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

@ValidatorConstraint({ name: 'MaxWords', async: false })
export class WatchWords implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    var watchList = ['c++', 'java', 'scheme']

    var str = text.replace(/(^\s*)|(\s*$)/gi, "");
    str = str.replace(/[ ]{2,}/gi, " ");
    str = str.replace(/\n /, "\n");
    const forbiddenWords = str.split(' ')
    for (const forbiddenWord in forbiddenWords) {
      if (watchList.includes(forbiddenWord))
        return false;
    }

    return true
  }
  defaultMessage(args: ValidationArguments) {
    // here you can provide default error message if validation failed
    return `Text is longer than ${args.constraints[0]} words!`;
  }
}

export class WatchListHandler {
  validateAndInform(text: string, user: User){
    var watchList = ['c++', 'java', 'scheme']

    var str = text.replace(/(^\s*)|(\s*$)/gi, "");
    str = str.replace(/[ ]{2,}/gi, " ");
    str = str.replace(/\n /, "\n");
    const words = str.split(' ')
    var userForbiddenWords = []
    for (const word in words) {
      if (watchList.includes(word)) {
        userForbiddenWords.push(word)
      }
    }

    if (userForbiddenWords.length > 0) {
      sendWarnningEmail(user, userForbiddenWords, text)
      return false
    }
    return true
  }
}
function sendWarnningEmail(user: User, userForbiddenWords: string[], text: string) {
  //TODO: format nice message for user went Koko...
  console.log(`User went KoKo`)
}

