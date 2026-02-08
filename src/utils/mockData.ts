import { TierType, LeaderboardEntry, Question } from '../types';
import { Flashcard } from '../components/quiz/Flashcards';

// Mock leaderboard data
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, name: 'Sarah Chen', university: 'MIT', tier: TierType.TITAN, score: 12450, avatar: 'SC' },
    { rank: 2, name: 'Ahmed Hassan', university: 'Stanford', tier: TierType.LEGEND, score: 8920, avatar: 'AH' },
    { rank: 3, name: 'Maria Garcia', university: 'Harvard', tier: TierType.LEGEND, score: 7650, avatar: 'MG' },
    { rank: 4, name: 'James Wilson', university: 'Yale', tier: TierType.LEGEND, score: 6280, avatar: 'JW' },
    { rank: 5, name: 'Priya Patel', university: 'Princeton', tier: TierType.MASTER, score: 4850, avatar: 'PP' },
    { rank: 6, name: 'Michael Brown', university: 'Columbia', tier: TierType.MASTER, score: 3920, avatar: 'MB' },
    { rank: 7, name: 'You', university: 'Your University', tier: TierType.SCHOLAR, score: 1850, avatar: 'YU', isCurrentUser: true },
    { rank: 8, name: 'Emma Thompson', university: 'Duke', tier: TierType.SCHOLAR, score: 1750, avatar: 'ET' },
    { rank: 9, name: 'David Kim', university: 'Cornell', tier: TierType.SCHOLAR, score: 1620, avatar: 'DK' },
    { rank: 10, name: 'Lisa Anderson', university: 'Brown', tier: TierType.EXPLORER, score: 890, avatar: 'LA' },
];

export const MOCK_NATIONAL_LEADERBOARD: LeaderboardEntry[] = [
    { rank: 1, name: 'Alex Rivera', university: 'Caltech', tier: TierType.TITAN, score: 15200, avatar: 'AR' },
    { rank: 2, name: 'Sarah Chen', university: 'MIT', tier: TierType.TITAN, score: 12450, avatar: 'SC' },
    { rank: 3, name: 'Jordan Lee', university: 'Berkeley', tier: TierType.TITAN, score: 11800, avatar: 'JL' },
    { rank: 4, name: 'Ahmed Hassan', university: 'Stanford', tier: TierType.LEGEND, score: 8920, avatar: 'AH' },
    { rank: 5, name: 'Maria Garcia', university: 'Harvard', tier: TierType.LEGEND, score: 7650, avatar: 'MG' },
    { rank: 6, name: 'Chris Taylor', university: 'Georgia Tech', tier: TierType.LEGEND, score: 6900, avatar: 'CT' },
    { rank: 7, name: 'James Wilson', university: 'Yale', tier: TierType.LEGEND, score: 6280, avatar: 'JW' },
    { rank: 8, name: 'Sophie Martin', university: 'UCLA', tier: TierType.LEGEND, score: 5850, avatar: 'SM' },
    { rank: 9, name: 'Ryan Johnson', university: 'Michigan', tier: TierType.LEGEND, score: 5420, avatar: 'RJ' },
    { rank: 10, name: 'Emily Davis', university: 'Northwestern', tier: TierType.MASTER, score: 4920, avatar: 'ED' },
];

// Demo user stats
export const DEMO_STATS = {
    questionsAnswered: 47,
    quizPassRate: 85,
    currentStreak: 7,
    aiRelianceDecrease: 42,
    totalStudyTime: 180,
};

// Study materials type
export interface StudyData {
    answer: string;
    quiz: Question[];
    easyQuiz: Question[]; // Easier questions for retry attempts
    humanized: string;
    topic: string;
    keyPoints: string[];
    flashcards: Flashcard[];
}

