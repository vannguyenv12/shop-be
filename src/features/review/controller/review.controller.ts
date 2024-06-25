import { Request, Response } from "express";
import { HTTP_STATUS } from "~/globals/constants/http";
import { reviewService } from "~/services/db/review.service";

class ReviewController {
  public async addReview(req: Request, res: Response) {
    const review = await reviewService.add(req.body, req.currentUser);

    return res.status(HTTP_STATUS.CREATED).json({
      message: 'Add review',
      data: review
    });
  }
}

export const reviewController: ReviewController = new ReviewController();