const request = require("supertest");
const express = require("express");

jest.mock("../src/models/expense.model", () =>
    jest.fn().mockImplementation((expenseData) => ({
        ...expenseData,
        _id: "mock-expense-id",
        save: jest.fn().mockResolvedValue(undefined)
    }))
);

const Expense = require("../src/models/expense.model");
const createExpense = require("../src/api");

const authenticatedUserId = "9056297a1234567890123456";
const app = express();

app.use(express.json());
app.use((req, res, next) => {
    req.user = { _id: authenticatedUserId };
    next();
});
app.post("/api/expenses", createExpense);

const validExpense = {
    title: "Lunch",
    amount: 250,
    category: "food",
    paymentMethod: "cash"
};

describe("POST /api/expenses", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("creates a simple expense for the authenticated user", async () => {
        const response = await request(app)
            .post("/api/expenses")
            .send(validExpense);

        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({
            success: true,
            message: "Expense created successfully",
            expense: {
                _id: "mock-expense-id",
                ...validExpense,
                owner: authenticatedUserId
            }
        });
        expect(Expense).toHaveBeenCalledWith({
            ...validExpense,
            owner: authenticatedUserId
        });
        expect(Expense.mock.results[0].value.save).toHaveBeenCalledTimes(1);
    });

    it.each([
        ["missing title", { amount: 250, category: "food", paymentMethod: "cash" }],
        ["empty title", { ...validExpense, title: "" }],
        ["whitespace-only title", { ...validExpense, title: "     " }],
        ["zero amount", { ...validExpense, amount: 0 }],
        ["negative amount", { ...validExpense, amount: -10 }],
        ["string amount", { ...validExpense, amount: "500" }],
        ["invalid category", { ...validExpense, category: "transport" }],
        ["invalid payment method", { ...validExpense, paymentMethod: "wallet" }]
    ])("rejects an expense with %s", async (_caseName, body) => {
        const response = await request(app)
            .post("/api/expenses")
            .send(body);

        expect(response.statusCode).toBe(400);
        expect(Expense).not.toHaveBeenCalled();
    });

    it("uses the authenticated user's ID instead of a client-supplied owner", async () => {
        const response = await request(app)
            .post("/api/expenses")
            .send({
                ...validExpense,
                owner: "111111111111111111111111"
            });

        expect(response.statusCode).toBe(201);
        expect(Expense).toHaveBeenCalledWith({
            ...validExpense,
            owner: authenticatedUserId
        });
        expect(response.body.expense.owner).toBe(authenticatedUserId);
    });
});
