const assignPullRequest = (message) => {
    const pullRequest = getPullRequestDetailsFromMessage(message);
    console.log(pullRequest);
}

const getPullRequestDetailsFromMessage = (message) => {
    const matches = message.match(/github.com\/(.*?)\/(.*?)\/pull\/(\d+)/);
    if(!matches || matches.length !== 4) {
        throw new Error('Invalid message format');
    }
    const [, owner, repo, pullRequestId] = matches;
    return {
        owner,
        repo,
        pullRequestId
    }
}

export { assignPullRequest }