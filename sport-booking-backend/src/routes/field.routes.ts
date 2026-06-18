import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const router = Router();

const createFieldSchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อสนาม"),
  sportType: z.string().min(1, "กรุณากรอกประเภทกีฬา"),
  location: z.string().optional(),
  pricePerHour: z.number().positive("ราคาต้องมากกว่า 0"),
  imageUrl: z.string().optional()
});

router.get("/", async (_req, res) => {
  try {
    const fields = await prisma.sportField.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json({
      success: true,
      data: fields
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sport fields"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const parsed = createFieldSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsed.error.flatten()
      });
    }

    const field = await prisma.sportField.create({
      data: parsed.data
    });

    res.status(201).json({
      success: true,
      data: field
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create sport field"
    });
  }
});

export default router;