---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Raycast Unblock"
  text: "Use all features in Pro plan"
  tagline: Unblock all features in Raycast Pro Plan with implementing similar functions in other ways.
  actions:
    - theme: brand
      text: What is Raycast Unblock?
      link: /guide/what-is-raycast-unblock
    - theme: alt
      text: Getting Started
      link: /guide/getting-started
  image:
    src: /icon.png
    alt: Raycast Unblock

features:
  - title: Customize AI Chat Models
    icon: 🤖️
    details: You can interact with various AI models. We have also implemented Function Call and its associated tooling to explore the full capabilities of Raycast AI.
  - title: Various Translation Providers
    icon: 🌟
    details: We've built in a variety of translation modes. You can utilize AI-powered, DeepL, Google Translate, and Apple Shortcut for effortless translation!
  - title: Powerful Cloud Sync
    icon: ☁️
    details: We also support cross-device synchronization using iCloud in Cloud Sync, and of course, we also provide a local storage option.
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #aca68c 30%, #e0cca7);
    --vp-home-hero-image-background-image: linear-gradient(-45deg, #949380 50%, #d4c4a1 50%);
  --vp-home-hero-image-filter: blur(44px);
  --vp-button-brand-bg: #aca68c !important;
  --vp-button-brand-hover-bg: #949380 !important;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
  .image-src {
    max-width: 256px !important;
    max-height: 256px !important;
  }
}
</style>
