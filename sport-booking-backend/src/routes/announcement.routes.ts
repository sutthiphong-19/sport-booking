import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const router = Router();

const createAnnouncementSchema = z.object({
  title: z.string().min(1, "กรุณากรอกหัวข้อประกาศ"),
  description: z.string().min(1, "กรุณากรอกรายละเอียด"),
  imageUrl: z.string().optional(),
  isPublished: z.boolean().optional()
});

router.get("/", async (_req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.json({
      success: true,
      data: announcements
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch announcements"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const announcement = await prisma.announcement.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found"
      });
    }

    res.json({
      success: true,
      data: announcement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch announcement"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const parsed = createAnnouncementSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsed.error.flatten()
      });
    }

    const announcement = await prisma.announcement.create({
      data: parsed.data
    });

    res.status(201).json({
      success: true,
      data: announcement
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create announcement"
    });
  }
});

export default router;