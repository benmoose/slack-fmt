export const getServiceEndpoint = (event) => {
  const host = event.requestContext.domainName
  const stage = event.requestContext.stage
  return `https://${host}/${stage}`
}
