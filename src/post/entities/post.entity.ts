
export class Post {
  constructor(
    private readonly post: Node,
    private readonly title: string,
    private readonly summary:string,
    private readonly body: string,
    private readonly approved: boolean
    // Author – the author of this post (the user which uploaded this post)
    // Community – the community this post belongs to (See community)
    // Likes – a number representing the number of likes this post got
    // Status – Pending approval/Approved. A post is in pending state until it’s approved by a moderator/super moderator. Once it’s approved it becomes publicly open (see Viewing + approving posts)
  ) {


  }
}
