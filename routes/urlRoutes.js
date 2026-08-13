const express = require("express");
const { nanoid } = require("nanoid");
const Url = require("../models/Url");

const router = express.Router();

router.post("/shorten", async (req, res) => {
    try {
        const { originalUrl } = req.body;

        if (!originalUrl) {
            return res.status(400).json({
                message: "URL is required"
            });
        }

        try {
            new URL(originalUrl);
        } catch {
            return res.status(400).json({
                message: "Invalid URL"
            });
        }

        const shortCode = nanoid(6);

        const url = await Url.create({
            originalUrl,
            shortCode
        });

        res.status(201).json({
            shortUrl: `http://localhost:5000/${url.shortCode}`
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// Specific route FIRST
router.get("/stats/:shortCode", async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        res.json({
            originalUrl: url.originalUrl,
            shortCode: url.shortCode,
            clicks: url.clicks,
            createdAt: url.createdAt
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});


// Generic route LAST
router.get("/:shortCode", async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });

        if (!url) {
            return res.status(404).json({
                message: "Short URL not found"
            });
        }

        url.clicks += 1;
        await url.save();

        res.redirect(url.originalUrl);

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong"
        });
    }
});

module.exports = router;