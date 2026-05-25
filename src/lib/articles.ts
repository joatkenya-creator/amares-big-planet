export type Article = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: string;
  videoId: string;
  videoTitle: string;
  readingTime: string;
  readTime: string;
  publishDate: string;
  keywords: string[];
  intro: string;
  sections: Array<{
    heading: string;
    body: string;
  }>;
  learningGoals: string[];
  parentTip: string;
  body: string;
};

function articleBody(article: Pick<Article, "intro" | "sections" | "learningGoals" | "parentTip">) {
  return [
    `<p>${article.intro}</p>`,
    `<h2>What kids can practice</h2>`,
    `<ul>${article.learningGoals.map((goal) => `<li>${goal}</li>`).join("")}</ul>`,
    ...article.sections.map((section) => `<h2>${section.heading}</h2><p>${section.body}</p>`),
    `<blockquote><strong>Parent tip:</strong> ${article.parentTip}</blockquote>`,
    `<p><em>Note: Amare's Big Planet creates educational entertainment for families. This guide is not medical, diagnostic, or therapeutic advice.</em></p>`,
  ].join("");
}

const articleDrafts = [
  {
    slug: "autism-friendly-learning-videos-for-kids",
    title: "Autism-Friendly Learning Videos for Kids",
    description: "A parent-friendly guide to choosing gentle, visual, repetitive learning videos for autistic and neurodiverse children.",
    category: "Inclusive Learning",
    videoId: "_ctNtUXel6Q",
    videoTitle: "Learning ABCs I to L",
    readingTime: "4 min read",
    keywords: ["autism-friendly learning videos", "educational videos for autistic children", "inclusive kids learning"],
    intro: "Many children learn best when lessons are calm, visual, repetitive, and joyful. Amare's Big Planet uses music, bright characters, simple words, and repeated ideas to support different learning styles.",
    sections: [
      {
        heading: "What makes a learning video autism-friendly?",
        body: "Helpful videos often use clear routines, predictable repetition, simple language, and visuals that match the words being sung or spoken. These choices can make learning feel less overwhelming and easier to follow.",
      },
      {
        heading: "How ABP supports different learners",
        body: "ABP songs are built around familiar learning topics such as letters, animals, planets, and music. Children can watch, listen, sing, move, or simply enjoy the characters at their own pace.",
      },
      {
        heading: "Use videos as a shared activity",
        body: "A parent or teacher can pause the video, repeat a favorite part, point to letters or pictures, and celebrate small moments of recognition. The goal is connection, confidence, and fun.",
      },
    ],
    learningGoals: ["Letter recognition", "Listening practice", "Visual learning", "Confidence through repetition"],
    parentTip: "Start with one short video, then replay the same song another day. Familiarity can help children feel more confident.",
  },
  {
    slug: "how-music-helps-autistic-children-learn",
    title: "How Music Helps Autistic Children Learn",
    description: "Learn how rhythm, repetition, melody, and movement can support early learning for autistic and neurodiverse children.",
    category: "Music & Learning",
    videoId: "9ryVeXuqv-M",
    videoTitle: "Live - Lofi Study Music for Kids",
    readingTime: "4 min read",
    keywords: ["music for autistic children", "kids learning through music", "neurodiverse learning songs"],
    intro: "Music can make learning feel predictable and enjoyable. Rhythm gives children a pattern to follow, while repeated lyrics can make letters, numbers, and ideas easier to remember.",
    sections: [
      {
        heading: "Rhythm creates structure",
        body: "Songs give children a beginning, middle, and end. That structure can make a learning moment feel familiar, especially when a child hears the same melody more than once.",
      },
      {
        heading: "Repetition supports memory",
        body: "Repeating a chorus, letter sound, or simple phrase gives children more chances to hear and process the same idea. This can support recall without making the lesson feel like a test.",
      },
      {
        heading: "Music can invite movement",
        body: "Some children learn by moving, clapping, rocking, or dancing. Songs give families a natural way to bring movement into learning while keeping the moment playful.",
      },
    ],
    learningGoals: ["Memory through repetition", "Listening skills", "Pattern recognition", "Calm focus"],
    parentTip: "Let your child choose whether to sing, move, listen quietly, or repeat one favorite part. All of those can be meaningful participation.",
  },
  {
    slug: "sensory-friendly-songs-for-preschool-kids",
    title: "Sensory-Friendly Songs for Preschool Kids",
    description: "A guide to using gentle songs, simple visuals, and predictable routines for preschool learning at home.",
    category: "Inclusive Learning",
    videoId: "Ga_sef8vcIA",
    videoTitle: "Ocean Animals Adventure",
    readingTime: "3 min read",
    keywords: ["sensory-friendly songs", "preschool learning songs", "gentle kids videos"],
    intro: "Sensory-friendly learning is about making a child feel safe, interested, and supported. Songs with simple patterns, clear visuals, and a steady pace can help children engage without pressure.",
    sections: [
      {
        heading: "Choose simple, predictable songs",
        body: "Songs that repeat key words and ideas are easier for young children to follow. Predictability can help children know what is coming next.",
      },
      {
        heading: "Match visuals with learning goals",
        body: "When a song talks about ocean animals, planets, or letters, matching images help children connect the sound of a word with what it means.",
      },
      {
        heading: "Keep the session short",
        body: "A short, positive learning moment is better than a long session that becomes tiring. Families can always return to the song later.",
      },
    ],
    learningGoals: ["Animal names", "Vocabulary", "Listening practice", "Gentle engagement"],
    parentTip: "Try watching with the volume lower first, then adjust based on what feels comfortable for your child.",
  },
  {
    slug: "abc-songs-for-kids-with-autism",
    title: "ABC Songs for Kids with Autism",
    description: "How alphabet songs can support autistic and neurodiverse children through repetition, visuals, and joyful practice.",
    category: "ABC Learning",
    videoId: "_ctNtUXel6Q",
    videoTitle: "Learning ABCs I to L",
    readingTime: "4 min read",
    keywords: ["ABC songs for kids with autism", "alphabet songs for autistic kids", "letters for neurodiverse learners"],
    intro: "Alphabet songs can be a friendly way to introduce letters. The melody, rhythm, and repeated sounds give children many chances to hear and recognize letter names.",
    sections: [
      {
        heading: "Start with a few letters at a time",
        body: "Some children enjoy the whole alphabet song, while others may do better with a smaller group of letters. Either approach is okay.",
      },
      {
        heading: "Connect letters to visuals",
        body: "Pointing to letters, pictures, or objects while the song plays can help children connect what they hear with what they see.",
      },
      {
        heading: "Celebrate recognition",
        body: "If a child notices one letter, hums one part, or watches with interest, that is progress. Learning through music should feel encouraging.",
      },
    ],
    learningGoals: ["Letter names", "Letter order", "Early literacy", "Confidence"],
    parentTip: "Replay one favorite section and ask, 'Do you see this letter?' Keep it light and playful.",
  },
  {
    slug: "visual-learning-activities-for-autistic-children",
    title: "Visual Learning Activities for Autistic Children",
    description: "Simple visual learning ideas using songs, pictures, characters, and repetition for children who learn best by seeing.",
    category: "Parent Guides",
    videoId: "8jCfqeT6iNc",
    videoTitle: "BLAST OFF! Solar System Song",
    readingTime: "4 min read",
    keywords: ["visual learning activities", "autistic children learning", "visual learners kids"],
    intro: "Visual learning can help children connect ideas with images. Songs about planets, animals, colors, and letters are a natural way to pair words with memorable pictures.",
    sections: [
      {
        heading: "Use pictures with songs",
        body: "When a song names a planet or animal, pause and look at the picture together. This gives the child time to connect the word, sound, and image.",
      },
      {
        heading: "Create a simple routine",
        body: "Try a pattern: watch, pause, point, repeat. A small routine can make learning feel predictable and calm.",
      },
      {
        heading: "Let characters support attention",
        body: "Friendly characters can give children a visual anchor. Children may remember a learning idea because they connect it with a character they enjoy.",
      },
    ],
    learningGoals: ["Visual recognition", "Planet names", "Vocabulary", "Routine-based learning"],
    parentTip: "After a video, ask your child to choose their favorite picture or character. That can open the door to more conversation.",
  },
  {
    slug: "inclusive-kids-learning-videos",
    title: "Inclusive Kids Learning Videos for Every Child",
    description: "Why inclusive children's content should support many learning styles through music, visuals, repetition, and joyful characters.",
    category: "Inclusive Learning",
    videoId: "Ga_sef8vcIA",
    videoTitle: "Ocean Animals Adventure",
    readingTime: "3 min read",
    keywords: ["inclusive kids learning videos", "educational videos for every child", "neurodiverse kids content"],
    intro: "Every child learns differently. Inclusive kids content gives children multiple ways to engage: listening, watching, moving, singing, repeating, or simply enjoying the story.",
    sections: [
      {
        heading: "Different children need different entry points",
        body: "Some children love music. Others connect first with visuals, characters, movement, or repeated words. A strong learning video gives children more than one way in.",
      },
      {
        heading: "Representation and confidence matter",
        body: "When children see joyful characters, caring friends, and positive learning moments, they can feel invited into the experience.",
      },
      {
        heading: "Parents can adapt the moment",
        body: "Families can pause, replay, lower the volume, skip ahead, or focus on one small learning goal. The best learning experience is the one that works for the child in front of you.",
      },
    ],
    learningGoals: ["Inclusive learning", "Vocabulary", "Music and movement", "Parent-child connection"],
    parentTip: "Use ABP videos flexibly. There is no one right way for a child to enjoy or learn from a song.",
  },
] satisfies Array<Omit<Article, "excerpt" | "readTime" | "publishDate" | "body">>;

export const articles: Article[] = articleDrafts.map((article) => ({
  ...article,
  excerpt: article.description,
  readTime: article.readingTime,
  publishDate: "May 25, 2026",
  body: articleBody(article),
}));

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return getArticle(slug);
}

export function getRelatedArticles(slug: string, count = 2) {
  return articles.filter((article) => article.slug !== slug).slice(0, count);
}
