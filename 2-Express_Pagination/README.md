# Problem Statement
Build an Express.js endpoint that supports pagination using query parameters.

Create a route: ```GET /items```

The endpoint should:

Accept two optional query parameters:  
page → specifies the current page number.  
limit → specifies how many items to display per page.  
If the parameters are not provided, use the following default values:  
page = 1  
limit = 5  
Generate an array of numbers starting from 1 up to the specified limit, and include it in the response.

Return a JSON response in the following format:
```json
   {
     "page": <page>,
     "limit": <limit>,
     "items": [1, 2, 3, ... up to limit]
   }
   ```
For example:

Request: ```/items?page=2&limit=3``` → Response:  
```json
  { "page": 2, "limit": 3, "items": [1, 2, 3] }
```
If no query parameters are provided, the default response should be:
```json
{ "page": 1, "limit": 5, "items": [1, 2, 3, 4, 5] }
```
