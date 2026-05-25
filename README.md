# College Review API

A RESTful API for a college review platform built with Node.js, Express, and MongoDB.

## Features

- Submit anonymous or named reviews
- Full-text search across review titles and stories
- Filter reviews by college name and vibe
- Server-side pagination and sorting
- Auto-updated college statistics (positive, neutral, negative counts, complaint rate)
- Anonymous ID generation
- Custom error handling

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Pattern:** MVC

## API Endpoints

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/reviews/all` | Get all reviews with filters, search, pagination |
| POST | `/api/v1/reviews/create` | Submit a new review |

### Colleges
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/colleges/all` | Get all colleges |
| GET | `/api/v1/colleges/:id` | Get college by ID with stats |

## Query Parameters

| Param | Type | Description |
|-------|------|-------------|
| `collegeName` | string | Filter by college name |
| `vibe` | string | Filter by vibe (positive, neutral, negative) |
| `search` | string | Search in title and story |
| `sort` | string | `newest` or `oldest` |
| `page` | number | Page number |
| `limit` | number | Results per page (default: 4) |

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository
```bash
   git clone https://github.com/M1Darsan2/college_review_backend.git
   cd college-review
   cd backend
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file
```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
```

4. Start the server
```bash
   npm start
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Port to run the server on |
| `MONGO_URI` | MongoDB connection string |

## Project Structure
├── controllers/
│   ├── reviewController.js
│   └── collegeController.js
├── models/
│   ├── reviewModel.js
│   └── collegeModel.js
├── routes/
│   ├── reviewRoutes.js
│   └── collegeRoutes.js
├── utils/
│   ├── appError.js
│   └── catchAsync.js
├── app.js
└── server.js