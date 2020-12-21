import * as cdk from '@aws-cdk/core';
import * as codebuild from "@aws-cdk/aws-codebuild";
// import * as codecommit from "@aws-cdk/aws-codecommit";
// import * as codepipeline from "@aws-cdk/aws-codepipeline";
// import * as codepipeline_actions from "@aws-cdk/aws-codepipeline-actions";
// import * as lambda from "@aws-cdk/aws-lambda";
// import * as s3 from "@aws-cdk/aws-s3";
// import * as codeartifact from "@aws-cdk/aws-codeartifact";
// import { App, Stack, StackProps } from "@aws-cdk/core";

export class SdkPipelineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const gitHubSource = codebuild.Source.gitHub({
      owner: 'jordan112',
      repo: 'awscdktest',
      webhook: true, // optional, default: true if `webhookFilters` were provided, false otherwise
      webhookFilters: [
        codebuild.FilterGroup
          .inEventOf(codebuild.EventAction.PUSH)
          .andBranchIs('main'),
      ], // optional, by default all pushes and Pull Requests will trigger a build
      reportBuildStatus: true,
    });

  const project = new codebuild.Project(this, 'SDKBuild', {
    projectName: 'SDKBuild',
    source: gitHubSource,
    badge: true,
    description: 'Build Project to build Amway ID SDK',
    buildSpec: codebuild.BuildSpec.fromObject({
      version: "0.2",
      phases: {
        build: {
          commands: ['ls -la', 'npm ci', 'npm run build'],
        },
      }
    }),
  });
  }
}
