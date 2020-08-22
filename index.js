const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/rest");

async function run() {
  try {
    const githubToken = core.getInput("GITHUB_TOKEN");
    const octokit = new Octokit({ auth: githubToken });
    const customMessage = core.getInput("message");
    const { context } = github;
    const repository = context.payload.repository;
    const email = await octokit.request("GET /user/emails");
    const user = await octokit.request("GET /user");
    console.log(user, "user", email, "email");
    if (context.payload.review && context.payload.action === "submitted") {
      const issueNumber = context.payload.pull_request.number;
      const reviewComment = context.payload.review.body;
      const reviewObject = context.payload.review;

      const commentAuthor = reviewObject.user.login;

      const message = customMessage
        ? customMessage
        : `Hey @${email}! 👋 <br/> You commented ${reviewComment} have a good day🙂`;

      return octokit.issues.createComment({
        owner: repository.owner.login,
        repo: repository.name,
        issue_number: issueNumber,
        body: message,
      });
    }
    if (context.payload.comment) {
      if (
        context.payload.action === "created" ||
        context.payoad.action === "edited"
      ) {
        const issueNumber = context.payload.issue.number;

        // const comment = [context.payload.comment.body];
        const commentObject = context.payload.comment;

        const commentAuthor = commentAuthor.user.login;
        const comment = commentObject.body;
        const message = customMessage
          ? customMessage
          : `Hey @${email}! 👋 <br/> You commented ${comment} have a great day🙂`;

        return octokit.issues.createComment({
          owner: repository.owner.login,
          repo: repository.name,
          issue_number: issueNumber,
          body: message,
        });
      }
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
