import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import { CONST } from "../const";
import { getResourceName } from "../utils";

export class SdkDocsStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 documentation
    const docsWebsiteBucket = new s3.Bucket(this, "SdkDocumentationBucket", {
      bucketName: getResourceName(CONST.S3_DOCUMENTATION_BUCKET_NAME, "dev"),
      websiteIndexDocument: "index.html",
    });

    // Deployment
    const src = new s3Deploy.BucketDeployment(this, "SdkDocumentationDeploy", {
      sources: [s3Deploy.Source.asset("docs")],
      destinationBucket: docsWebsiteBucket,
    });

    // Cloudfront
    const cf = new cloudfront.CloudFrontWebDistribution(
      this,
      getResourceName(CONST.CLOUDFRONT_DOCS_DISTRIBUTION_NAME, "dev"),
      {
        comment: 'Amway ID SDK Documentation',
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: docsWebsiteBucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );
  }
}
