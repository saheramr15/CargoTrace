# CargoTrace Setup Instructions

## Overview
CargoTrace is a secure cargo management platform built on the Internet Computer (ICP) with a React frontend and Rust backend. This guide will help you set up and run the project locally.

## Prerequisites
- Node.js (v16 or higher)
- Rust (latest stable)
- DFX (Internet Computer SDK)
- Git

## Installation Steps

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd CargoTrace
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd src/cargo_trace_frontend
npm install
cd ../..
```

### 3. Start Local Internet Computer
```bash
dfx start --background
```

### 4. Deploy Backend
```bash
# Deploy the Rust backend canister
dfx deploy cargo_trace_backend

# Generate TypeScript bindings
dfx generate cargo_trace_backend
```

### 5. Configure Frontend
Create a `.env` file in `src/cargo_trace_frontend/`:
```env
# Network Configuration
VITE_DFX_NETWORK=local

# Backend Canister ID (get this from dfx deploy output)
VITE_CANISTER_ID_CARGO_TRACE_BACKEND=rrkah-fqaaa-aaaaa-aaaaq-cai

# Internet Identity URL
VITE_INTERNET_IDENTITY_URL=http://127.0.0.1:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai

# Development Settings
VITE_DEV_MODE=true
VITE_ENABLE_MOCK_DATA=true
```

### 6. Build and Deploy Frontend
```bash
# Build the frontend
cd src/cargo_trace_frontend
npm run build

# Deploy the frontend assets
cd ../..
dfx deploy cargo_trace_frontend
```

### 7. Start Development Server
```bash
# For development with hot reload
cd src/cargo_trace_frontend
npm run dev
```

## Usage

### Access the Application
- **Frontend**: http://localhost:3000 (development) or http://127.0.0.1:4943 (deployed)
- **Backend**: Canister ID from dfx deploy output

### Login Process
1. Click "Login with Internet Identity"
2. Create or use an existing Internet Identity
3. Authorize the application
4. You'll be redirected to the dashboard

### Features Available

#### User Dashboard
- **Document Management**: Submit and view cargo documents
- **ACID Validation**: Validate Egyptian customs numbers
- **Loan Requests**: Request loans against verified documents
- **Token Management**: View and manage ICP tokens

#### Admin Panel
- **Document Verification**: Approve/reject submitted documents
- **Loan Management**: Approve/reject loan requests
- **User Management**: View user activities
- **System Overview**: Monitor platform statistics

### Testing the Integration

#### 1. Submit a Document
1. Go to Dashboard → Documents
2. Fill in the form:
   - ACID Number: Use one of the valid test numbers: `123456789`, `987654321`, `456789123`, `789123456`, `321654987`
   - CargoX Document ID: Any Ethereum-like hash (e.g., `0x1234567890abcdef`)
   - Cargo Value: Any positive number
3. Click "Submit Document for Verification"

#### 2. Verify as Admin
1. Go to Admin → Documents
2. Find your submitted document
3. Click the checkmark to approve it

#### 3. Request a Loan
1. Go to Dashboard → Loans
2. Select an approved document
3. Enter loan amount (max 80% of document value)
4. Set repayment date
5. Submit loan request

#### 4. Approve Loan as Admin
1. Go to Admin → Loans
2. Find the pending loan
3. Click the checkmark to approve it

## Backend API Reference

### Document Management
- `submit_document(acid_number, ethereum_tx_hash, value_usd)` - Submit new document
- `get_my_documents()` - Get user's documents
- `approve_document(document_id)` - Approve document (admin only)

### Loan Management
- `request_loan(document_id, amount, repayment_date)` - Request loan
- `get_my_loans()` - Get user's loans
- `approve_loan(loan_id)` - Approve loan (admin only)
- `repay_loan(loan_id, amount)` - Repay loan

### ACID Validation
- `validate_acid(acid_number)` - Validate Egyptian customs number
- `get_acid_validation(acid_number)` - Get validation history

### Token Management
- `get_balance()` - Get user's token balance
- `mint(amount)` - Mint new tokens
- `transfer(to, amount)` - Transfer tokens

## Troubleshooting

### Common Issues

#### 1. Backend Service Not Initialized
**Error**: "Backend service not initialized"
**Solution**: 
- Ensure you're logged in with Internet Identity
- Check that the canister ID is correct in your .env file
- Verify the backend is deployed: `dfx canister status cargo_trace_backend`

#### 2. ACID Validation Fails
**Error**: "Invalid ACID format"
**Solution**: 
- ACID numbers must be exactly 9 digits
- Use test numbers: `123456789`, `987654321`, `456789123`, `789123456`, `321654987`

#### 3. Document Submission Fails
**Error**: "Invalid ACID number"
**Solution**:
- Ensure the ACID number is in the valid test dataset
- Check that the Ethereum transaction hash is provided
- Verify the cargo value is a positive number

#### 4. Loan Request Fails
**Error**: "Document must be approved and NFT minted"
**Solution**:
- The document must be approved by an admin first
- Only documents with NFT minted status can be used for loans

### Development Tips

#### 1. Using Mock Data
The frontend includes a mock implementation for development. To use real ICP calls:
1. Uncomment the Actor creation code in `backendService.js`
2. Run `dfx generate` to create TypeScript bindings
3. Set `VITE_ENABLE_MOCK_DATA=false` in your .env

#### 2. Debugging Backend Calls
- Check browser console for detailed error messages
- Use `dfx canister call cargo_trace_backend <method> <args>` to test backend directly
- Monitor canister logs: `dfx canister call cargo_trace_backend get_transfers`

#### 3. Resetting Data
To clear all data and start fresh:
```bash
dfx stop
dfx start --clean --background
dfx deploy
```

## Production Deployment

### Mainnet Deployment
1. Update `.env` to use mainnet settings:
```env
VITE_DFX_NETWORK=ic
VITE_INTERNET_IDENTITY_URL=https://identity.ic0.app
```

2. Deploy to mainnet:
```bash
dfx deploy --network ic
```

3. Update canister IDs in your environment variables

### Security Considerations
- Never commit `.env` files with real canister IDs
- Use proper access controls for admin functions
- Validate all user inputs on both frontend and backend
- Implement proper error handling and logging

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the console logs for error details
3. Verify your setup matches the instructions
4. Check that all dependencies are up to date

## License

This project is licensed under the MIT License.
