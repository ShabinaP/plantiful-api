// const AWS = require('aws-sdk');
// AWS.config.update( {
//   region: 'us-east-1'
// });
// const dynamodb = new AWS.DynamoDB.DocumentClient();
// const dynamodbTableName = 'plantiful';
// const healthPath = '/health';
// const plantPath = '/plant';
// const plantsPath = '/plants';

// exports.handler = async function(event) {
//   console.log('Request event: ', event);
//   let response;
//   switch(true) {
//     case event.httpMethod === 'GET' && event.path === healthPath:
//       response = buildResponse(200);
//       break;
//     case event.httpMethod === 'GET' && event.path === plantPath:
//       response = await getPlant(event.queryStringParameters.PlantId);
//       break;
//     case event.httpMethod === 'GET' && event.path === plantsPath:
//       response = await getPlants();
//       break;
//     case event.httpMethod === 'POST' && event.path === plantPath:
//       response = await savePlants(JSON.parse(event.body));
//       break;
//     case event.httpMethod === 'PATCH' && event.path === plantPath:
//       const requestBody = JSON.parse(event.body);
//       response = await modifyPlants(requestBody.PlantId, requestBody.updateKey, requestBody.updateValue);
//       break;
//     case event.httpMethod === 'DELETE' && event.path === plantPath:
//       response = await deletePlant(JSON.parse(event.body).PlantId);
//       break;
//     default:
//       response = buildResponse(404, '404 Not Found');
//   }
//   return response;
// }

// async function getPlant(PlantId) {
//   const params = {
//     TableName: dynamodbTableName,
//     Key: {
//       'PlantId': PlantId
//     }
//   }
//   return await dynamodb.get(params).promise().then((response) => {
//     return buildResponse(200, response.Item);
//   }, (error) => {
//     console.error('Do your custom error handling here. I am just gonna log it: ', error);
//   });
// }

// async function getPlants() {
//   const params = {
//     TableName: plantiful
//   }
//   const allPlants = await scanDynamoRecords(params, []);
//   const body = {
//     plants: allPlants
//   }
//   return buildResponse(200, body);
// }

// async function scanDynamoRecords(scanParams, itemArray) {
//   try {
//     const dynamoData = await dynamodb.scan(scanParams).promise();
//     itemArray = itemArray.concat(dynamoData.Items);
//     if (dynamoData.LastEvaluatedKey) {
//       scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
//       return await scanDynamoRecords(scanParams, itemArray);
//     }
//     return itemArray;
//   } catch(error) {
//     console.error('Do your custom error handling here. I am just gonna log it: ', error);
//   }
// }

// async function savePlants(requestBody) {
//   const params = {
//     TableName: plantiful,
//     Item: requestBody
//   }
//   return await dynamodb.put(params).promise().then(() => {
//     const body = {
//       Operation: 'SAVE',
//       Message: 'SUCCESS',
//       Item: requestBody
//     }
//     return buildResponse(200, body);
//   }, (error) => {
//     console.error('Do your custom error handling here. I am just gonna log it: ', error);
//   })
// }

// async function modifyPlants(PlantId, updateKey, updateValue) {
//   const params = {
//     TableName: dynamodbTableName,
//     Key: {
//       'PlantId': PlantId
//     },
//     UpdateExpression: `set ${updateKey} = :value`,
//     ExpressionAttributeValues: {
//       ':value': updateValue
//     },
//     ReturnValues: 'UPDATED_NEW'
//   }
//   return await dynamodb.update(params).promise().then((response) => {
//     const body = {
//       Operation: 'UPDATE',
//       Message: 'SUCCESS',
//       UpdatedAttributes: response
//     }
//     return buildResponse(200, body);
//   }, (error) => {
//     console.error('Do your custom error handling here. I am just gonna log it: ', error);
//   })
// }

// async function deletePlants(productId) {
//   const params = {
//     TableName: dynamodbTableName,
//     Key: {
//       'productId': productId
//     },
//     ReturnValues: 'ALL_OLD'
//   }
//   return await dynamodb.delete(params).promise().then((response) => {
//     const body = {
//       Operation: 'DELETE',
//       Message: 'SUCCESS',
//       Item: response
//     }
//     return buildResponse(200, body);
//   }, (error) => {
//     console.error('Do your custom error handling here. I am just gonna log it: ', error);
//   })
// }

// function buildResponse(statusCode, body) {
//   return {
//     statusCode: statusCode,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(body)
//   }
// }