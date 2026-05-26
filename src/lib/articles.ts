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
    slug: "abc-songs-for-preschool-kids",
    title: "ABC Songs for Preschool Kids",
    description: "How alphabet songs can help preschool children practice letters, sounds, listening, and early confidence.",
    category: "ABC Learning",
    videoId: "_ctNtUXel6Q",
    videoTitle: "Learning ABCs I to L",
    readingTime: "4 min read",
    keywords: ["ABC songs for preschool kids", "alphabet songs for kids", "early literacy songs"],
    intro: "ABC songs give children a joyful first step into early literacy. Music, visuals, and repetition help letters feel familiar before formal reading begins.",
    sections: [
      {
        heading: "Why alphabet songs work",
        body: "A song gives children a rhythm to follow, which makes letter names easier to remember. When letters appear with characters, colors, and movement, children get more than one way to connect with the lesson.",
      },
      {
        heading: "Practice a few letters at a time",
        body: "Young learners do not need to master the whole alphabet in one sitting. Families can focus on a small section, repeat it during the week, and celebrate one letter a child recognizes.",
      },
      {
        heading: "Make it active",
        body: "Children can point to letters, clap with the beat, say a letter sound, or find an object that begins with the same letter. These small activities turn screen time into shared learning time.",
      },
    ],
    learningGoals: ["Letter names", "Early literacy", "Listening skills", "Confidence with repetition"],
    parentTip: "Choose one letter from the song and look for it around the room after watching.",
  },
  {
    slug: "how-music-helps-kids-learn",
    title: "How Music Helps Kids Learn",
    description: "Learn how rhythm, repetition, melody, and movement can support memory, language, and joyful learning for children.",
    category: "Music & Learning",
    videoId: "9ryVeXuqv-M",
    videoTitle: "Live - Lofi Study Music for Kids",
    readingTime: "4 min read",
    keywords: ["music for kids learning", "kids learning through music", "educational songs for children"],
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
    learningGoals: ["Memory through repetition", "Listening skills", "Pattern recognition", "Language development"],
    parentTip: "Let your child sing, hum, dance, clap, or listen quietly. Each response can still be learning.",
  },
  {
    slug: "ocean-animal-videos-for-kids",
    title: "Ocean Animal Videos for Kids",
    description: "Simple ways ocean songs and videos can build vocabulary, curiosity, and early science learning for children.",
    category: "Ocean Animals",
    videoId: "Ga_sef8vcIA",
    videoTitle: "Ocean Animals Adventure",
    readingTime: "3 min read",
    keywords: ["ocean animals for kids", "sea animals song", "animal learning videos for children"],
    intro: "Ocean animal videos can introduce children to new words, creatures, colors, and habitats. A playful song makes early science feel exciting and easy to revisit.",
    sections: [
      {
        heading: "Build vocabulary through animals",
        body: "Names like fish, crab, dolphin, and octopus help children practice new sounds and meanings. Repeating those names in a song gives kids more chances to remember them.",
      },
      {
        heading: "Connect animals to movement",
        body: "Parents can ask children to swim like a fish, wiggle like an octopus, or snap like a crab. Movement keeps the lesson playful and helps children act out what they see.",
      },
      {
        heading: "Start simple science conversations",
        body: "A video can lead to questions like, 'Where does this animal live?' or 'What color is it?' These tiny conversations build curiosity and observation skills.",
      },
    ],
    learningGoals: ["Animal names", "Vocabulary", "Observation skills", "Curiosity about nature"],
    parentTip: "After watching, ask your child to choose their favorite ocean animal and describe one thing about it.",
  },
  {
    slug: "solar-system-song-for-kids",
    title: "Solar System Song for Kids",
    description: "How space songs can introduce planets, science vocabulary, imagination, and curiosity for young learners.",
    category: "Space & Science",
    videoId: "8jCfqeT6iNc",
    videoTitle: "BLAST OFF! Solar System Song",
    readingTime: "4 min read",
    keywords: ["solar system song for kids", "planets for children", "space videos for kids"],
    intro: "Space is full of wonder, and songs can make big science ideas feel friendly. Planet songs help children hear new words, imagine faraway places, and ask curious questions.",
    sections: [
      {
        heading: "Introduce planet names",
        body: "Children can begin by hearing the names of planets in a memorable order. The song does not have to teach every detail at once; familiarity comes first.",
      },
      {
        heading: "Use visuals to support meaning",
        body: "Bright planets, stars, rockets, and space scenes help children connect words with images. This is especially useful when the topic is something they cannot see outside every day.",
      },
      {
        heading: "Turn curiosity into conversation",
        body: "After the song, families can ask simple questions: Which planet was red? Which one had rings? What would you see from a rocket window?",
      },
    ],
    learningGoals: ["Planet names", "Science vocabulary", "Imagination", "Listening practice"],
    parentTip: "Draw circles for planets after watching and let your child color their own solar system.",
  },
  {
    slug: "screen-time-learning-activities-for-kids",
    title: "Screen Time Learning Activities for Kids",
    description: "Simple ways parents can turn educational videos into active learning moments at home.",
    category: "Parent Guides",
    videoId: "fY6_epxkJQo",
    videoTitle: "Shape the Future of Learning: Sponsor Amare's Big Planet",
    readingTime: "4 min read",
    keywords: ["screen time learning activities", "educational videos for kids", "learning at home for children"],
    intro: "Educational videos work best when they become part of a shared moment. Parents can use songs and stories to spark movement, conversation, drawing, counting, and pretend play.",
    sections: [
      {
        heading: "Pause and talk",
        body: "A short pause gives children time to answer, point, repeat a word, or ask a question. This turns watching into interaction.",
      },
      {
        heading: "Move with the video",
        body: "Children can clap to the beat, count steps, act like animals, or pretend to fly through space. Movement helps young learners stay engaged.",
      },
      {
        heading: "Extend the idea after watching",
        body: "After a video, children can draw a planet, find a letter, sort colors, or tell a short story about a favorite character.",
      },
    ],
    learningGoals: ["Conversation", "Movement", "Creative play", "Memory through repetition"],
    parentTip: "Pick one simple activity after each video, such as drawing one character or naming one new word.",
  },
  {
    slug: "sensory-friendly-songs-for-preschool-kids",
    title: "Sensory-Friendly Songs for Preschool Kids",
    description: "A guide to using gentle songs, simple visuals, and predictable routines for preschool learning at home.",
    category: "Inclusive Learning",
    videoId: "AfPHinD_Xn0",
    videoTitle: "LIVE: Study With Me | Lofi Focus Music for Kids & Homework Time",
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
    learningGoals: ["Vocabulary", "Listening practice", "Gentle engagement", "Comfort with routine"],
    parentTip: "Try watching with the volume lower first, then adjust based on what feels comfortable for your child.",
  },
] satisfies Array<Omit<Article, "excerpt" | "readTime" | "publishDate" | "body">>;

export const articles: Article[] = articleDrafts.map((article) => ({
  ...article,
  excerpt: article.description,
  readTime: article.readingTime,
  publishDate: "May 26, 2026",
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
