# LevelUp Basketball Training - Fullstack Monorepo

This is a modern TypeScript monorepo for a comprehensive basketball training application featuring:

- **Turborepo**: Monorepo management
- **React 19**: Latest React with concurrent features
- **Next.js 15**: Web app & marketing page with App Router
- **Tailwind CSS v4**: Modern CSS-first configuration
- **React Native [Expo](https://expo.dev/)**: Mobile/native app with New Architecture
- **[Convex](https://convex.dev)**: Backend, database, server functions
- **[Clerk](https://clerk.dev)**: User authentication
- **OpenAI**: AI-powered training insights and recommendations

## 🏀 Basketball Training Features

The LevelUp Basketball Training app provides comprehensive training management:

### **Core Features**
- **Personalized Workouts**: AI-generated training plans based on skill level and goals
- **Progress Tracking**: Monitor improvement with detailed analytics and performance metrics
- **Exercise Library**: Comprehensive database of basketball drills and skills
- **Session Management**: Track training sessions with ratings and energy levels
- **Goal Setting**: Set and track training objectives with progress visualization
- **Team Collaboration**: Train with your team, share workouts, and compete
- **Real-time Sync**: Changes sync instantly across web and mobile platforms

### **AI-Powered Features**
- **Workout Recommendations**: Personalized training plans based on your profile
- **Session Analysis**: Get feedback and insights on your training performance
- **Training Tips**: Receive expert coaching advice and motivation
- **Progress Insights**: AI analysis of your improvement patterns

### **User Experience**
- **Cross-Platform**: Seamless experience across web and mobile
- **Real-time Updates**: Live data synchronization
- **Responsive Design**: Optimized for all devices
- **Intuitive Interface**: Easy-to-use training management

## 🚀 Getting Started

### 1. Install Dependencies

If you don't have `pnpm` installed, run `npm install --global pnpm`.

Run `pnpm install`.

### 2. Configure Convex

> Note: The following command will print an error and ask you to add the
> appropriate environment variable to proceed. Continue reading on for how to do
> that.

```sh
cd packages/backend && pnpm run setup
```

The script will log you into Convex if you aren't already and prompt you to
create a project (free). It will then wait to deploy your code until you set the
environment variables in the dashboard.

Configure Clerk with [this guide](https://docs.convex.dev/auth/clerk). Then add
the `CLERK_ISSUER_URL` found in the "convex" template
[here](https://dashboard.clerk.com/last-active?path=jwt-templates), to your
Convex environment variables
[here](https://dashboard.convex.dev/deployment/settings/environment-variables&var=CLERK_ISSUER_URL).

Make sure to enable **Google and Apple** as possible Social Connection
providers, as these are used by the React Native login implementation.

After that, optionally add the `OPENAI_API_KEY` env var from
[OpenAI](https://platform.openai.com/account/api-keys) to your Convex
environment variables to get AI training insights.

The `setup` command should now finish successfully.

### 3. Configure Both Apps

In each app directory (`apps/web`, `apps/native`) create a `.env.local` file
using the `.example.env` as a template and fill out your Convex and Clerk
environment variables.

- Use the `CONVEX_URL` from `packages/backend/.env.local` for
  `{NEXT,EXPO}_PUBLIC_CONVEX_URL`.
- The Clerk publishable & secret keys can be found
  [here](https://dashboard.clerk.com/last-active?path=api-keys).

### 4. Run Both Apps

Run the following command to run both the web and mobile apps:

```sh
pnpm run dev
```

This will allow you to use the ⬆ and ⬇ keyboard keys to see logs for each
of the Convex backend, web app, and mobile app separately.
If you'd rather see all of the logs in one place, delete the
`"ui": "tui",` line in [turbo.json](./turbo.json).

## 📊 Database Schema

The app uses a comprehensive database schema designed for basketball training:

### **Core Tables**
- **Users**: Player profiles with position, experience, and preferences
- **Teams**: Team management for group training
- **Exercises**: Exercise library with categories and difficulty levels
- **Workouts**: Training plan templates
- **Sessions**: Individual training session records
- **Progress**: Performance tracking over time
- **Goals**: Training objectives and achievements
- **Practices**: Team practice sessions

### **Key Features**
- **User Profiles**: Basketball-specific data (position, height, weight, experience)
- **Exercise Categories**: Shooting, dribbling, defense, conditioning, strength
- **Progress Tracking**: Multiple metrics (reps, weight, time, distance, accuracy)
- **Goal Management**: Target-based objectives with deadlines
- **Team Features**: Coach assignments, attendance tracking, team practices

## 🎯 Training Workflow

1. **Profile Setup**: Create your basketball profile with position and experience
2. **Goal Setting**: Define training objectives and target metrics
3. **Workout Selection**: Choose from AI-recommended or custom training plans
4. **Session Tracking**: Record your training sessions with detailed metrics
5. **Progress Monitoring**: View analytics and improvement over time
6. **AI Insights**: Receive personalized feedback and recommendations

## 🛠️ Code Quality & Formatting

This project uses [Biome](https://biomejs.dev/) for linting, formatting, and maintaining code quality across the monorepo. Biome is a fast, all-in-one toolchain that provides:

- **Linting**: Static analysis to catch bugs and enforce code quality rules
- **Formatting**: Consistent code style across TypeScript, JavaScript, JSON, and CSS files
- **Import Sorting**: Automatic organization of import statements

### Available Commands

```sh
# Check for linting and formatting issues
pnpm run lint

# Fix linting and formatting issues automatically
pnpm run lint:fix

# Format code only (without linting)
pnpm run format:biome

# Check all issues (alias for lint)
pnpm run check
```

## 🚀 Deployment

In order to both deploy the frontend and Convex, run this as the build command from the apps/web directory:

```sh
cd ../../packages/backend && npx convex deploy --cmd 'cd ../../apps/web && turbo run build' --cmd-url-env-var-name NEXT_PUBLIC_CONVEX_URL
```

There is a vercel.json file in the apps/web directory with this configuration for Vercel.

## 📁 Project Structure

This monorepo template includes the following packages/apps:

### Apps and Packages

- `apps/web`: a [Next.js 15](https://nextjs.org/) basketball training web app with Tailwind CSS and Clerk
- `apps/native`: a [React Native](https://reactnative.dev/) basketball training mobile app built with [expo](https://docs.expo.dev/)
- `packages/backend`: a [Convex](https://www.convex.dev/) folder with the database schema and shared functions

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Key Directories

```
LevelUp Basketball Training/
├── apps/
│   ├── web/                 # Next.js web application
│   │   ├── src/app/         # App Router pages
│   │   ├── src/components/  # React components
│   │   │   ├── dashboard/   # Training dashboard components
│   │   │   └── home/        # Landing page components
│   │   └── public/          # Static assets
│   └── native/              # React Native mobile app
│       ├── src/screens/     # Mobile screens
│       ├── src/navigation/  # Navigation setup
│       └── src/assets/      # Mobile assets
├── packages/
│   └── backend/             # Convex backend
│       └── convex/          # Database schema & server functions
├── biome.json              # Code quality configuration
├── turbo.json              # Build orchestration
└── pnpm-workspace.yaml     # Workspace configuration
```

## 🏆 What Makes This Special

### **Basketball-Focused Design**
- **Position-Specific Training**: Tailored workouts for PG, SG, SF, PF, C
- **Skill Categories**: Shooting, dribbling, defense, conditioning, strength
- **Performance Metrics**: Basketball-specific tracking (accuracy, speed, endurance)
- **Team Integration**: Coach and team management features

### **AI-Powered Training**
- **Personalized Recommendations**: AI-generated workout plans
- **Performance Analysis**: Intelligent feedback on training sessions
- **Progress Insights**: Data-driven improvement recommendations
- **Motivational Coaching**: AI-powered encouragement and tips

### **Professional Features**
- **Real-time Sync**: Instant updates across all platforms
- **Comprehensive Analytics**: Detailed progress tracking and visualization
- **Team Collaboration**: Share workouts and compete with teammates
- **Goal Management**: Structured approach to training objectives

## 🤝 Contributing

This is a comprehensive basketball training platform designed to help players at all levels improve their game. The modular architecture makes it easy to add new features and customize the training experience.


