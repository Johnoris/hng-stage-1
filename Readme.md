# Simple Personal Info API

A basic API that returns  interesting mathematical properties about a number, along with a fun fact.

## Setup
1. Install dependencies:
```bash
npm install
```

2. Run the server:
```bash
npm start
```

## API Documentation

### Get number properties and fun facts
- **URL**: `/api/classify-number?number=150`
- **Method**: `GET`
- **Response**:
```json
{
    "number": "150",
    "is_prime": false,
    "is_perfect": false,
    "properties": [
        "even"
    ],
    "digit_sum": 6,
    "fun_fact": "150 is a Harshad number and an abundant number."
}
```

