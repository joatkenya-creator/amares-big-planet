export interface ArticleSection {
  type: "paragraph" | "heading" | "list" | "tip" | "video";
  text?: string;
  items?: string[];
  videoId?: string;
  videoTitle?: string;
}

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  date: string;
  emoji: string;
  readTime: string;
  content: ArticleSection[];
}

export const articles: Article[] = [
  {
    slug: "magical-monday-to-sunday-adventure",
    title: "A Magical Monday to Sunday Adventure",
    excerpt:
      "Hop aboard the Galaxy Train and sing your way through every day of the week! Amaré and the Gear Crew make learning Monday to Sunday an unforgettable adventure.",
    category: "Music & Learning",
    categoryColor: "#8B5CF6",
    date: "July 8, 2026",
    emoji: "📅",
    readTime: "4 min read",
    content: [
      {
        type: "paragraph",
        text: "Days of the week are one of the earliest and most useful concepts young children learn — and one of the trickiest to make stick! Seven abstract words in a fixed order, with no obvious visual clues, can feel like a lot for little minds. That's exactly why we created this song.",
      },
      {
        type: "video",
        videoId: "L-ggtCPoRjM",
        videoTitle: "A Magical Monday to Sunday Adventure — Amaré's Big Planet",
      },
      {
        type: "heading",
        text: "Why Learning the Days of the Week Matters",
      },
      {
        type: "paragraph",
        text: "Understanding the days of the week builds a child's sense of time, routine, and sequencing — all foundational skills for maths, literacy, and social development. When a child knows that Tuesday comes after Monday, they are practising the same logical ordering they'll later use for numbers, the alphabet, and even story structure.",
      },
      {
        type: "paragraph",
        text: "Routine also gives children a sense of security. 'Wednesday is park day' or 'Friday we visit Grandma' — these anchors help young children feel safe and in control of their world. Knowing the days by name gives them the language to talk about those routines.",
      },
      {
        type: "heading",
        text: "How to Use This Song at Home",
      },
      {
        type: "list",
        items: [
          "Watch it together every morning and say the current day out loud before pressing play",
          "Pause after each day and ask your child: 'What comes next?'",
          "After a week of watching, try singing it without the video — you'll be amazed how fast they remember",
          "Use a simple weekly chart on the fridge and move a sticker each morning to the correct day",
          "Ask at bedtime: 'What day is tomorrow?' and see them beam with pride when they get it right",
        ],
      },
      {
        type: "heading",
        text: "The Magic of Music for Memory",
      },
      {
        type: "paragraph",
        text: "Music turns repetition into play. The same child who struggles to recall a list of seven words after ten readings will often nail all seven days after hearing a catchy song just twice. That's because melody and rhythm act as memory scaffolding — the tune becomes a retrieval cue that makes the words easier to recall.",
      },
      {
        type: "paragraph",
        text: "In 'A Magical Monday to Sunday Adventure,' each day of the week gets its own moment in the spotlight, paired with movement and visuals that give each word a distinct identity. Monday isn't just a word — it's a moment, a feeling, a character on the Galaxy Train.",
      },
      {
        type: "tip",
        text: "Parent tip: Make a 'Day of the Week' ritual. Each morning, ask your child to find today on the chart, say it out loud, and sing the song together before breakfast. After two weeks, this will be completely automatic — and they'll feel incredibly proud.",
      },
      {
        type: "heading",
        text: "Songs, Stories & More",
      },
      {
        type: "paragraph",
        text: "This is just one of the many songs and adventures on Amaré's Big Planet. From the alphabet to the solar system, from counting to colours — every video is designed to make learning feel like the best part of your child's day. Subscribe on YouTube so you never miss a new episode.",
      },
    ],
  },
];
