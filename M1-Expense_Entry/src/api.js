const Expense = require("./models/expense.model")
const User = require("./models/user.model")

const createExpense = async (req, res) => {
    try {

        const {
            title,
            amount,
            category,
            paymentMethod
        } = req.body;
        
        ALLOWED_CATEGORIES = [
            "food",
            "travel",
            "shopping",
            "bills",
            "subscription",
            "other"
        ]

        ALLOWED_PAYMENT_METHODS = [
            "cash",
            "credit_card",
            "upi"
        ]

        // STEP 1:
        // Validate title


        // STEP 2:
        // Validate amount


        // STEP 3:
        // Validate category


        // STEP 4:
        // Validate paymentMethod


        // STEP 5:
        // Create the expense.
        // owner must come from req.user._id


        // STEP 6:
        // Return 201 response

    } catch (error) {

        // Handle unexpected errors

    }
};

module.exports = createExpense;