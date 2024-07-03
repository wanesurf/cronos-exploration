# Cronos Balance Checker

This project is an Express-based web application that provides APIs to fetch the balance of CRO and CRC20 tokens for a given address. It utilizes the `web3.js` library to interact with the Cronos blockchain.

## Prerequisites

- Node.js
- npm (Node package manager)

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/wanesurf/cronos-exploration.git
   ```

2. Navigate to the project directory:

   ```sh
   cd cronos-exploration
   ```

3. Install the dependencies:

   ```sh
   npm install
   ```

## Run the Application

1. Start the Express server:

   ```sh
   node index.js
   ```

## Usage

The application provides the following APIs:

1. **GET /balance/:address**

   Fetch the balance of CRO for the given address.

   **Example:**

   ```sh
    curl -H "x-api-key: hello-cronos" http://localhost:3000/balance/0xEa4B19449dE124e33083eb8cb2B53964E2D27d9c
   ```

2. **GET /token-balance/:address/:contractAddress**

   Fetch the balance of a CRC20 token for the given address.

   **Example:**

   ```sh
   curl -H "x-api-key: hello-cronos" http://localhost:3000/balance/0x2e8Ec82F432d57Ec1585dC1Cb2313972AB63Ecac/0x2d03bece6747adc00e1a131bba1469c15fd11e03
   ```
