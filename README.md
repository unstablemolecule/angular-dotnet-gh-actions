# Angular .NET Core GitHub Actions

[![CI](https://github.com/unstablemolecule/angular-dotnet-gh-actions/actions/workflows/ci.yml/badge.svg)](https://github.com/unstablemolecule/angular-dotnet-gh-actions/actions/workflows/ci.yml) [![CD](https://github.com/unstablemolecule/angular-dotnet-gh-actions/actions/workflows/cd.yml/badge.svg)](https://github.com/unstablemolecule/angular-dotnet-gh-actions/actions/workflows/cd.yml)

Sample project playground for testing the implementation of a CI/CD pipeline using GitHub Actions. It should cover the following processes for both the client and the web API:

- Linting
- Unit testing
- End-to-end testing
- Building
- Deployment

## Tools

Name | Version
--|--
Angular | [14](v14.angular.io/docs)
Jasmine | [4.3.0](https://jasmine.github.io)
Karma | [6.4.0](https://karma-runner.github.io/latest/index.html)
Cypress | [12](https://docs.cypress.io/guides/overview/why-cypress)
<span>ASP.</span>NET Core | [6](https://docs.microsoft.com/en-us/aspnet/core/getting-started/?view=aspnetcore-6.0&tabs=windows)
Azure Static Web Apps | [Latest](https://learn.microsoft.com/en-us/azure/static-web-apps/)
Azure App Service | [Latest](https://learn.microsoft.com/en-us/azure/app-service/)

## Installation

For the web API, make sure to have the latest [.NET 6.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/6.0) installed. For installing the client dependencies, navigate to the `client/` directory and run `npm i`, use **Node v16** or higher.

## Development

Open the solution located at `api/AngularDotnetGHActions.sln` with [Visual Studio](https://visualstudio.microsoft.com) and run the project. The web API will be available to test at [http://localhost:5000](http://localhost:5000). To run the dev server at [http://localhost:4200](http://localhost:4200) for the Angular app run `npm start` in the `client/` directory, it will automatically reload if you change any of the client source files.

For linting the client code, run `npm run lint`.

### Testing

For unit testing, run `npm run test` in the `client/` directory to launch Karma on Google Chrome. For e2e testing run `npm run cy:open` to launch Cypress' Electron instance, choose the *E2E Testing option* on the left, select your desired browser and click on the *Start E2E Testing* option on the bottom. From there you can start running whatever specs are available. Any changes to the client source files will trigger a test run on both testing methods.

Optionally, for a headless one-time test run, run `npm run test:headless` and `npm run cy:run` for unit and e2e testing respectively.

## Build

For building the web API, run `dotnet publish -c Release` in the `api/` directory, the artifacts will be available in the defaut location under the same directory. For building the client app, run `npm run build:deploy` in the `client/` directory, the artifacts will be available in the `client/dist/` directory.

## Release

A CI/CD pipeline is configured to allow for continuously testing the code every time a significant push is made to all branches expect `main`. This branch is protected and pull requests are required for every intended change. Branches that are used for PRs must be up-to-date and pass the `tests` check before being eligible to be merged into the main branch.

Once a release is ready to be published, create a new branch and run `npm run release -- <version-type>` in the `client/` directory to update the json package files. Commit the changes, push the new branch and open a new PR. Once the checks have passed and the main branch is updated, create a new tag by running `git tag v<newversion>` followed by `git push -u origin v<newversion>` to upload to the repository.

Head over to GitHub and create a new release. Select the newly created tag and name the release after it. Write any necessary text under the description box and click on the *Publish release* option. Once the release has been published, the deployment workflow will trigger and the release artifacts for both the web API and the client app will be built and uploaded to Azure.

> The versioning and tagging processes cannot be easily automated due to the structure of the project files. See [this](https://github.com/npm/cli/issues/2010).