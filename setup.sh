#!/bin/bash

# CargoTrace Setup Script
# This script automates the setup process for the CargoTrace project

set -e

echo "🚀 Starting CargoTrace Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if dfx is installed
check_dfx() {
    if ! command -v dfx &> /dev/null; then
        print_error "DFX is not installed. Please install it first:"
        echo "Visit: https://internetcomputer.org/docs/current/developer-docs/setup/install/"
        exit 1
    fi
    print_success "DFX is installed"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install it first."
        exit 1
    fi
    print_success "Node.js is installed"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install it first."
        exit 1
    fi
    print_success "npm is installed"
}

# Install dependencies
install_dependencies() {
    print_status "Installing root dependencies..."
    npm install
    
    print_status "Installing frontend dependencies..."
    cd src/cargo_trace_frontend
    npm install
    cd ../..
    
    print_success "Dependencies installed successfully"
}

# Start local Internet Computer
start_local_ic() {
    print_status "Starting local Internet Computer..."
    
    # Check if dfx is already running
    if dfx ping --network local 2>/dev/null; then
        print_warning "Local Internet Computer is already running"
    else
        dfx start --background --clean
        print_success "Local Internet Computer started"
        
        # Wait for it to be ready
        print_status "Waiting for local Internet Computer to be ready..."
        sleep 10
    fi
}

# Deploy backend
deploy_backend() {
    print_status "Deploying backend canister..."
    dfx deploy cargo_trace_backend
    
    # Get canister ID
    CANISTER_ID=$(dfx canister id cargo_trace_backend)
    print_success "Backend deployed with canister ID: $CANISTER_ID"
    
    # Generate TypeScript bindings
    print_status "Generating TypeScript bindings..."
    dfx generate cargo_trace_backend
    print_success "TypeScript bindings generated"
}

# Create environment file
create_env_file() {
    print_status "Creating environment configuration..."
    
    CANISTER_ID=$(dfx canister id cargo_trace_backend)
    
    cat > src/cargo_trace_frontend/.env << EOF
# CargoTrace Frontend Environment Configuration

# Network Configuration
VITE_DFX_NETWORK=local

# Backend Canister ID
VITE_CANISTER_ID_CARGO_TRACE_BACKEND=$CANISTER_ID

# Internet Identity URL
VITE_INTERNET_IDENTITY_URL=http://127.0.0.1:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai

# Development Settings
VITE_DEV_MODE=true
VITE_ENABLE_MOCK_DATA=true
EOF
    
    print_success "Environment file created at src/cargo_trace_frontend/.env"
}

# Build frontend
build_frontend() {
    print_status "Building frontend..."
    cd src/cargo_trace_frontend
    npm run build
    cd ../..
    print_success "Frontend built successfully"
}

# Deploy frontend
deploy_frontend() {
    print_status "Deploying frontend..."
    dfx deploy cargo_trace_frontend
    print_success "Frontend deployed successfully"
}

# Main setup function
main() {
    print_status "Checking prerequisites..."
    check_dfx
    check_node
    check_npm
    
    print_status "Installing dependencies..."
    install_dependencies
    
    print_status "Starting local Internet Computer..."
    start_local_ic
    
    print_status "Deploying backend..."
    deploy_backend
    
    print_status "Creating environment configuration..."
    create_env_file
    
    print_status "Building frontend..."
    build_frontend
    
    print_status "Deploying frontend..."
    deploy_frontend
    
    print_success "🎉 CargoTrace setup completed successfully!"
    
    echo ""
    echo "📋 Next steps:"
    echo "1. Start the development server: cd src/cargo_trace_frontend && npm run dev"
    echo "2. Open your browser to: http://localhost:3000"
    echo "3. Login with Internet Identity"
    echo "4. Test the application using the instructions in SETUP_INSTRUCTIONS.md"
    echo ""
    echo "🔗 Useful URLs:"
    echo "- Frontend (dev): http://localhost:3000"
    echo "- Frontend (deployed): http://127.0.0.1:4943"
    echo "- Internet Identity: http://127.0.0.1:4943/?canisterId=rdmx6-jaaaa-aaaaa-aaadq-cai"
    echo ""
    echo "📚 For more information, see SETUP_INSTRUCTIONS.md"
}

# Run main function
main "$@"
