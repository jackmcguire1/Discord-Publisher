# Discord Publisher

A React-based web application for creating and editing Discord messages with rich embeds, components, and webhook integrations.

## Features

### Message Editor
- **Rich Message Creation**: Build Discord messages with content, embeds, and interactive components
- **Real-time Preview**: See exactly how your message will appear in Discord
- **Embed Builder**: Create multiple embeds with titles, descriptions, fields, images, and more
- **Component Support**: Add buttons and select menus to your messages
- **File Attachments**: Upload and attach files to messages
- **Webhook Customization**: Set custom username and avatar for webhook messages
- **Undo/Redo**: Full undo/redo support for all message edits
- **Import/Export**: Import and export messages as JSON or cURL commands

## Getting Started

### Prerequisites
- Node.js 16+ and Yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Discord-Publisher.git
cd Discord-Publisher
```

2. Install dependencies:
```bash
yarn install
```

### Development

Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
yarn build
```

The built files will be output to the `docs/` directory, ready for deployment.

Preview the production build:
```bash
yarn preview
```

## Usage

### Creating a Message

1. **Message Content**: Enter your message text in the content field. Supports Discord markdown formatting.

2. **Adding Embeds**: Click "Add Embed" to create rich embed cards with:
   - Title and description
   - Author information
   - Thumbnail and main images
   - Custom fields (inline or full-width)
   - Footer text and timestamps
   - Custom colors

3. **Interactive Components**: Add buttons and select menus that users can interact with in Discord.

4. **File Attachments**: Drag and drop or click to upload files that will be attached to your message.

5. **Webhook Settings**: Customize the bot's display name and avatar for the message.

### Preview and Export

- **Live Preview**: The right panel shows a real-time preview of how your message will appear in Discord
- **JSON Export**: View and copy the raw JSON representation of your message
- **cURL Export**: Generate cURL commands to send your message via Discord webhooks

## Technical Details

- Built with React 18 and TypeScript
- Uses Vite for fast development and building
- State management with Zustand and undo/redo via Zundo
- Real-time validation using Zod schemas
- Styled with Tailwind CSS

## License

MIT License - see LICENSE file for details