import express, { Request, Response } from "express"
import Mood from "../models/Mood"

const router = express.Router()

// POST /mood - Save a new mood log
router.post("/mood", async (req: Request, res: Response) => {
  try {
    const { emotion, note, song, date, author } = req.body

    const savedMood = await Mood.create({
      emotion,
      note,
      song,
      date,
      author,
    })

    res.json(savedMood)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to save mood" })
  }
})

// GET /mood - Fetch all mood logs
router.get("/mood", async (_req: Request, res: Response) => {
  try {
    const moods = await Mood.find().sort({ date: -1 })
    res.json(moods)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch moods" })
  }
})

export default router
