import express from 'express';
import { instructions } from '../prompts/assistantInstructions.js';
import storyEngine from '../middleware/storylineEngine/storyEngine.js';
import { validateTokenMiddleware } from '../middleware/authentication/validateTokenMiddleware.js';

const router = express.Router();

router.post('/', validateTokenMiddleware, async (req, res) => {
    
    console.log(instructions);
    const {storyId, threadId, templateName } = req.body;
    const results = await storyEngine(instructions, storyId, threadId, templateName);
    console.log(results);

});

export default router;