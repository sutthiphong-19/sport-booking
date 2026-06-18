import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";

const router = Router();

const createCompetitionSchema = z.object({
  title: z.string().min(1, "กรุณากรอกชื่อการแข่งขัน"),
  description: z.string().min(1, "กรุณากรอกรายละเอียด"),
  location: z.string().optional(),
  startDate: z.string().min(1, "กรุณากรอกวันที่เริ่ม"),
  endDate: z.string().min(1, "กรุณากรอกวันที่สิ้นสุด"),
  maxTeams: z.number().int().positive().optional()
});

const applyCompetitionSchema = z.object({
  userId: z.string().uuid().optional(),
  teamName: z.string().min(1, "กรุณากรอกชื่อทีม"),
  contactName: z.string().min(1, "กรุณากรอกชื่อผู้ติดต่อ"),
  phone: z.string().min(1, "กรุณากรอกเบอร์โทร"),
  email: z.string().email("รูปแบบอีเมลไม่ถูกต้อง").optional(),
  note: z.string().optional()
});

router.get("/", async (_req, res) => {
  try {
    const competitions = await prisma.competition.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        _count: {
          select: {
            applications: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: competitions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch competitions"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const competition = await prisma.competition.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        applications: true
      }
    });

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found"
      });
    }

    res.json({
      success: true,
      data: competition
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch competition"
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const parsed = createCompetitionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsed.error.flatten()
      });
    }

    const competition = await prisma.competition.create({
      data: {
        title: parsed.data.title,
        description: parsed.data.description,
        location: parsed.data.location,
        startDate: new Date(parsed.data.startDate),
        endDate: new Date(parsed.data.endDate),
        maxTeams: parsed.data.maxTeams
      }
    });

    res.status(201).json({
      success: true,
      data: competition
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create competition"
    });
  }
});

router.post("/:id/apply", async (req, res) => {
  try {
    const parsed = applyCompetitionSchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid request body",
        errors: parsed.error.flatten()
      });
    }

    const competition = await prisma.competition.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        _count: {
          select: {
            applications: true
          }
        }
      }
    });

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found"
      });
    }

    if (competition.status !== "OPEN") {
      return res.status(400).json({
        success: false,
        message: "This competition is not open"
      });
    }

    if (
      competition.maxTeams &&
      competition._count.applications >= competition.maxTeams
    ) {
      return res.status(400).json({
        success: false,
        message: "Competition is full"
      });
    }

    const application = await prisma.competitionApplication.create({
      data: {
        competitionId: req.params.id,
        userId: parsed.data.userId,
        teamName: parsed.data.teamName,
        contactName: parsed.data.contactName,
        phone: parsed.data.phone,
        email: parsed.data.email,
        note: parsed.data.note
      }
    });

    res.status(201).json({
      success: true,
      message: "สมัครการแข่งขันสำเร็จ",
      data: application
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to apply competition"
    });
  }
});

export default router;