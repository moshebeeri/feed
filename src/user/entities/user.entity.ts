import { Node } from 'neo4j-driver'

export class User {

  constructor(
    private readonly user: Node,
    private readonly name: string,
    // private readonly role:string,
    // private readonly email: string,
    private readonly image: string,
    // private readonly country: string,
    //Communities – a user can belong to any number of communities.
    ) {


  }

}
