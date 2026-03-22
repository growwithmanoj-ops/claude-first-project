export const errorMessages = {
  noSelectionMade: {
    text: "Pick one that feels right — there's no wrong answer here.",
    icon: '👆',
  },
  maxSelectionsReached: {
    text: "You've picked 3 already! If you want to swap, just tap one to remove it.",
    icon: '✨',
  },
  minSelectionsNeeded: {
    text: "Pick at least one topic that excites you — it helps us personalize your roadmap.",
    icon: '💡',
  },
  pdfExportFailed: {
    text: "Hmm, the PDF didn't quite work. Try again, or just bookmark this page — your roadmap link will always work.",
    icon: '📄',
  },
  clipboardCopyFailed: {
    text: "Couldn't copy to clipboard automatically. Here's your link — you can copy it manually:",
    icon: '🔗',
  },
  clipboardCopySuccess: {
    text: "Link copied! Share it with anyone — they'll see your exact roadmap.",
    icon: '✅',
  },
  invalidURLParams: {
    text: "Looks like this link is missing some info. Let's start fresh and build you a new roadmap — it only takes 2 minutes!",
    icon: '🔄',
  },
  corruptedState: {
    text: "Something got a little mixed up. No worries — let's start over and get you a fresh roadmap.",
    icon: '🌱',
  },
  externalLinkNote: {
    text: "This link opens in a new tab. If it doesn't work, try searching for the resource name — it might have moved.",
    icon: '↗️',
  },
  noRecommendedItems: {
    text: 'All of these resources are great for you — dive into Phase 1 and start building momentum!',
    icon: '🚀',
  },
  allPhasesCollapsed: {
    text: 'Tap any phase to expand it and see your resources.',
    icon: '📂',
  },
  offlineMode: {
    text: "You're offline, but that's fine — your roadmap is saved right here. All the links will work when you're back online.",
    icon: '📱',
  },
  genericError: {
    text: 'Something unexpected happened. Let\'s try that again.',
    icon: '😅',
  },
  customRec: {
    textTooShort: {
      text: 'Tell us a bit more — even a sentence or two helps us find the right resources for you.',
      icon: '✏️',
    },
    textTooLong: {
      text: "That's a lot of detail! Try to keep it under 500 characters — we'll still find great matches.",
      icon: '📝',
    },
    allFieldsRequired: {
      text: 'Fill in all three fields so we can give you the best recommendations.',
      icon: '👆',
    },
    apiError: {
      text: "We couldn't reach our recommendation engine right now. Try again in a moment, or use the full roadmap quiz instead!",
      icon: '🔄',
    },
    apiTimeout: {
      text: 'This is taking longer than expected. Hang tight, or try again with a shorter description.',
      icon: '⏳',
    },
    emptyResponse: {
      text: "We couldn't find specific resources for that query. Try rephrasing, or explore the full roadmap for broader recommendations!",
      icon: '🔍',
    },
  },
};
