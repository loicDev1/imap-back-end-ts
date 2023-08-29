export type ReqPerso = {
  typeOperation: string;
  description: string;
  user: any;
};

export function getRequestInfos(
  request: any,
): Partial<ReqPerso> {
  return {
    typeOperation: request.method,
    description: request.hostname + request._parsedUrl.pathname,
  };
}
