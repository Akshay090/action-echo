# action-echo - Github action

A Github action which echoes your comment added to PRs and issues.

It currently works when comments are posted on issues and PRs, as well as when pull request reviews are submitted.

## How to use

_If you do not have any Github actions already set up in your repo, start by creating a .github/workflows folder._

Inside your workflows folder, create a new .yml file, for example `main.yml` and copy the following lines:

```yml
on: [issue_comment, pull_request_review]

jobs:
  toxic_check:
    runs-on: ubuntu-latest
    name: action echo
    steps:
      - uses: actions/checkout@v2
      - name: action-echo - action step
        uses: Akshay090/action-echo@master
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

`GITHUB_TOKEN` is **required** but two other parameters are optional:

- `message` - a custom message you'd like to display in the automatic comment

```yml
on: [issue_comment, pull_request_review]

jobs:
  toxic_check:
    runs-on: ubuntu-latest
    name: action echo
    steps:
      - uses: actions/checkout@v2
      - name: action echo - action step
        uses: Akshay090/action-echo@master
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          message: "this is my custom message"
```

