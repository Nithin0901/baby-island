import express from "express";
import {
    createReview,
    getAllReviews,
    getReviewById,
    updateReview,
    deleteReview
} from "../controllers/CustomerReview.controller.js";

const router = express.Router();

router.post("/review", createReview); // Create a review
router.get("/review", getAllReviews); // Get all reviews
router.get("/review/:id", getReviewById); // Get a single review
router.put("/review/:id", updateReview); // Update a review
router.delete("/review/:id", deleteReview); // Delete a review

export default router;
