# NurSYNC

**Seek Your Nursing Capability**

NurSYNC is a web-based learning platform tailored for nursing students. It offers dynamic educational tools, resource libraries, and analytics dashboards designed to enhance the academic journey and practical decision-making skills of future nurses.

---

## Features

### Apache Kafka
- Streaming data uses the c++ microservice to create a kafka topic
- This streaming data are used to enable parallel computation
- Run the zookeeper first then run the kafka, this kafka will run on port 9092


### Frontend
- **Built with:** HTML, CSS, and JavaScript
- **Responsive UI:** More responsive for desktop, also available in phone and are more responsive in landscape
- **Interactive Elements:** Flashcards, quizzes, and simulations to reinforce learning

### Backend
- **Powered by:** Node.js
- **Data Streaming with Apache Kafka:** Enables parallel computing and efficient handling of real-time events
- **Secure Authentication:** Signup and login routes for account control

---

## Core Capabilities

### Explore Our Features
- **Interactive Study Tools**
- **Progress Tracking**
- **Curriculum-Aligned Content**
- **Resource Library**

### Why Choose NurSYNC
- **Empowerment:** Build clinical decision-making confidence
- **Flexibility:** 24/7 self-paced access
- **Community Support:** Join a growing network of peers and mentors

---

## Developer

Developed and maintained by **Hearns Mori**

---

## Getting Started

### Prerequisites

- Node.js (>=14)
- Apache Kafka (Running locally or via Docker)
- npm or yarn

### Installation

```bash
git clone https://github.com/hearnsmori/nursync.git
cd nursync
npm install
```

### Kafka Setup
Run zookeeper:
```bash
#To run the zookeeper on root dir
cd kafka
pkg install python3
python3 zookeeper.py
```
Then run kafka:
```bash
#To run the kafka on root dir
cd kafka
python3 kafka.py
```
### .env Setup
- Create a .env file
```bash
SECRETKEY=[generate your own secret key, it is free]
MONGO_URI=[your mongodb]
PORT=10000
GEMINI_API_KEY=[your gemini api key, it is free check on internet]
```
### Running the App

```bash
npm start
```

Access the app via `http://localhost:10000`

---

## License

© 2025 NurSYNC – All rights reserved.

---

## Location

Developed in the **Philippines**
