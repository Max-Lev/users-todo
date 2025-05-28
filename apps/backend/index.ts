// index.ts
import * as functions from 'firebase-functions';
import { nestApp } from './src/main';

export const api = functions.https.onRequest(nestApp);
