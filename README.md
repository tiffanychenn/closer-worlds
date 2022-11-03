# affective-computing-generative-ai

## To-Do
- Form elements
  - [ ] Enter a set of words
  - [ ] Respond to a set of short prompts and/or multiple choice questions
  - [ ] Sliders
  - [ ] Long-form textbox, possibly for short response
- UI
  - [ ] Display grid of four images
  - [ ] Select an image to proceed with
  - [ ] Something that prompts conversation while waiting for API response--maybe including a loading animation that’s playful? Or is that a confound?
  - [ ] Slides-esque progression between pages
  - [ ] And very basic slides-like pages: a few UI elements + a next button and a skip button/end task, for certain prompts--TBD, still being designed
- Text to image AI
  - [ ] Possibly sentiment analysis on a long body of text, or other scraping or feature extraction, but that's a stretch goal and possibly not interesting or relevant
  - [ ] Getting Stable Diffusion to generate four images, nice feature, so that people can select
  - [ ] Does it do upsampling?
  - [ ] Monitor latency--make sure it’s not too too slow
- Data structures + application state
  - [ ] Which prompt we're on, which iteration, which part of the prompt, etc.
- Monitoring/data logging
  - [ ] Capture their images and prompts (and potentially allow them to keep them after the experiment has come to a close, so they need to be able to access it)
  - [ ] How long they spend discussing before they input (time spent per page)
  - [ ] Anything at all that they type into the text boxes/behavior with sliders, etc.--so the in-bewteen before they submit, all of the different states of the inputs along the way
  - Mouse movement doesn’t matter though.
