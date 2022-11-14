# affective-computing-generative-ai

## Updated To-Do
- [ ] Experiment generation
  - [ ] Require app to start with this first (add this to game state, route on ParticipantApp)
- [x] Add API_BASE_URL 
  - [ ] Ensure that imagePathToUrl function (in utils.tsx) works (basically does image hosting work correctly)
- [ ] Components for info slides and for any other interfaces
  - Do we need anything for multiple input fields?
  - That one end slide if we still have it with a slider, etc.?
- [ ] Stress test everything
   - [ ] Generating images
   - [ ] Saving data
- [ ] Button permissions
  - [ ] Allow next on WritePrompt only when character limits are met
    - [ ] Develop character limited textbox component
  - [ ] Allow next on Reflect only when image has been generated and retrieved successfully
  - [ ] Allow redo on Image only when redo has not yet been used (we already have state for this)
- [ ] Make everything pretty

----

## Requirements
- API
  - `.env` file with OpenAI API key, saved as `OPENAI_API_KEY`
  - `/data` directory in root

## To-Do
- Form elements
  - [x] Enter a set of words
  - [ ] Respond to a set of short prompts and/or multiple choice questions
  - [x] Sliders
  - [x] Long-form textbox, possibly for short response
- UI
  - [ ] Display grid of four images
  - [ ] Select an image to proceed with
  - [ ] Something that prompts conversation while waiting for API response--maybe including a loading animation that’s playful? Or is that a confound?
  - [x] Slides-esque progression between pages
  - [x] And very basic slides-like pages: a few UI elements + a next button and a skip button/end task, for certain prompts--TBD, still being designed
  - [ ] WoZ tooltips (design this first though, prototype this) connected to API possibly
  - [x] Timers
  - [ ] Turn taking avatars (basic astronaut images on left and right that enlarge or shrink/appear by sliding in)
  - [ ] Background image selected from previous generation
    - [ ] Test this to make sure that it selects from the previous image generation successfully! I wanted to wait until we had the API set up to do this.
  - [ ] Drawer thing that lets you edit all the prompts along the way
  - [x] One try over/redo
- Text to image AI
  - [ ] Possibly sentiment analysis on a long body of text, or other scraping or feature extraction, but that's a stretch goal and possibly not interesting or relevant
  - [ ] Getting Stable Diffusion to generate four images, nice feature, so that people can select
    - [ ] Choose an image, if at all applicable
  - [ ] Does it do upsampling?
  - [ ] Monitor latency--make sure it’s not too too slow
  - [ ] Look into negative prompts
  - [ ] Image storage for API
- Data structures + application state
  - [x] Which prompt we're on, which iteration, which part of the prompt, etc.
  - [x] The state of prompt (as in how they've filled in the blanks so far)
  - [x] Whether they've done the do-over
- Monitoring/data logging
  - [ ] Capture their images and prompts (and potentially allow them to keep them after the experiment has come to a close, so they need to be able to access it)
  - [x] How long they spend discussing before they input (time spent per page)
  - [x] Anything at all that they type into the text boxes/behavior with sliders, etc.--so the in-between before they submit, all of the different states of the inputs along the way
  - Mouse movement doesn’t matter though.
- TODO: Determine what things an admin WoZ would need to do in the background, and add those to second client of API.

## List of Likely Necessary Components
- Atoms (tiny dumb components, probably no state or minimal state)
  - [x] Short text box (for set of words)
  - [x] Slider with some kind of text label, maybe text labels at each extreme also
  - [x] Long text box (for long response)
  - [x] Radio button + text
  - [x] Question header
  - [x] Photo display item
  - [x] Background photo display
  - [x] Button (most likely used for slides)
  - [x] Possibly a loading animation?
  - [ ] Player token (depends on finalized UI, should hold off for now)
- Molecules (collections of atoms, also minimal state)
  - [ ] Multiple choice question
  - [ ] Clickable photo display grid (click to select an item)
  - [ ] Header for the page
- Organisms (sections of a page, possibly some state)
  - [ ] Full form consisting of many form elements, and must register their IDs somehow for data storage (or maybe that happens at the form element level?)
  - [ ] Set of buttons at the bottom of a page
- Template (an uninformed page, i.e., it doesn't retrieve data from the store, but with some state handed down to it, it would be a final page)
  - [x] One "slide"
  - [ ] Loading page and/or modal

## Data Stuff to Build
- Everything will need hook-ins for data updates... how should we record those? Something in the store? It's timestamps + values, so each form element should have an ID that its data is logged with. At the end of the session (honestly really throughout), we should dump that data to a file. We can constantly do that by running this on an Express server locally, maybe, and have that constantly be transcribing the cached state to a JSON file.
- A way to store the images we generate, too...
