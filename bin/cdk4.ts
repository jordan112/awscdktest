#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Cdk4Stack } from '../lib/cdk4-stack';

const app = new cdk.App();
new Cdk4Stack(app, 'Cdk4Stack');
