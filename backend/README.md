# CodeNav Backend API

Backend API service for the CodeNav contact form, built with Express.js and MySQL.

## Features

- RESTful API for contact form submissions
- MySQL database with connection pooling
- Environment-based configuration (dev/prod)
- Input validation and sanitization
- Rate limiting for API protection
- CORS support for frontend integration
- Health check endpoints
- Graceful shutdown handling

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server (v5.7 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
pnpm install
```

2. Set up the database:
```bash
mysql -u root -p < schema.sql
```

3. Configure the application:
   - Copy `src/config/config.example.ts` to `src/config/config.ts`
   - Update `configDev` for development settings
   - Update `configProd` for production settings
   - Never commit `config.ts` with real credentials

## Configuration

The application uses a single `config.ts` file with separate configurations for development and production environments. Configuration is selected based on `NODE_ENV`:

Edit `src/config/config.ts` to update:
- **Development config**: `configDev` object
- **Production config**: `configProd` object

Key configuration options:
- Database connection (host, port, user, password, database name)
- CORS settings (allowed origins)
- Rate limiting (requests per window)
- Server port number

## Running the Application

### Development Mode
```bash
pnpm run dev
```

### Production Mode
```bash
pnpm start
```

### Deploy to Production Server
```bash
# Always deploys with production configuration
pnpm run deploy
```

## API Endpoints

### Health Check
- `GET /api/health` - Check server and database status
- `GET /api/ping` - Simple ping endpoint

### Contact Management
- `POST /api/contacts` - Submit a new contact form
- `GET /api/contacts` - Get all contacts (with pagination)
- `GET /api/contacts/:id` - Get a specific contact
- `PATCH /api/contacts/:id/status` - Update contact status
- `DELETE /api/contacts/:id` - Delete a contact

## Request/Response Examples

### Submit Contact Form
```json
POST /api/contacts
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "General Inquiry",
  "message": "I would like to know more about your services."
}
```

### Response
```json
{
  "success": true,
  "message": "Contact form submitted successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "General Inquiry",
    "message": "I would like to know more about your services.",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
}
```

## Database Schema

The contacts table includes:
- `id` - Primary key
- `name` - Contact name
- `email` - Contact email
- `subject` - Message subject
- `message` - Full message text
- `status` - Contact status (pending/read/responded/archived)
- `created_at` - Timestamp of creation
- `updated_at` - Timestamp of last update

## Security Features

- Helmet.js for security headers
- Rate limiting to prevent abuse
- Input validation and sanitization
- SQL injection protection via parameterized queries
- CORS configuration for controlled access

## Error Handling

The API returns consistent error responses:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Validation errors if applicable
}
```

## Development vs Production

### Development
- Detailed error messages
- Higher rate limits
- Local MySQL connection
- CORS allows localhost origins

### Production
- Generic error messages
- Stricter rate limits
- Remote MySQL connection
- CORS restricted to production domain

## License

ISC