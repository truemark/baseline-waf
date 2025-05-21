import * as cdk from 'aws-cdk-lib';
import { CloudFrontSecurityBaselineWebAcl } from 'truemark-cdk-lib/aws-wafv2';
import { RegionalSecurityBaselineWebAcl } from 'truemark-cdk-lib/aws-wafv2';


export class BaselineWafStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Retrieve context variables
    const webAclName = this.node.tryGetContext('webAclName') || 'DefaultWAFName';
    const deployType = this.node.tryGetContext('deployType'); // 'cloudfront', 'regional'
    const mode = this.node.tryGetContext('mode') || 'count'; // 'count' or 'active'

    // Validate deployType
    if (deployType !== 'cloudfront' && deployType !== 'regional') {
      throw new Error("Invalid deployType. Valid values are 'cloudfront' or 'regional'.");
    }

    // Conditionally create CloudFront WAF
    if (deployType === 'cloudfront') {
      new CloudFrontSecurityBaselineWebAcl(this, 'CloudFrontWaf', {
        webAclName: `${webAclName}-CloudFront`,
        mode,
        countryCodes: ['CN', 'RU', 'KP'],
        searchString: '/api/login',
        uriCountryRuleLimit: 500,
        uriCountryAction: 'block',
        rateBasedRuleLimit: 1000,
      });
    }

    // Conditionally create Regional WAF
    if (deployType === 'regional') {
      new RegionalSecurityBaselineWebAcl(this, 'RegionalWaf', {
        webAclName: `${webAclName}-Regional`,
        mode,
        countryCodes: ['CN', 'RU', 'KP'],
        searchString: '/api/login',
        uriCountryRuleLimit: 500,
        uriCountryAction: 'block',
        rateBasedRuleLimit: 1000,
      });
    }
  }
}
