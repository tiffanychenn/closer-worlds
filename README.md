# affective-computing-generative-ai

## Requirements
- API
  - `.env` file with OpenAI API key, saved as `OPENAI_API_KEY`
  - `/data` directory in root

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
  - [ ] WoZ tooltips (design this first though, prototype this) connected to API possibly
  - [ ] Timers
  - [ ] Turn taking avatars (basic astronaut images on left and right that enlarge or shrink/appear by sliding in)
  - [ ] Background image selected from previous generation
  - [ ] Drawer thing that lets you edit all the prompts along the way
  - [ ] One try over/redo
- Text to image AI
  - [ ] Possibly sentiment analysis on a long body of text, or other scraping or feature extraction, but that's a stretch goal and possibly not interesting or relevant
  - [ ] Getting Stable Diffusion to generate four images, nice feature, so that people can select
    - [ ] Choose an image, if at all applicable
  - [ ] Does it do upsampling?
  - [ ] Monitor latency--make sure it’s not too too slow
  - [ ] Look into negative prompts
  - [ ] Image storage for API
- Data structures + application state
  - [ ] Which prompt we're on, which iteration, which part of the prompt, etc.
  - [ ] The state of prompt (as in how they've filled in the blanks so far)
  - [ ] Whether they've done the do-over
- Monitoring/data logging
  - [ ] Capture their images and prompts (and potentially allow them to keep them after the experiment has come to a close, so they need to be able to access it)
  - [ ] How long they spend discussing before they input (time spent per page)
  - [ ] Anything at all that they type into the text boxes/behavior with sliders, etc.--so the in-bewteen before they submit, all of the different states of the inputs along the way
  - Mouse movement doesn’t matter though.
- TODO: Determine what things an admin WoZ would need to do in the background, and add those to second client of API.

## List of Likely Necessary Components
- Atoms (tiny dumb components, probably no state or minimal state)
  - [ ] Short text box (for set of words)
  - [ ] Slider with some kind of text label, maybe text labels at each extreme also
  - [ ] Long text box (for long response)
  - [ ] Radio button + text
  - [ ] Question header + descriptive text
  - [ ] Photo display item
  - [ ] Button (most likely used for slides)
  - [ ] Possibly a loading animation?
- Molecules (collections of atoms, also minimal state)
  - [ ] Multiple choice question
  - [ ] Clickable photo display grid (click to select an item)
- Organisms (sections of a page, possibly some state)
  - [ ] Full form consisting of many form elements, and must register their IDs somehow for data storage (or maybe that happens at the form element level?)
  - [ ] Set of buttons at the bottom of a page
- Template (an uninformed page, i.e., it doesn't retrieve data from the store, but with some state handed down to it, it would be a final page)
  - [ ] One "slide"
  - [ ] Loading page and/or modal

## Data Stuff to Build
- Everything will need hook-ins for data updates... how should we record those? Something in the store? It's timestamps + values, so each form element should have an ID that its data is logged with. At the end of the session (honestly really throughout), we should dump that data to a file. We can constantly do that by running this on an Express server locally, maybe, and have that constantly be transcribing the cached state to a JSON file.
- A way to store the images we generate, too...