// Fallback AI responses for demo reliability
export const FALLBACK_RESPONSES: Record<string, StudyData> = {
    'photosynthesis': {
        topic: 'Photosynthesis',
        answer: `**Photosynthesis** is the process by which plants, algae, and some bacteria convert light energy into chemical energy stored in glucose.

**The Basic Equation:**
6CO₂ + 6H₂O + Light Energy → C₆H₁₂O₆ + 6O₂

**Key Components:**
1. **Chlorophyll**: Green pigment that captures light energy
2. **Chloroplasts**: Organelles where photosynthesis occurs
3. **Light Reactions**: Happen in thylakoid membranes, produce ATP and NADPH
4. **Calvin Cycle**: Happens in stroma, produces glucose

**Why It Matters:**
- Produces oxygen that we breathe
- Creates food/energy for plants
- Foundation of most food chains
- Helps regulate atmospheric CO₂`,
        quiz: [
            {
                id: 'q1',
                question: 'What is the primary function of chlorophyll in photosynthesis?',
                options: [
                    'To capture and absorb light energy',
                    'To produce carbon dioxide',
                    'To store water in leaves',
                    'To transport nutrients through the stem'
                ],
                correctAnswer: 0,
                explanation: 'Chlorophyll is a green pigment that captures light energy from the sun, which is essential for the photosynthesis process to occur.',
                timeLimit: 30
            },
            {
                id: 'q2',
                question: 'What are the products of photosynthesis?',
                options: [
                    'Carbon dioxide and water',
                    'Glucose and oxygen',
                    'ATP and chlorophyll',
                    'Nitrogen and hydrogen'
                ],
                correctAnswer: 1,
                explanation: 'Photosynthesis produces glucose (C₆H₁₂O₆) as stored energy and oxygen (O₂) as a byproduct that is released into the atmosphere.',
                timeLimit: 30
            },
            {
                id: 'q3',
                question: 'Where does the Calvin Cycle occur within the chloroplast?',
                options: [
                    'In the thylakoid membrane',
                    'In the cell wall',
                    'In the stroma',
                    'In the nucleus'
                ],
                correctAnswer: 2,
                explanation: 'The Calvin Cycle (light-independent reactions) occurs in the stroma, the fluid-filled space surrounding the thylakoids in the chloroplast.',
                timeLimit: 30
            }
        ],
        humanized: `So basically, photosynthesis is like a plant's way of making food using sunlight! 🌱☀️

Think of it this way: plants take in CO₂ (what we breathe out) and water, then use sunlight as energy to cook up glucose (sugar) for food. As a bonus, they release oxygen – which is pretty convenient for us!

The magic happens in chloroplasts, and the green stuff (chlorophyll) is what catches the sunlight. It's like a solar panel for plants!

The whole process has two main parts:
• Light reactions (need sunlight, happen in special membranes)
• Calvin Cycle (doesn't need light directly, happens in the liquid part)

Pretty cool that plants are basically feeding themselves AND giving us oxygen at the same time, right?`,
        keyPoints: [
            'Plants convert light energy into chemical energy (glucose) through photosynthesis',
            'The equation: 6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂',
            'Chlorophyll (green pigment) captures sunlight in chloroplasts',
            'Two stages: Light Reactions (in thylakoids) and Calvin Cycle (in stroma)',
            'Photosynthesis produces oxygen as a byproduct and is the foundation of food chains'
        ],
        flashcards: [
            { id: 'fc1', front: 'What is photosynthesis?', back: 'The process by which plants convert light energy into chemical energy (glucose)' },
            { id: 'fc2', front: 'What is the role of chlorophyll?', back: 'To capture and absorb light energy from the sun' },
            { id: 'fc3', front: 'Where do Light Reactions occur?', back: 'In the thylakoid membranes of chloroplasts' },
            { id: 'fc4', front: 'Where does the Calvin Cycle occur?', back: 'In the stroma of chloroplasts' },
            { id: 'fc5', front: 'What are the products of photosynthesis?', back: 'Glucose (C₆H₁₂O₆) and Oxygen (O₂)' },
            { id: 'fc6', front: 'What are the inputs of photosynthesis?', back: 'Carbon dioxide (CO₂), Water (H₂O), and Light energy' }
        ],
        easyQuiz: [
            {
                id: 'eq1',
                question: 'What do plants need to perform photosynthesis?',
                options: [
                    'Sunlight, water, and carbon dioxide',
                    'Only water',
                    'Only sunlight',
                    'Darkness and cold'
                ],
                correctAnswer: 0,
                explanation: 'Plants need three things: sunlight for energy, water from the soil, and carbon dioxide from the air.',
                timeLimit: 30
            },
            {
                id: 'eq2',
                question: 'What gas do plants release during photosynthesis?',
                options: [
                    'Carbon dioxide',
                    'Nitrogen',
                    'Oxygen',
                    'Hydrogen'
                ],
                correctAnswer: 2,
                explanation: 'Plants release oxygen as a byproduct of photosynthesis - this is the oxygen we breathe!',
                timeLimit: 30
            },
            {
                id: 'eq3',
                question: 'Why are plants green?',
                options: [
                    'Because of water',
                    'Because of chlorophyll',
                    'Because of sunlight',
                    'Because of soil'
                ],
                correctAnswer: 1,
                explanation: 'Plants are green because of chlorophyll, the pigment that absorbs sunlight for photosynthesis.',
                timeLimit: 30
            }
        ]
    },
    'newton': {
        topic: "Newton's First Law of Motion",
        answer: `**Newton's First Law of Motion** (Law of Inertia):

> An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction, unless acted upon by an unbalanced external force.

**Key Concepts:**

1. **Inertia**: The tendency of objects to resist changes in their state of motion
   - More mass = more inertia
   - A bowling ball is harder to push than a tennis ball

2. **Balanced vs Unbalanced Forces**:
   - Balanced forces: No change in motion (book on table)
   - Unbalanced forces: Motion changes (pushing a cart)

3. **Real-World Examples**:
   - Seatbelts protect you when a car stops suddenly
   - A hockey puck slides across ice until friction slows it
   - Passengers lurch forward when a bus brakes

**Why It Matters:**
This law explains why we need forces to start, stop, or change the direction of objects. It's fundamental to understanding all motion in our universe.`,
        quiz: [
            {
                id: 'q1',
                question: 'What property of matter does Newton\'s First Law describe?',
                options: [
                    'Gravity',
                    'Inertia',
                    'Momentum',
                    'Acceleration'
                ],
                correctAnswer: 1,
                explanation: 'Newton\'s First Law describes inertia – the tendency of objects to resist changes in their state of motion.',
                timeLimit: 30
            },
            {
                id: 'q2',
                question: 'According to Newton\'s First Law, what will happen to a moving object if no external force acts on it?',
                options: [
                    'It will gradually slow down',
                    'It will speed up over time',
                    'It will continue moving at constant velocity',
                    'It will change direction randomly'
                ],
                correctAnswer: 2,
                explanation: 'Without external forces, an object in motion will continue moving at the same speed and in the same direction indefinitely.',
                timeLimit: 30
            },
            {
                id: 'q3',
                question: 'Why do passengers lurch forward when a bus suddenly stops?',
                options: [
                    'Gravity pulls them forward',
                    'The bus pushes them forward',
                    'Their inertia keeps them moving while the bus stops',
                    'Air pressure pushes them'
                ],
                correctAnswer: 2,
                explanation: 'Due to inertia, passengers\' bodies tend to continue moving forward at the same speed they were traveling, even when the bus stops.',
                timeLimit: 30
            }
        ],
        humanized: `Newton's First Law is basically saying: things are lazy! 😅

Here's the deal:
• If something is sitting still, it wants to STAY still
• If something is moving, it wants to KEEP moving the same way

Unless... something pushes or pulls on it (a force)!

This "laziness" is called **inertia**. Heavier things have more inertia (think: it's way harder to push a truck than a skateboard).

**Real life examples you've probably felt:**
- When a car brakes suddenly and you fly forward? That's your body wanting to keep moving!
- Why seatbelts exist? To stop your inertia from launching you through the windshield
- Why a soccer ball needs a kick to move? It was happy sitting still!

So next time you don't want to get out of bed, just tell everyone you're demonstrating Newton's First Law 😄`,
        keyPoints: [
            'Objects at rest stay at rest unless acted upon by an unbalanced force',
            'Objects in motion stay in motion with the same speed and direction unless acted upon',
            'Inertia is the tendency of objects to resist changes in their state of motion',
            'More mass means more inertia (harder to start/stop)',
            'Forces must be unbalanced to cause a change in motion'
        ],
        flashcards: [
            { id: 'fc1', front: 'What is Newton\'s First Law also called?', back: 'The Law of Inertia' },
            { id: 'fc2', front: 'What is inertia?', back: 'The tendency of objects to resist changes in their state of motion' },
            { id: 'fc3', front: 'What happens to a moving object with no forces acting on it?', back: 'It continues moving at constant velocity in a straight line' },
            { id: 'fc4', front: 'Why do heavier objects have more inertia?', back: 'Because they have more mass, making them harder to start or stop' },
            { id: 'fc5', front: 'What type of forces cause changes in motion?', back: 'Unbalanced forces (net force ≠ 0)' }
        ],
        easyQuiz: [
            {
                id: 'eq1',
                question: 'What does a ball do if you don\'t push it?',
                options: [
                    'It stays still',
                    'It starts moving by itself',
                    'It floats up',
                    'It shrinks'
                ],
                correctAnswer: 0,
                explanation: 'Objects at rest stay at rest unless something pushes or pulls them! This is called inertia.',
                timeLimit: 30
            },
            {
                id: 'eq2',
                question: 'Why do you lean forward when a car brakes suddenly?',
                options: [
                    'Magic',
                    'The car pushes you',
                    'Your body wants to keep moving forward',
                    'Gravity pulls you'
                ],
                correctAnswer: 2,
                explanation: 'Your body has inertia - it wants to keep moving in the same direction even when the car stops!',
                timeLimit: 30
            },
            {
                id: 'eq3',
                question: 'Which is harder to push: a skateboard or a truck?',
                options: [
                    'A skateboard',
                    'A truck',
                    'They are the same',
                    'Neither can be pushed'
                ],
                correctAnswer: 1,
                explanation: 'A truck has more mass, so it has more inertia and is harder to start moving!',
                timeLimit: 30
            }
        ]
    },
    'default': {
        topic: 'Learning Concepts',
        answer: `I've analyzed your question and here's a comprehensive explanation:

**Key Points:**
1. This topic involves important foundational concepts that build upon each other
2. Understanding the core principles will help you apply this knowledge effectively
3. There are practical applications you should be aware of

**Detailed Explanation:**
The concept you're asking about is fundamental to understanding the broader subject area. It connects to related ideas and has real-world implications that make it valuable to understand deeply.

**Why This Matters:**
- Builds foundation for advanced concepts
- Has practical applications in everyday life
- Connects to other important topics in this field

**Summary:**
Take time to understand each component, and you'll find this knowledge builds naturally as you progress in your learning journey.`,
        quiz: [
            {
                id: 'q1',
                question: 'What is the most important aspect of understanding this concept?',
                options: [
                    'Memorizing definitions only',
                    'Understanding the underlying principles',
                    'Skipping to advanced topics',
                    'Ignoring practical applications'
                ],
                correctAnswer: 1,
                explanation: 'Understanding the underlying principles allows you to apply knowledge flexibly and build upon it for more advanced concepts.',
                timeLimit: 30
            },
            {
                id: 'q2',
                question: 'How do foundational concepts relate to advanced learning?',
                options: [
                    'They are unrelated',
                    'Advanced topics replace foundational ones',
                    'Foundational concepts are building blocks for advanced understanding',
                    'Only advanced topics matter'
                ],
                correctAnswer: 2,
                explanation: 'Foundational concepts serve as essential building blocks that make advanced topics easier to understand and apply.',
                timeLimit: 30
            },
            {
                id: 'q3',
                question: 'Why is connecting theory to practice important?',
                options: [
                    'It makes learning more relevant and memorable',
                    'Practice is optional',
                    'Theory alone is sufficient',
                    'Applications are not important'
                ],
                correctAnswer: 0,
                explanation: 'Connecting theory to practice makes learning more meaningful, memorable, and helps you understand real-world applications.',
                timeLimit: 30
            }
        ],
        humanized: `Let me break this down in a simpler way! 

The key thing to remember here is that this concept is all about understanding the "why" not just the "what."

Think of it like building blocks:
- Start with the basics ✓
- Build up your understanding ✓
- Connect it to real life ✓

Once you get the core idea, everything else starts to click into place. Don't worry about memorizing everything – focus on understanding the main principles first!

You've got this! 💪`,
        keyPoints: [
            'Focus on understanding principles, not just memorizing facts',
            'Foundational concepts are building blocks for advanced learning',
            'Connect theory to real-world applications for better retention',
            'Learning builds naturally when you understand core ideas first'
        ],
        flashcards: [
            { id: 'fc1', front: 'What\'s more important than memorization?', back: 'Understanding the underlying principles' },
            { id: 'fc2', front: 'Why are foundational concepts important?', back: 'They serve as building blocks for advanced understanding' },
            { id: 'fc3', front: 'How can you make learning more memorable?', back: 'Connect theory to practical, real-world applications' }
        ],
        easyQuiz: [
            {
                id: 'eq1',
                question: 'What helps you learn better?',
                options: [
                    'Copying answers without reading',
                    'Understanding the main ideas',
                    'Skipping all the details',
                    'Never asking questions'
                ],
                correctAnswer: 1,
                explanation: 'Understanding the main ideas helps you remember and apply what you learn!',
                timeLimit: 30
            },
            {
                id: 'eq2',
                question: 'Why should you connect what you learn to real life?',
                options: [
                    'It makes learning boring',
                    'It wastes time',
                    'It helps you remember better',
                    'It confuses you'
                ],
                correctAnswer: 2,
                explanation: 'Connecting theory to real life makes learning more meaningful and easier to remember!',
                timeLimit: 30
            },
            {
                id: 'eq3',
                question: 'What should you do before learning advanced topics?',
                options: [
                    'Skip the basics',
                    'Understand the basics first',
                    'Only read summaries',
                    'Ignore foundations'
                ],
                correctAnswer: 1,
                explanation: 'Understanding basics first makes advanced topics much easier to learn!',
                timeLimit: 30
            }
        ]
    }
};

// Get response based on question keywords
export function getFallbackResponse(question: string): StudyData {
    const lowerQ = question.toLowerCase();

    if (lowerQ.includes('photosynthesis') || lowerQ.includes('plant') || lowerQ.includes('chlorophyll')) {
        return FALLBACK_RESPONSES['photosynthesis'];
    }

    if (lowerQ.includes('newton') || lowerQ.includes('inertia') || lowerQ.includes('motion') || lowerQ.includes('first law')) {
        return FALLBACK_RESPONSES['newton'];
    }

    return FALLBACK_RESPONSES['default'];
}
