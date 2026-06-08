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
    `<p><em>Note: Amare's Big Planet creates Amare's songs, stories, and educational entertainment for families. This guide is not medical, diagnostic, or therapeutic advice.</em></p>`,
  ].join("");
}

const articleDrafts = [
  {
    slug: "autism-friendly-learning-videos-for-kids",
    title: "Autism-Friendly Learning Videos for Kids",
    description: "A parent-friendly guide to autism-friendly learning videos, gentle visuals, repetition, and sensory-aware educational songs for autistic and neurodiverse children.",
    category: "Inclusive Learning",
    videoId: "_ctNtUXel6Q",
    videoTitle: "Learning ABCs I to L",
    readingTime: "4 min read",
    keywords: [
      "autism-friendly learning videos",
      "educational videos for autistic children",
      "autism learning videos for kids",
      "sensory-friendly videos for autistic children",
      "neurodiverse kids learning",
      "inclusive kids learning",
    ],
    intro: "Many autistic and neurodiverse children learn best when lessons are calm, visual, repetitive, and joyful. Amare's Big Planet uses music, bright characters, simple words, and repeated ideas to support different learning styles without pressure.",
    sections: [
      {
        heading: "What makes a learning video autism-friendly?",
        body: "Helpful autism-friendly videos often use clear routines, predictable repetition, simple language, and visuals that match the words being sung or spoken. These choices can make learning feel less overwhelming and easier to follow for children who prefer structure.",
      },
      {
        heading: "How Amare's supports different learners",
        body: "Amare's songs are built around familiar learning topics such as letters, animals, planets, and music. Children can watch, listen, sing, move, or simply enjoy the characters at their own pace, which can be helpful for autistic children and sensory-sensitive learners.",
      },
      {
        heading: "Use autism learning videos as a shared activity",
        body: "A parent, caregiver, or teacher can pause the video, repeat a favorite part, point to letters or pictures, and celebrate small moments of recognition. The goal is connection, confidence, and fun, not forcing a child to perform.",
      },
    ],
    learningGoals: ["Letter recognition", "Listening practice", "Visual learning", "Sensory-aware repetition"],
    parentTip: "Start with one short autism-friendly video, then replay the same song another day. Familiarity can help children feel more confident.",
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
    intro: "Amare's ABC songs give children a joyful first step into early literacy. Music, visuals, and repetition help letters feel familiar before formal reading begins.",
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
    intro: "At Amare's, music is used to make learning feel predictable and enjoyable. Rhythm gives children a pattern to follow, while repeated lyrics can make letters, numbers, and ideas easier to remember.",
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
    intro: "Space is full of wonder, and Amare's planet songs can make big science ideas feel friendly. Planet songs help children hear new words, imagine faraway places, and ask curious questions.",
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
    intro: "Amare's educational videos work best when they become part of a shared moment. Parents can use songs and stories to spark movement, conversation, drawing, counting, and pretend play.",
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
    description: "A guide to sensory-friendly songs, gentle visuals, predictable routines, and calm learning videos for preschoolers, autistic children, and sensory-sensitive kids.",
    category: "Inclusive Learning",
    videoId: "AfPHinD_Xn0",
    videoTitle: "LIVE: Study With Me | Lofi Focus Music for Kids & Homework Time",
    readingTime: "3 min read",
    keywords: ["sensory-friendly songs", "preschool learning songs", "gentle kids videos", "sensory-friendly videos for autistic children", "calm learning videos for kids", "autism-friendly songs"],
    intro: "Sensory-friendly learning is about making a child feel safe, interested, and supported. Songs with simple patterns, clear visuals, and a steady pace can help preschoolers, autistic children, and sensory-sensitive kids engage without pressure.",
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
  {
    slug: "how-phonics-songs-help-toddlers-learn-to-read",
    title: "How Phonics Songs Help Toddlers Learn to Read",
    description: "Phonics songs build the listening skills toddlers need before reading begins. Here's what the research says, and how to use them at home.",
    category: "Phonics & Reading",
    videoId: "lq04hVUf0ng",
    videoTitle: "Learn the Alphabet A to T | ABC Phonics Songs & Toddler Learning Compilation",
    readingTime: "6 min read",
    keywords: [
      "phonics for toddlers",
      "phonics song",
      "phonics songs for kids",
      "letter sounds song",
      "alphabet song for toddlers",
      "learn the alphabet",
      "jolly phonics alternative",
      "early reading for kids",
    ],
    intro: "Before a child can read a single word on a page, their ear is already doing the hard work. They're sorting out which sounds belong to which letters, which sounds rhyme, and which little chunks of language keep popping up over and over. That's the quiet magic phonics songs tap into, long before the alphabet looks like anything more than squiggles on a wall.",
    sections: [
      {
        heading: "Phonics isn't the ABC song (and that matters)",
        body: "Most parents grew up singing the alphabet, which teaches the letter names: ay, bee, see. Phonics teaches something different — the sounds those letters actually make in words: \"ah\", \"buh\", \"kuh\". Both are useful, but it's phonics that does the heavy lifting when a child finally tries to read \"cat\" off a page. A good phonics song sneaks those sounds into music so kids hear them dozens of times without ever feeling drilled. If you've come across Jolly Phonics or Letterland, you've seen the same idea in different clothing. Phonics songs are simply the friendliest, lowest-pressure version of that same approach.",
      },
      {
        heading: "Why singing letter sounds actually sticks",
        body: "There's a reason you still remember the chorus of a song you haven't heard since you were eight, but you forget where you put your keys. Music and language live close to each other in the brain, and rhythm gives memory a place to hang on. When a toddler hears \"sss\" sung the same way every time they see the letter S, they start linking the sound to the shape without anyone explaining it. Repetition feels boring to adults — but to a two- or three-year-old, hearing the same song on the third morning in a row is what makes it click.",
      },
      {
        heading: "What makes a phonics song good for toddlers",
        body: "Not all alphabet songs are doing the same job. The ones that work hardest tend to share a few features: the letter sound is sung clearly (not buried under a chorus), only one or two letters get focus per minute, the visuals show the letter on screen exactly when the sound is sung, and the pace is calm enough for a small child to follow along. Songs that try to teach every letter in 90 seconds are fine for fun, but they're not really teaching. The slower ones — the kind that linger on three or four letters at a time — are where toddlers actually start absorbing the sounds.",
      },
      {
        heading: "How to use phonics songs at home (without making it a lesson)",
        body: "The biggest mistake parents make is turning a phonics song into homework. Toddlers can smell that from a mile away. Instead, just play the song while you're doing something else — making breakfast, folding laundry, in the car. Let it be background music for a week. Then start joining in on the part you've noticed your child already lip-syncing. Point to the letter on the screen when it appears. Match the sound to something around you: \"S like snake. Shhhh.\" Three minutes a day, no flashcards, no quiz at the end. That's enough.",
      },
      {
        heading: "Signs the song is doing its job",
        body: "You probably won't notice progress on day one. You'll notice it on day twelve, when your child points at the cereal box and says \"buh — banana!\" or sings the letter sounds before the song does. Some toddlers hum the chorus for weeks before they ever say a sound out loud. That's normal. Listening comes before speaking, and speaking comes before reading. If your child is engaged — bouncing, watching, repeating bits — the song is already working, even if it doesn't look like learning yet.",
      },
      {
        heading: "Where phonics songs fit into the bigger reading picture",
        body: "Phonics songs are a starting point, not the whole journey. Once your toddler is comfortable with letter sounds, the next steps come naturally: blending two sounds together (\"m\" + \"a\" = \"ma\"), spotting the same sound at the start of different words, and eventually pointing at the first letter of their own name. Books, scribbling, pretend reading — they all build on the same foundation the song laid down. The song is the door. You just have to keep opening it.",
      },
    ],
    learningGoals: [
      "Letter-sound recognition",
      "Phonemic awareness",
      "Early reading confidence",
      "Listening and memory",
      "Vocabulary growth",
    ],
    parentTip: "Sing the same phonics song three days in a row before adding a new one. Familiarity is what builds the confidence — variety can wait.",
  },
  {
    slug: "morning-routine-songs-for-toddlers",
    title: "Morning Routine Songs That Make Getting Ready Fun",
    description: "A practical guide to using morning songs to make getting dressed, eating breakfast, and leaving the house easier with toddlers.",
    category: "Routines & Music",
    videoId: "_ctNtUXel6Q",
    videoTitle: "Head Shoulders Knees & Toes Song for Kids | Fun Learning & Dance Along",
    readingTime: "5 min read",
    keywords: [
      "morning songs for toddlers",
      "kids morning routine",
      "sing along songs for kids",
      "toddler routine songs",
      "getting ready songs",
      "morning songs for preschool",
    ],
    intro: "Ask any parent who has tried to get a toddler out the door before 8am and you already know the truth: mornings aren't peaceful. There's a missing sock somewhere. Breakfast is on the floor. Somebody has very strong opinions about which shoes to wear today. This is where music quietly does what reminders can't. One parent on our site puts it perfectly: \"They learn new words and sing along every morning.\" That's not just a sweet line. That's a parenting trick worth stealing.",
    sections: [
      {
        heading: "Why songs work where reminders don't",
        body: "Telling a three-year-old it's time to brush their teeth gets you the same answer five days in a row: no. Singing the brushing song gets you a kid who marches to the bathroom without realizing they just agreed to something. Songs short-circuit the negotiation. They turn an instruction into a game, and a game is something a child wants to play. The rhythm also gives the routine a shape — a beginning, a middle, and an end — which is exactly the kind of structure toddlers crave even when they can't tell you why.",
      },
      {
        heading: "The wake-up song: starting the day with rhythm, not a fight",
        body: "The first three minutes of the morning often decide how the next two hours will feel. A gentle wake-up song — something warm, slow, and familiar — gives a half-asleep toddler a softer landing than the lights going on and somebody saying \"up, up, up\". You're not trying to teach anything yet. You're just signaling: the day has started, this is what we do now. The same song every morning becomes a kind of clock that your child trusts without needing to read it.",
      },
      {
        heading: "Songs for the messy middle (breakfast, brushing, dressing)",
        body: "This is where most mornings fall apart, and where music earns its keep. The trick is to have one short song tied to each transition. A two-minute breakfast song that ends right when the bowl should be empty. A 30-second tooth-brushing song that runs exactly as long as a good brush. A get-dressed song that names the clothes as you go — \"socks, then trousers, then shirt, then shoes\". You're not trying to be a music teacher. You're just giving each annoying step a soundtrack so it stops feeling like an argument.",
      },
      {
        heading: "Songs for the walk out the door (or into the car seat)",
        body: "Leaving the house is its own boss battle. A walking song or a buckle-up song moves the focus off the leaving and onto the singing. If your toddler resists the car seat, try a song that only plays once the straps are clicked in — they'll learn the cause and effect within a week. For walking to nursery or school, a counting song that goes step by step (one foot, two feet, three feet, four) is a small piece of magic. The walk shrinks. The mood lifts. You arrive without anyone having cried.",
      },
      {
        heading: "Building a tiny morning playlist",
        body: "You don't need fifty songs. You need five, used in the same order, every day. That's it. Pick a wake-up song, a breakfast song, a brushing-teeth song, a getting-dressed song, and a leaving-the-house song. Sing them yourself, or play them — both work. Resist the urge to keep switching tracks. The repetition is the whole point. A toddler who knows what song comes next knows what's about to happen next, and a toddler who knows what's about to happen next is a much calmer human being.",
      },
      {
        heading: "When the song stops working — and what to do",
        body: "Around three or four, kids sometimes start refusing the songs that used to charm them. This usually means one of two things: they've outgrown the song, or they're testing whether you'll keep the routine even if they push back. If it's the first, swap the song (not the routine — just the song). If it's the second, hold the line gently and keep singing anyway. The point was never the song itself. It was the predictability. As long as the order stays the same, the morning still works.",
      },
    ],
    learningGoals: [
      "Smoother transitions",
      "Vocabulary through routine",
      "Calm morning predictability",
      "Listening and following along",
      "Independent dressing and brushing",
    ],
    parentTip: "Pick three songs and use the same three for two weeks straight. The repetition is the point — kids feel safer when they know exactly what's coming next.",
  },
  {
    slug: "meet-the-galaxy-train-crew",
    title: "Meet the Galaxy Train Crew: Learning Through Space Adventures",
    description: "A friendly introduction to the Galaxy Train, the Gear Crew, and how character-led space adventures turn into real learning for kids.",
    category: "Galaxy Train",
    videoId: "8jCfqeT6iNc",
    videoTitle: "BLAST OFF! Solar System Train Song | Learn Planets aboard the Galaxy Train",
    readingTime: "6 min read",
    keywords: [
      "galaxy train",
      "kids space show",
      "space adventures for kids",
      "solar system for kids",
      "Amare's Big Planet characters",
      "learning through stories",
      "character-led learning",
    ],
    intro: "The Galaxy Train doesn't run on tracks. It runs on questions. Every time Amaré and the Gear Crew climb aboard, somebody on the train has wondered something out loud — what's a comet made of, why is Saturn wearing a ring, is the moon ever lonely up there — and the train carries them straight toward an answer. The kind of answer that becomes a song before it ever becomes a fact.",
    sections: [
      {
        heading: "Why a train? The thinking behind the show",
        body: "Kids love things that go. Cars, rockets, dinosaurs, trains — anything that moves with a sound. The Galaxy Train borrows that love and points it somewhere bigger. Instead of zipping past the next stop, this train rolls past Mars, slows down near Saturn, and pauses long enough for the crew to climb out and look around. It gives space — which can feel cold and far away — a friendly shape. A train feels safe. A train has a crew. And a crew, it turns out, makes learning feel less like a lesson and more like a trip.",
      },
      {
        heading: "Amaré — the curious one",
        body: "Amaré is the quiet engine of the whole show. He's calm, he's thoughtful, and he's the one who asks the question everybody else was secretly wondering. His role isn't to know the answers — it's to ask the kind of questions that get the crew moving. Children pick up on that quickly. They start asking more of their own questions after a few episodes, often the same ones Amaré asked first, because the show shows them that wondering out loud is the start of finding out.",
      },
      {
        heading: "The Gear Crew at a glance",
        body: "Around Amaré is a crew that each carries something different. Xavier brings the brave, energetic push. Trinity has a way with nature and growing things, even in a place as strange as space. Dee is the funny, clever inventor — give him a few parts and he'll build something nobody asked for but everyone needed. Neebah is sharp and logical, the one who notices the pattern first. Liz is calm and nurturing, the one who keeps everybody steady. Bruce is the analytical thinker, the strategist of the group. Together they cover the kinds of personalities your child might recognize in their own friends, classmates, or family.",
      },
      {
        heading: "How space stories become learning moments",
        body: "The Galaxy Train doesn't lecture. It lets the planets do the teaching. When the train passes Mars, somebody points out the red dust. When it stops near Jupiter, the kids notice the swirling storm. When Saturn rolls into view, Trinity reaches out toward the rings. The information comes in small, repeated bites tied to images and music — which happens to be exactly how young brains hold onto new ideas. A child who watches a Galaxy Train episode about the solar system doesn't memorize the planets. They get to know them, the way you get to know a neighborhood.",
      },
      {
        heading: "What kids actually take away from a Galaxy Train episode",
        body: "After an episode, you won't always hear your child reciting facts. What you'll hear is more interesting. They'll start telling stories — \"Saturn was sad because nobody visited\" — or asking real questions, like why the sun is so bright or whether there's grass on Mars. That's the show working. The facts are sticking, but the imagination is doing the gluing. By the time they're ready for school-style science, the planet names already feel like old friends, and the curiosity is already there to pick up wherever the teacher leaves off.",
      },
      {
        heading: "Watching together: turning a show into a conversation",
        body: "Galaxy Train episodes work fine on their own, but they work even better when an adult watches a few minutes alongside. You don't need to explain anything. Just notice things out loud — \"Look, the train is slowing down\" or \"I wonder what's next\". When the episode ends, ask one easy question: which crew member would your child want to sit next to on the train, and why. You'll learn more about how your child thinks from that one question than from a stack of quiz cards.",
      },
    ],
    learningGoals: [
      "Curiosity about space",
      "Science vocabulary",
      "Story comprehension",
      "Imagination and pretend play",
      "Empathy through characters",
    ],
    parentTip: "After an episode, ask which Galaxy Train crew member your child would sit next to — and why. That single question opens up more about how they think than any quiz ever will.",
  },
  {
    slug: "nyimbo-za-watoto-kwa-kiswahili",
    title: "ABC kwa Kiswahili: Nyimbo za Alfabeti kwa Watoto",
    description: "How Swahili ABC songs can help children learn herufi za alfabeti, pronunciation, rhythm, and early language confidence.",
    category: "Swahili Learning",
    videoId: "OYwPeUPu078",
    videoTitle: "ABC kwa Kiswahili",
    readingTime: "4 min read",
    keywords: [
      "ABC kwa Kiswahili",
      "herufi za alfabeti",
      "alfabeti kwa watoto",
      "nyimbo za alfabeti kwa watoto",
      "nyimbo za watoto",
      "nyimbo za watoto kwa Kiswahili",
      "kujifunza Kiswahili kwa watoto",
      "video za elimu kwa watoto",
      "katuni za watoto kwa Kiswahili",
      "Swahili alphabet song",
      "Kiswahili learning videos for children",
    ],
    intro: "ABC kwa Kiswahili gives children a warm way to hear herufi za alfabeti through music, rhythm, and repetition. With Amare's Big Planet, kids can enjoy a Swahili alphabet song while building early language confidence.",
    sections: [
      {
        heading: "Why ABC songs help children learn Kiswahili",
        body: "Alphabet songs make letter names easier to remember because children hear the same sounds again and again. A short Swahili ABC song can help a child practice listening, pronunciation, rhythm, and early letter recognition without feeling like a lesson.",
      },
      {
        heading: "Build language and cultural confidence",
        body: "For families in Kenya, Tanzania, Uganda, and across the diaspora, Kiswahili alphabet content helps children feel connected to language and identity. Even when a child mostly speaks English, hearing ABC kwa Kiswahili in music can make the language feel friendly and familiar.",
      },
      {
        heading: "Use the video as a shared activity",
        body: "Parents can watch with their child, repeat one letter, clap to the rhythm, or ask the child to find a sound they recognize. Small moments like these turn screen time into Kiswahili alphabet practice and family connection.",
      },
    ],
    learningGoals: ["Herufi za alfabeti", "Kiswahili pronunciation", "Listening practice", "Rhythm and memory"],
    parentTip: "After watching, choose one letter from the song and look for a word that begins with that sound.",
  },
  {
    slug: "nursery-rhymes-why-they-matter",
    title: "Nursery Rhymes & Kids' Songs: Why They Matter and How to Use Them",
    description: "Why nursery rhymes still belong in every childhood — what they do for a young brain, and how to weave them into a normal day.",
    category: "Nursery Rhymes",
    videoId: "eyEmlXfgIoA",
    videoTitle: "ABC Song A to P Compilation | Learn Letters & Words",
    readingTime: "7 min read",
    keywords: [
      "nursery rhymes",
      "kids songs",
      "children's songs",
      "sing along songs for kids",
      "classic nursery rhymes",
      "bedtime songs for toddlers",
      "nursery rhymes benefits",
    ],
    intro: "Nursery rhymes have been doing the same job for hundreds of years, and nothing in the parenting world has quite managed to replace them. Not screens, not flashcards, not the latest educational app. There's a reason for that. Long before a child can read, rhymes hand them a whole scaffolding for language — sound, rhythm, repetition, the little surprise at the end — wrapped in something so short they'll learn it without even meaning to.",
    sections: [
      {
        heading: "What nursery rhymes are actually doing in a young brain",
        body: "On the surface, a nursery rhyme is a tiny silly song. Underneath, it's quietly building a child's ear for language. Rhymes train kids to hear which sounds match (\"hill\" and \"Jill\"), which words pop with rhythm, and which little patterns repeat. That kind of listening is the foundation later reading is built on. Speech therapists and early-literacy researchers have spent decades pointing at the same thing: kids who grow up surrounded by nursery rhymes tend to find reading easier when it finally arrives. It's not magic. It's the ear doing thousands of tiny pattern-recognition reps without anybody calling it practice.",
      },
      {
        heading: "Rhyme + rhythm = memory that lasts",
        body: "Try to recall what you ate for lunch three Tuesdays ago. Now try to recall the words to \"Twinkle, Twinkle, Little Star\". One of those is gone forever, and the other has been with you since you were two. The mix of rhyme and steady rhythm is doing the same thing in your child's brain right now. Each rhyme becomes a little container their memory can carry around for the rest of their life. And the more of those containers a child collects, the easier it is to pour new language into them later.",
      },
      {
        heading: "Classic vs. new: which rhymes still earn their keep",
        body: "The old standards — \"Twinkle Twinkle\", \"Wheels on the Bus\", \"Itsy Bitsy Spider\", \"Old MacDonald\" — survived this long because they're well built. Short enough to learn quickly, repetitive enough to feel safe, just surprising enough to be fun. Newer kids' songs can absolutely do the same job, especially when they're made with the same ingredients. The test isn't \"old or new\" — it's whether the song has clear rhythm, repeating words, and something a child can join in on. If both boxes are ticked, it's worth singing.",
      },
      {
        heading: "How to fit nursery rhymes into a normal day",
        body: "Nobody needs a curriculum for this. Sing them in the bath. Sing them in the car. Sing them while you're stirring soup. Hum them when your toddler is upset and words aren't landing. The point isn't to set aside \"rhyme time\" between 4 and 4:30. It's that rhymes belong inside ordinary moments — the wait at the doctor's office, the slow walk home, the five minutes before bed. The more they live inside daily life, the more your child will reach for them on their own, eventually singing them to a stuffed bear long after you've left the room.",
      },
      {
        heading: "Nursery rhymes for shy or anxious kids",
        body: "For children who get overwhelmed easily — by new places, big groups, loud rooms — a familiar nursery rhyme can be a small portable safe spot. Singing one quietly together gives the child something to focus on that doesn't ask anything of them. No performance, no answer required, just a melody they already know. Many parents of autistic and sensory-sensitive children quietly use this trick every day. It works because the rhyme is predictable in a world that often isn't.",
      },
      {
        heading: "From rhymes to stories: what comes next",
        body: "Once a child knows a handful of rhymes by heart, the next steps unfold on their own. They'll start changing the words on purpose (\"Twinkle twinkle little FROG\"), inventing their own verses, and asking for longer songs and short stories. That's a sign the rhyme has finished its first job. Now it becomes a launchpad — for picture books, for sing-along songs, for the kind of made-up stories that fill a car ride. Don't retire the rhymes when this happens. Just let them live alongside the bigger language your child is starting to grow into.",
      },
      {
        heading: "Choosing kids' songs that aren't just noise",
        body: "There's an ocean of kids' content out there, and not all of it is doing your child any favors. A useful test: does the song have something to grab onto — words your child can repeat, a rhythm they can clap, a small idea they can hold? Or is it just bright colors and a fast beat? Slower, gentler songs are not boring. They're often the ones that stick. If a song leaves your child humming hours later, it's doing its job, no matter how simple it sounded the first time through.",
      },
    ],
    learningGoals: [
      "Phonemic awareness",
      "Memory and recall",
      "Vocabulary growth",
      "Emotional comfort",
      "Bonding through shared songs",
    ],
    parentTip: "Don't try to teach all the rhymes. Pick five or six, sing them often, and let your child outgrow them on their own time. The ones they ask for again are the ones doing the real work.",
  },
] satisfies Array<Omit<Article, "excerpt" | "readTime" | "publishDate" | "body">>;

const swahiliPlanetSongArticle: Article = {
  slug: "sayari-zote-za-mfumo-wa-jua",
  title: "Sayari Zote za Mfumo wa Jua 🌍🚀 — Learn Planets in Swahili!",
  description: "Amaré and the Gear Crew are now teaching kids about the solar system in Swahili! Watch our new planet song and explore the universe in a whole new language.",
  excerpt: "Amaré and the Gear Crew are now teaching kids about the solar system in Swahili! Watch our new planet song and explore the universe in a whole new language.",
  category: "Activities",
  videoId: "hic5LyxRj2U",
  videoTitle: "Sayari Zote za Mfumo wa Jua — Swahili Planet Song",
  readingTime: "2 min read",
  readTime: "2 min read",
  publishDate: "2026-05-25",
  keywords: [
    "swahili planet song",
    "learn planets in swahili",
    "solar system in kiswahili",
    "african language learning for kids",
    "multilingual kids songs",
  ],
  intro: "",
  sections: [],
  learningGoals: [],
  parentTip: "",
  body: [
    `<p>We've been dreaming about this one for a while. Amaré's Big Planet is officially expanding into Swahili — and we're starting with the solar system.</p>`,
    `<p>Our brand-new song, <em>Sayari Zote za Mfumo wa Jua</em>, teaches kids every planet in our solar system in Kiswahili. From Utaridi (Mercury) all the way out to Neptuni (Neptune), children can sing along, hear the names, and start building a connection to space science in a language spoken by over 100 million people across East Africa and beyond.</p>`,
    `<iframe src="https://www.youtube.com/embed/hic5LyxRj2U" title="Sayari Zote za Mfumo wa Jua — Swahili Planet Song" style="width:100%;aspect-ratio:16/9;border-radius:12px;border:none;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    `<p>This matters to us personally. Our team is based in both Kenya and the United States, so Swahili is close to our hearts. It's the language of home for some of us, and a bridge between cultures for all of us. Making learning content available in African languages isn't just a nice idea — it's something we believe every child deserves. This song is our first step, and we have so much more planned.</p>`,
    `<p>For families already raising bilingual or multilingual kids, this is a fun new tool. For families discovering Swahili for the first time, it's an invitation to explore the world through a different lens. Either way, the Gear Crew is right there with your child, making the journey playful and musical.</p>`,
    `<p>We're just getting started with multilingual content. If you want to follow along as we add more languages and more songs, <a href="https://www.youtube.com/@AmaresBigPlanet?sub_confirmation=1" target="_blank" rel="noopener noreferrer">subscribe to Amaré's Big Planet on YouTube</a> so you never miss a new release. The universe sounds even bigger when you can explore it in more than one language.</p>`,
  ].join(""),
};

export const articles: Article[] = [
  swahiliPlanetSongArticle,
  ...articleDrafts.map((article) => ({
    ...article,
    excerpt: article.description,
    readTime: article.readingTime,
    publishDate: "May 26, 2026",
    body: articleBody(article),
  })),
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleBySlug(slug: string) {
  return getArticle(slug);
}

const relatedArticleSlugs: Record<string, string[]> = {
  "autism-friendly-learning-videos-for-kids": [
    "sensory-friendly-songs-for-preschool-kids",
    "abc-songs-for-preschool-kids",
    "screen-time-learning-activities-for-kids",
  ],
  "abc-songs-for-preschool-kids": [
    "how-phonics-songs-help-toddlers-learn-to-read",
    "how-music-helps-kids-learn",
    "nursery-rhymes-why-they-matter",
  ],
  "how-music-helps-kids-learn": [
    "abc-songs-for-preschool-kids",
    "sensory-friendly-songs-for-preschool-kids",
    "nursery-rhymes-why-they-matter",
  ],
  "ocean-animal-videos-for-kids": [
    "screen-time-learning-activities-for-kids",
    "how-music-helps-kids-learn",
    "solar-system-song-for-kids",
  ],
  "solar-system-song-for-kids": [
    "meet-the-galaxy-train-crew",
    "screen-time-learning-activities-for-kids",
    "ocean-animal-videos-for-kids",
  ],
  "screen-time-learning-activities-for-kids": [
    "autism-friendly-learning-videos-for-kids",
    "solar-system-song-for-kids",
    "morning-routine-songs-for-toddlers",
  ],
  "sensory-friendly-songs-for-preschool-kids": [
    "autism-friendly-learning-videos-for-kids",
    "how-music-helps-kids-learn",
    "morning-routine-songs-for-toddlers",
  ],
  "how-phonics-songs-help-toddlers-learn-to-read": [
    "abc-songs-for-preschool-kids",
    "nursery-rhymes-why-they-matter",
    "how-music-helps-kids-learn",
  ],
  "morning-routine-songs-for-toddlers": [
    "sensory-friendly-songs-for-preschool-kids",
    "nursery-rhymes-why-they-matter",
    "screen-time-learning-activities-for-kids",
  ],
  "meet-the-galaxy-train-crew": [
    "solar-system-song-for-kids",
    "ocean-animal-videos-for-kids",
    "screen-time-learning-activities-for-kids",
  ],
  "nyimbo-za-watoto-kwa-kiswahili": [
    "nursery-rhymes-why-they-matter",
    "how-music-helps-kids-learn",
    "abc-songs-for-preschool-kids",
  ],
  "nursery-rhymes-why-they-matter": [
    "nyimbo-za-watoto-kwa-kiswahili",
    "morning-routine-songs-for-toddlers",
    "how-phonics-songs-help-toddlers-learn-to-read",
  ],
};

export function getRelatedArticles(slug: string, count = 2) {
  const article = getArticle(slug);
  if (!article) return [];

  const explicit = (relatedArticleSlugs[slug] ?? [])
    .map((relatedSlug) => getArticle(relatedSlug))
    .filter((relatedArticle): relatedArticle is Article => Boolean(relatedArticle));

  const fallback = articles.filter((candidate) => {
    if (candidate.slug === slug) return false;
    if (explicit.some((relatedArticle) => relatedArticle.slug === candidate.slug)) return false;
    return candidate.category === article.category || candidate.keywords.some((keyword) => article.keywords.includes(keyword));
  });

  const remaining = articles.filter((candidate) => {
    if (candidate.slug === slug) return false;
    if (explicit.some((relatedArticle) => relatedArticle.slug === candidate.slug)) return false;
    if (fallback.some((relatedArticle) => relatedArticle.slug === candidate.slug)) return false;
    return true;
  });

  return [...explicit, ...fallback, ...remaining].slice(0, count);
}
