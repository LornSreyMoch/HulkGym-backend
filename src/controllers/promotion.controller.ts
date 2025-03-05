import { Request, Response } from "express";
import { AppDataSource } from "../config";
import { Promotion } from "../entity/promotion.entity";

// Repository for promotions
const promotionRepository = AppDataSource.getRepository(Promotion);

// Get all promotions
export const getPromotions = async (req: Request, res: Response) => {
  try {
    const promotions = await promotionRepository.find();
    return res.status(200).json({ message: "Success", promotions });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// Create a new promotion
export const createPromotion = async (req: Request, res: Response) => {
  const { title, img_url, offer_description, discount_percentage, valid_until } = req.body;

  try {
    const newPromotion = promotionRepository.create({
      title,
      img_url,
      offer_description,
      discount_percentage,
      valid_until,
    });

    await promotionRepository.save(newPromotion);
    return res.status(201).json({ message: "Promotion created successfully", newPromotion });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// Update a promotion
export const updatePromotion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, img_url, offer_description, discount_percentage, valid_until } = req.body;

  try {
    const promotion = await promotionRepository.findOne({ where: { id } });

    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    promotion.title = title ?? promotion.title;
    promotion.img_url = img_url ?? promotion.img_url;
    promotion.offer_description = offer_description ?? promotion.offer_description;
    promotion.discount_percentage = discount_percentage ?? promotion.discount_percentage;
    promotion.valid_until = valid_until ?? promotion.valid_until;

    await promotionRepository.save(promotion);
    return res.status(200).json({ message: "Promotion updated successfully", promotion });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};

// Delete a promotion
export const deletePromotion = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const promotion = await promotionRepository.findOne({ where: { id } });

    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    await promotionRepository.remove(promotion);
    return res.status(200).json({ message: "Promotion deleted successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: "Internal server error!" });
  }
};
