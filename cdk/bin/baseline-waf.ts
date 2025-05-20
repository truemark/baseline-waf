#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { BaselineWafStack } from '../lib/baseline-waf-stack';

// Define environment variables explicitly
const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION
};

const app = new cdk.App();
new BaselineWafStack(app, 'BaselineWafStack', { env });
