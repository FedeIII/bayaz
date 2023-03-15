export async function concurrentRequests(list, callback) {
  const requests = list.map(callback);
  for (let [index, request] of requests.entries())
    requests[index] = await request;

  return requests;
}
