import * as cdk from "@aws-cdk/core";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3Deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import { CONST } from "../const";
import { getResourceName } from "../utils";

export class SdkHostStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // S3 website to host SDK code
    const websiteBucket = new s3.Bucket(this, "SdkSourceCodeDeployBucket", {
      bucketName: getResourceName(CONST.S3_SOURCE_FILES_BUCKET_NAME, "dev"),
      websiteIndexDocument: "index.html",
    });

    // Deployment
    const src = new s3Deploy.BucketDeployment(this, "SdkDeployment", {
      sources: [s3Deploy.Source.asset("public")],
      destinationBucket: websiteBucket,
    });

    // Cloudfront
    const cf = new cloudfront.CloudFrontWebDistribution(
      this,
      getResourceName(CONST.CLOUDFRONT_DISTRIBUTION_NAME, "dev"),
      {
        comment: 'Amway ID SDK source files',
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: websiteBucket,
            },
            behaviors: [{ isDefaultBehavior: true }],
          },
        ],
      }
    );
  }
}
