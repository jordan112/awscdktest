#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { SdkPipelineStack } from "../lib/sdk-pipeline-stack";
import { SdkHostStack } from "../lib/sdk-host-stack";
import { SdkDocsStack } from "../lib/sdk-docs-stack";

const app = new cdk.App();

// TODO: will need to dynamically change this for deployments
const env = {
  account: "395475280310",
  region: "us-east-1",
};

new SdkPipelineStack(app, "SdkPipelineStack", {
  env: env,
});

new SdkHostStack(app, "SdkHostStack", {
  env: env,
});

new SdkDocsStack(app, "SdkDocsStack", {
  env: env,
});
