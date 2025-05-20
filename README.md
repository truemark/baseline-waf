# Baseline WAF Deployment with AWS CDK

This project defines a reusable and configurable Web Application Firewall (WAF) stack using the AWS Cloud Development Kit (CDK). It supports deploying both **CloudFront** and **regional** WAFs using secure and best-practices from the `truemark-cdk-lib`.

---

##  Project Structure

```
baseline-waf/
├── bin/
│   └── baseline-waf.ts         # CDK app entrypoint
├── lib/
│   └── baseline-waf-stack.ts   # Stack definition for CloudFront and regional WAFs
├── test/                       # Unit tests (if any)
├── cdk.json                    # CDK configuration and context
├── package.json                # Project metadata and scripts
├── tsconfig.json               # TypeScript config
└── README.md                   # You're here!
```

---

## Features

-  **Security-first WAF configuration** with country blocking, URI rate limiting, and more
-  **Context-based deployment** (`cloudfront` or `regional`)
-  Built on top of `truemark-cdk-lib` for simplified secure constructs
- ️ Fully written in TypeScript using AWS CDK v2

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) >= 18.x
- [AWS CDK](https://docs.aws.amazon.com/cdk/v2/guide/getting_started.html) >= v2
- [AWS CLI](https://aws.amazon.com/cli/) and valid credentials
- `pnpm` (or replace with `npm`/`yarn` as needed)

---

## Install Dependencies

```bash
pnpm install
```

---

## Build the Project

```bash
pnpm build
```

> This compiles TypeScript code to JavaScript and prepares for deployment.

---

##  Deployment

The WAF deployment depends on the `deployType` context value.

###  Deploy Regional WAF

```bash
cdk deploy --context webAclName=<webAclName> --context deployType=regional
```

This creates a WAF Web ACL associated with regional resources (like ALBs or API Gateway).

###  Deploy CloudFront WAF

```bash
cdk deploy --context webAclName=<webAclName> --context deployType=cloudfront
```

This creates a WAF Web ACL suitable for CloudFront distributions.

---

##  Useful CDK Commands

| Command         | Description                                       |
|-----------------|---------------------------------------------------|
| `pnpm build`    | Compiles the TypeScript CDK code                  |
| `cdk synth`     | Synthesizes the CloudFormation template           |
| `cdk diff`      | Shows the difference between deployed and local   |
| `cdk deploy`    | Deploys the stack to your AWS account             |
| `cdk destroy`   | Deletes the deployed stack                        |
| `cdk ls`        | Lists all defined stacks                          |

---

##  Context Parameters

The CDK app relies on two context variables:

| Context Key   | Description                                | Example     |
|---------------|--------------------------------------------|-------------|
| `webAclName`  | Base name for the WAF                      | `TestingWAF` |
| `deployType`  | Deployment mode, either `cloudfront` or `regional` | `regional` |

---

## ️ Security Baseline Configuration

The WAF ACLs created by this stack include:

- Blocking requests from high-risk countries (`CN`, `RU`, `KP`)
- Rate-based rules (limit: 1000 requests)
- URI rule matching `/api/login` with country filtering
- Operating in `count` mode (can be changed to `block` post-deployment)

---

##  Clean Up

To remove the stack from your AWS account:

```bash
cdk destroy --context webAclName=<webAclName> --context deployType=regional
```

---

## 📝 License

This project is proprietary and developed by TrueMark.
