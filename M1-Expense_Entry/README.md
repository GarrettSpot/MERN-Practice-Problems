---

# MERN Backend Practice Sheet
## Batch 1 — Questions 1 to 5

---

# Question 1 — Create an Expense Entry

## Problem Statement

You are building the backend of a personal expense tracking application.

A logged-in user can record expenses such as food, travel, shopping, subscriptions, and bills.

The frontend will send the expense details, but some information must be controlled by the server.

A user should **not** be able to decide which account owns the expense.

The authenticated user is already available as:

```js
req.user._id
```

Your job is to build an API that validates the expense and saves it in MongoDB.

---

## API

```http
POST /api/expenses
```

---

## Request Body

```json
{
    "title": "Dinner",
    "amount": 850,
    "category": "food",
    "paymentMethod": "upi"
}
```

The user must **not** send:

```json
{
    "owner": "SOME_OTHER_USER_ID"
}
```

The server decides that.

---

## Validation Rules

`title` is required and cannot contain only spaces.

`amount` must:

```text
be a number
be greater than 0
```

Allowed categories:

```text
food
travel
shopping
bills
subscription
other
```

Allowed payment methods:

```text
cash
card
upi
```

---

## Success Response

```http
201 Created
```

```json
{
    "success": true,
    "message": "Expense created successfully",
    "expense": {
        "_id": "...",
        "title": "Dinner",
        "amount": 850,
        "category": "food",
        "paymentMethod": "upi",
        "owner": "LOGGED_IN_USER_ID"
    }
}
```
