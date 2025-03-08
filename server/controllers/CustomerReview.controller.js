import CustomerReviewModel from "../models/CustomerReview.model.js";

// Create a new review
export const createReview = async (req, res) => {
    try {
        const { userId, productId, CustomerReview, CustomerRating } = req.body;

        const newReview = new CustomerReviewModel({
            userId,
            productId,
            CustomerReview,
            CustomerRating
        });

        await newReview.save();
        res.status(201).json({ message: "Review added successfully", review: newReview });
    } catch (error) {
        res.status(500).json({ message: "Error adding review", error });
    }
};

// Get all reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await CustomerReviewModel.find().populate("userId").populate("productId");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews", error });
    }
};

// Get a single review by ID
export const getReviewById = async (req, res) => {
    try {
        const review = await CustomerReviewModel.findById(req.params.id).populate("userId").populate("productId");
        if (!review) {
            return res.status(404).json({ message: "Review not found" });
        }
        res.status(200).json(review);
    } catch (error) {
        res.status(500).json({ message: "Error fetching review", error });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    try {
        const { CustomerReview, CustomerRating } = req.body;

        const updatedReview = await CustomerReviewModel.findByIdAndUpdate(
            req.params.id,
            { CustomerReview, CustomerRating },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review updated successfully", review: updatedReview });
    } catch (error) {
        res.status(500).json({ message: "Error updating review", error });
    }
};

// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const deletedReview = await CustomerReviewModel.findByIdAndDelete(req.params.id);
        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found" });
        }

        res.status(200).json({ message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting review", error });
    }
};
