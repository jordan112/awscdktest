import { CONST } from "./const";

export function getResourceName(
  name: string,
  environment: string,
  region: string = "",
  stage: string = "",
  appendString: string = "",
) {
  let resourceName = `${CONST.RESOURCE_PREFIX}`;

  if (environment) {
    resourceName += `-${environment}`;
  }

  if (region) {
    resourceName += `-${region}`;
  }

  if (stage) {
    resourceName += `-${stage}`;
  }

  resourceName += `-${name}`;

  if (appendString) {
    resourceName += `-${appendString}`;
  }

  return resourceName;
}
