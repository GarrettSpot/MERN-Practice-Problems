# 1. Create a Basic Voting API for Lok Sabha

Lok Sabha Voting System – REST API
You are building a basic RESTful API to simulate voting in the Indian Lok Sabha. The system should allow Members of Parliament (MPs) to be added, cast their votes, and retrieve the voting results.

You’ll use Express.js and in-memory arrays (no database) to store MP details and vote records.

Functional Requirements
1. ```POST /mp``` — Add a New MP
Description: This endpoint should allow adding a new Member of Parliament (MP).

Request Body:
```json
{
  "name": "Rahul Gandhi",
  "constituency": "Wayanad"
}
```
Validations:

Both name and constituency are required.
If either field is missing, return:
```json
  { "message": "Name and constituency are required" }
```
with ```HTTP 400 (Bad Request)``` status.

Behavior:

Each MP should be assigned a unique id automatically (starting from 1, incremented for each new MP).
The new MP should be stored in an in-memory array called mps.
Successful Response (201 Created):
```json
{
  "id": 1,
  "name": "Rahul Gandhi",
  "constituency": "Wayanad"
}
```
2. ```POST /vote``` — Record a Vote
Description: This route allows an MP to vote on a bill.

Request Body:
```json
{
  "mpId": 1,
  "vote": "yes"
}
```
Validations:

Both mpId and vote are required. If missing, return:
  ```json
  { "message": "mpId and vote are required" }
  ```
with ```HTTP 400 (Bad Request)```.

The vote value must be one of:
  ```yes | no | abstain```
If it’s anything else, return:
```json
  { "message": "Invalid vote value" }
```
with ```HTTP 400 (Bad Request)```.

The given mpId must match an existing MP. If no MP with that id exists, return:
  ```json
  { "message": "Invalid MP ID" }
  ```
with ```HTTP 404 (Not Found)```.

Each MP can vote only once. If an MP tries to vote again, return:
```json
  { "message": "MP has already voted" }
  ```
with ```HTTP 409 (Conflict)```.

Behavior:

On a valid vote, record it in an in-memory array called votes.
Each record should store ```{ mpId, vote }```.
```Successful Response (200 OK)```:
```json
{ "message": "Vote recorded successfully" }
```
3. ```GET /results``` — Retrieve Vote Results
Description: Returns the current tally of votes.

Response ```(200 OK)```:
```json
{
  "yes": 5,
  "no": 2,
  "abstain": 1
}
```
Behavior:

Count all votes from the votes array.
Return the total for each category (yes, no, and abstain).
MPs who haven’t voted shouldn’t affect the tally.
Data Structures (In-Memory Arrays)
You must use two arrays in your code:
```js
const mps = [];    // Stores MP details (id, name, constituency)
const votes = [];  // Stores votes ({ mpId, vote })
```
Additionally, maintain a simple counter for MP IDs:
```js
let currentId = 1;
```
Error Handling Summary
| Scenario | HTTP Status | Message | 
| -------------------------------- | ---------------------|----------------------------- |
| Missing name or constituency | 400 | "Name and constituency are required" |
| Missing mpId or vote | 400 | "mpId and vote are required" | 
| Invalid vote type | 400 | "Invalid vote value" | 
| Non-existent MP ID | 404 | "Invalid MP ID" | 
| MP votes more than once | 409 | "MP has already voted" |

Implementation Rules
Use Express.js and ```express.json()``` middleware.
Store all logic in memory (no database or external files).
Implement all routes in the file src/api.js.
Export the Express app at the end using:
```js
  module.exports = app;
  ```
Do not use external frameworks or ORMs.
Example Workflow
Step 1: Add two MPs ```POST /mp```
```json
{ "name": "Rahul Gandhi", "constituency": "Wayanad" }
```
Response →
```json
{ "id": 1, "name": "Rahul Gandhi", "constituency": "Wayanad" }
```
```POST /mp```
```json
{ "name": "Amit Shah", "constituency": "Gandhinagar" }
```
Response →
```json
{ "id": 2, "name": "Amit Shah", "constituency": "Gandhinagar" }
```
Step 2: Cast votes ```POST /vote```
```json
{ "mpId": 1, "vote": "yes" }
```
Response →
```json
{ "message": "Vote recorded successfully" }
```
```POST /vote```
```json
{ "mpId": 1, "vote": "no" }
```
Response →
```json
{ "message": "MP has already voted" }
```
```(409 Conflict)```

Step 3: View results ```GET /results``` Response →
```json
{ "yes": 1, "no": 0, "abstain": 0 }
```
Hints
Use ```Array.find()``` to locate MPs or existing votes.
Use ```Array.forEach()``` or a loop to count votes in ```/results```.
Remember to respond with the correct HTTP status codes as per the table above.