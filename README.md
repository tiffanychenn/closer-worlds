# Closer Worlds: Using Generative AI to Facilitate Intimate Conversations

Deep emotional intimacy is a foundational aspect of strong relationships. One strategy technologists use to mediate connection is creating games, which offer fun, emotionally rich spaces for dynamic social interactions. Other researchers have leveraged advancements in generative AI to explore social communication. In this paper, we explore how a game using text-to-image models might induce emotionally intimate conversations. We design and test Closer Worlds, an ML-assisted 2-person experience which asks personal questions and creates images in a playful world-building scenario. We explore design principles inspired by facilitation research and assess their effectiveness in a pilot study with 24 participants. We conclude that Closer Worlds elicits self-disclosure behavior, but less than a similar game without the use of generative AI. However, participants enjoy the experience and potential to visually represent shared values. We conclude by discussing future ways games can leverage generative techniques to foster circumstances for emotional conversations.

Our paper is linked [here](https://www.doi.org/10.1145/3544549.3585651).

Online deployment coming soon!

## How to run locally

Before running the web app and the API, make sure to:
- Run `npm install` in the main directory.
- Add an `.env` file in `/src/api` with `OPENAI_API_KEY={key}`, where `key` is an OpenAI API key. You can find instructions for creating an API key [here](https://platform.openai.com/docs/quickstart/build-your-application).

### Running web app

Run `npx webpack serve` in the main directory.

### Running API

Run `node api.js` in the `/src/api` directory.