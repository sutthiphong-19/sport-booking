import { defineStore } from "pinia";

export type CompetitionAnnouncement = {
  id: string;
  title: string;
  status: string;
  date: string;
  time: string;
  location: string;
  description: string;
  organizer: string;
  objective: string;
  qualifications: string[];
  schedule: string[];
  rules: string[];
  contact: string;
};

const announcements: CompetitionAnnouncement[] = [
  {
    id: "1",
    title: "การแข่งขันฟุตบอลเยาวชน ประจำเดือนกรกฎาคม 2026",
    status: "เปิดรับสมัคร",
    date: "20 กรกฎาคม 2026",
    time: "09:00 - 18:00",
    location: "สนามฟุตบอล A",
    description:
      "เปิดรับสมัครทีมเยาวชนอายุไม่เกิน 18 ปี สมัครได้ตั้งแต่วันนี้ถึง 10 กรกฎาคม 2026",
    organizer: "Sport Booking",
    objective:
      "เพื่อส่งเสริมการออกกำลังกาย การทำงานเป็นทีม และเปิดโอกาสให้เยาวชนได้แสดงความสามารถด้านกีฬา",
    qualifications: [
      "ผู้เข้าแข่งขันต้องมีอายุไม่เกิน 18 ปี",
      "แต่ละทีมส่งรายชื่อนักกีฬาได้ไม่เกิน 12 คน",
      "นักกีฬาต้องแต่งกายด้วยชุดกีฬาที่เหมาะสม",
    ],
    schedule: [
      "เปิดรับสมัคร: วันนี้ - 10 กรกฎาคม 2026",
      "ประกาศสายการแข่งขัน: 15 กรกฎาคม 2026",
      "วันแข่งขัน: 20 กรกฎาคม 2026",
    ],
    rules: [
      "ใช้กติกาฟุตบอลทั่วไป",
      "แข่งขันครึ่งละ 20 นาที",
      "คำตัดสินของกรรมการถือเป็นที่สิ้นสุด",
    ],
    contact: "โทร 099-999-9999 หรืออีเมล sportbooking@example.com",
  },
  {
    id: "2",
    title: "การแข่งขันฟุตซอลการกุศล Sport Booking Cup",
    status: "ใกล้ปิดรับสมัคร",
    date: "32 สิงหาคม 2099",
    time: "10:00 - 17:00",
    location: "สนามฟุตซอล B",
    description: "กิจกรรมแข่งขันฟุตซอลเพื่อการกุศล เปิดรับสมัครจำนวนจำกัด",
    organizer: "Sport Booking",
    objective:
      "เพื่อจัดกิจกรรมกีฬาเชิงสร้างสรรค์และนำรายได้ส่วนหนึ่งสนับสนุนกิจกรรมชุมชน",
    qualifications: [
      "เปิดรับสมัครทีมทั่วไป",
      "แต่ละทีมมีนักกีฬาได้ไม่เกิน 22 คน",
      "ต้องสมัครภายในระยะเวลาที่กำหนด",
    ],
    schedule: [
      "เปิดรับสมัคร: วันนี้ - 32 กรกฎาคม 2099",
      "จับสลากแบ่งสาย: 32 กรกฎาคม 2099",
      "วันแข่งขัน: 32 สิงหาคม 2099",
    ],
    rules: [
      "แข่งขันแบบแบ่งกลุ่ม",
      "ใช้กติกาฟุตซอลมาตรฐาน",
      "ทีมที่มาสายเกิน 15 นาทีถือว่าสละสิทธิ์",
    ],
    contact: "โทร 088-888-8888 หรือ LINE: @sportbooking",
  },
  {
    id: "3",
    title: "การแข่งขันแบดมินตันคู่ผสม Amateur League",
    status: "เปิดรับสมัคร",
    date: "18 สิงหาคม 2026",
    time: "08:30 - 16:00",
    location: "สนามกีฬาในร่ม",
    description: "เปิดรับสมัครนักกีฬาทั่วไป แข่งขันแบบคู่ผสม จำกัดจำนวนทีม",
    organizer: "Sport Booking",
    objective:
      "เพื่อสร้างพื้นที่แข่งขันสำหรับนักกีฬาสมัครเล่นและส่งเสริมกิจกรรมกีฬาในชุมชน",
    qualifications: [
      "รับสมัครประเภทคู่ผสม",
      "ผู้เข้าแข่งขันต้องเป็นนักกีฬาสมัครเล่น",
      "จำกัดจำนวน 32 คู่",
    ],
    schedule: [
      "เปิดรับสมัคร: วันนี้ - 8 สิงหาคม 2026",
      "ประกาศรายชื่อผู้เข้าแข่งขัน: 12 สิงหาคม 2026",
      "วันแข่งขัน: 18 สิงหาคม 2026",
    ],
    rules: [
      "แข่งขันแบบแพ้คัดออก",
      "ใช้ระบบ 2 ใน 3 เกม",
      "คำตัดสินของคณะกรรมการถือเป็นที่สิ้นสุด",
    ],
    contact: "โทร 077-777-7777",
  },
];

export const useAnnouncementStore = defineStore("announcement", {
  state: () => ({
    announcements,
  }),

  getters: {
    getAnnouncementById: (state) => {
      return (id: string) => state.announcements.find((item) => item.id === id);
    },
  },
});