#!/usr/bin/env node
import 'source-map-support/register';
import { BaselineWafStack } from '../lib/baseline-waf-stack';
import { ExtendedApp } from 'truemark-cdk-lib/aws-cdk';


// Define environment variables explicitly
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION
};

const app = new ExtendedApp({
  standardTags: {
    automationTags: {
      id: 'baseline-waf',
      url: 'https://github.com/truemark/baseline-waf',
    },
  },
});

new BaselineWafStack(app, 'BaselineWafStack', {});