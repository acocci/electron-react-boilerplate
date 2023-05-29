/* eslint-disable @typescript-eslint/no-explicit-any */
import { rest } from 'msw';

import { LevelString, log } from '../../helpers/logger';

import { TokenData } from 'libs/interface/data';

const BASE_URL = `http://localhost:55600/v1/`;
let loggedIn = false;

export const interfaceHandlers: any = [
  rest.post(`${BASE_URL}login`, (req, res, ctx) => {
    try {
      const result: TokenData = {
        access_token:
          'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKQU02ajlUTmgtYTFhRzZ1dU1MeFdoR3lGMWxfX0pjQ0tIVTZJSUxOeTFjIn0.eyJleHAiOjE2NzUxOTgyMjYsImlhdCI6MTY3NTE5NjQyNiwianRpIjoiZDNkNDIzMWUtMDEyYS00MDJhLTkwMWUtMjA0NmFmZGY5M2QxIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9jaHBpZGEiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMDkxNjRhYTUtN2NiZS00MGE3LWJhN2ItYWU4OTgzYmEyZjJlIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoiY2hwaWRhX2FwaSIsInNlc3Npb25fc3RhdGUiOiJhMmEyZTRkNi05OGM5LTRlZjUtYWRmMi0xMmNmMThmOThlOGMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiIsIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIm9mZmxpbmVfYWNjZXNzIiwiZGVmYXVsdC1yb2xlcy1jaHBpZGEiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJhMmEyZTRkNi05OGM5LTRlZjUtYWRmMi0xMmNmMThmOThlOGMiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYXBpIiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.u9KMJM6CBE4m7zLiVEMXM-E6Aab7rvZqn53qLrXvKk3VhhmtnZUnLCRJbKVxLqHDPYEk6vcikcpUMZQTLmgzXtEsNaq7uRour-mOJalUCO9uRcMc1Jzf3-JB4Jf7PR2R7WV9F79ZAENTBTAZh2HEVyY_y3ihb9gTNk33dZscb3JKBDWWLYRnMe0yl_yqXvX-1TgXyQw3jvzjtOqC1wrC_JMmd53D6mOqafMJ4Z0xUUwjn0KTLPWOoWNES3Ykmpvp1fn-kfzn46T7jdOm0TU5-mYmJ06HCKXMIKn7RhE6HA_nxiYPsQvP3L3uGqsGbrSCGCnDfaUH4daMqK4rNozQGA',
        expires_in: 1800,
        id_token:
          'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJKQU02ajlUTmgtYTFhRzZ1dU1MeFdoR3lGMWxfX0pjQ0tIVTZJSUxOeTFjIn0.eyJleHAiOjE2NzUxOTgyMjYsImlhdCI6MTY3NTE5NjQyNiwiYXV0aF90aW1lIjowLCJqdGkiOiI4MjZmZjBhMC0xNWJmLTRhZGMtYjcwNi02NDM4ZDU5OGJiN2UiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL2NocGlkYSIsImF1ZCI6ImNocGlkYV9hcGkiLCJzdWIiOiIwOTE2NGFhNS03Y2JlLTQwYTctYmE3Yi1hZTg5ODNiYTJmMmUiLCJ0eXAiOiJJRCIsImF6cCI6ImNocGlkYV9hcGkiLCJzZXNzaW9uX3N0YXRlIjoiYTJhMmU0ZDYtOThjOS00ZWY1LWFkZjItMTJjZjE4Zjk4ZThjIiwiYXRfaGFzaCI6IkFNQnZyWWFCMmJvajdxYnlSUzFpY2ciLCJhY3IiOiIxIiwic2lkIjoiYTJhMmU0ZDYtOThjOS00ZWY1LWFkZjItMTJjZjE4Zjk4ZThjIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6ImFwaSIsImdpdmVuX25hbWUiOiIiLCJmYW1pbHlfbmFtZSI6IiJ9.qUtfimstYt-KLmoF3bfCg3Wb6rLfFlE24VZ1K479ZHEmUCk9bN2Nzpg89X4f7EW4tHPPxfeUZFjwM9rvLIRdf4WTxfxykUeK-HhDh6T1obcGhGYQkpI63NbP9XbkA6Mqe4fZ_-WgaEFqbaWcWDGI3zadhjQkKJwnWnFc8FZhs2sAKap-JM6P4MYYQfUXjxaA6Qn4GNAou24azHndCVDlmODYa_C3FVMIfhunImRES6USVQ9gwxKvo8EKqM9hXZcMPFEl0NbRKG0WFImNx5r6BLPtp1JCajCwxAmxVuwz6uA01plOpg-b6xmh3lGfCOP0K9eamLm4IrXF2cgMupdXjA',
        'not-before-policy': 0,
        refresh_expires_in: 1800,
        refresh_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI2NWM2YWE2Zi1lMjE1LTRiOWEtOGQwYS02ZjEwYjMwNzI3NzAifQ.eyJleHAiOjE2NzUxOTgyMjYsImlhdCI6MTY3NTE5NjQyNiwianRpIjoiNjBkYjQwMzYtOTI1ZC00NTFhLWExMGMtMWVlZWUzMmViZmE4IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9jaHBpZGEiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvcmVhbG1zL2NocGlkYSIsInN1YiI6IjA5MTY0YWE1LTdjYmUtNDBhNy1iYTdiLWFlODk4M2JhMmYyZSIsInR5cCI6IlJlZnJlc2giLCJhenAiOiJjaHBpZGFfYXBpIiwic2Vzc2lvbl9zdGF0ZSI6ImEyYTJlNGQ2LTk4YzktNGVmNS1hZGYyLTEyY2YxOGY5OGU4YyIsInNjb3BlIjoib3BlbmlkIGVtYWlsIHByb2ZpbGUiLCJzaWQiOiJhMmEyZTRkNi05OGM5LTRlZjUtYWRmMi0xMmNmMThmOThlOGMifQ._ZBbgG-k8Ev2qijIjX5goz8EAGPafwdmJJBvoT7-Imw',
        scope: 'openid',
        session_state: 'a2a2e4d6-98c9-4ef5-adf2-12cf18f98e8c',
        token_type: 'Bearer',
      };
      log(LevelString.INFO, 'login intercepted');
      if (req.params?.grant_type === 'refresh_token' && !loggedIn)
        throw Error("Can't refresh token while not logged in");
      loggedIn = true;
      return res(ctx.json(result));
    } catch (error: any) {
      return res(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),

  rest.post(`${BASE_URL}logout`, (req, res, ctx) => {
    try {
      loggedIn = false;
      return res(ctx.json(loggedIn));
    } catch (error: any) {
      return res(
        ctx.status(400),
        ctx.json({ message: error?.message || 'Server Error' })
      );
    }
  }),
];
