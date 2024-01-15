import { StorylineDirectorAssistantv1 } from "../../services/assistants"

// Twynes need to associate with a Storyline at some point, preferably the beginning of the chain
This can happen at the saveTwyne funciton where we can pass in the storylineId - we will establish beat type "narrative" for the twyne
We will also do this in the picture upload function - which will upload the storybeat "b-roll" and associate it with the storyline

// Twynes prompt based will have the beattype: narrative
// Twynes images will have the beattype: b-roll
// When the prompts are generated by the storyEngine, we'll parse out beat types "b-roll" and only focus on narrative.
// The storyline will still have the complete record.
// storyline parts should have a TwyneId associated to them - > perhaps assigned at confirmation step.


