# 🎓 GradeQuizAWS — Intelligent Quiz & Progress Tracker (React + Firebase + AWS)

A **full-stack quiz application** that lets users **log in, take topic-wise quizzes, view detailed results, and track progress**, while also **archiving each submission securely on AWS S3** through a **serverless pipeline** (API Gateway → Lambda → S3).

---

## 🚀 Features

✅ **User Authentication** — Email/Password & Google login via Firebase Auth
✅ **Real-time Quizzes** — Topic-based quizzes with multiple choice questions from Firebase DB
✅ **Result Computation** — Instant scoring with correct/incorrect/unattempted breakdown
✅ **Progress Tracking** — Each user’s quiz history stored & fetched from Firebase
✅ **AWS Integration** — Every submission is archived in S3 using an API Gateway + Lambda pipeline
✅ **Certificates** — Auto-generated PDF certificate using `pdf-lib`
✅ **Contact Form** — Feedback form powered by EmailJS
✅ **Analytics** — Google Analytics 4 integrated for page & event tracking
✅ **Modern UI** — Built with React + Tailwind CSS + Vite

---

## 🧠 Tech Stack

| Layer             | Technology                            | Purpose                                      |
| ----------------- | ------------------------------------- | -------------------------------------------- |
| **Frontend**      | React (Vite)                          | UI rendering, routing, and quiz logic        |
| **Styling**       | Tailwind CSS                          | Responsive & modern styling                  |
| **Auth & Data**   | Firebase (Auth, Realtime DB, Storage) | Authentication, quiz data, progress tracking |
| **Cloud Backend** | AWS API Gateway + Lambda + S3         | Serverless backend to archive submissions    |
| **Email & PDF**   | EmailJS, pdf-lib                      | Contact form & certificate generation        |
| **Analytics**     | Google Analytics 4                    | User activity tracking                       |

---

## 🏗️ Architecture Overview

```
          ┌───────────────────────────┐
          │         React App         │
          │  (Vite + Tailwind + Auth) │
          └─────────────┬─────────────┘
                        │
        ┌───────────────┴────────────────┐
        │          Firebase               │
        │  • Auth (Email, Google)         │
        │  • Realtime Database (Quiz,     │
        │    Submissions, Topics)         │
        │  • Storage (Profile Images)     │
        └───────────────┬────────────────┘
                        │
                        │  Quiz Submission JSON
                        ▼
        ┌─────────────────────────────────────────┐
        │              AWS Cloud                  │
        │  API Gateway → Lambda → S3              │
        │  • Receives submission data             │
        │  • Stores it as JSON in S3 bucket       │
        │  • Returns S3 URL to frontend           │
        └─────────────────────────────────────────┘
```

---

## 🔐 Authentication Flow

1. User signs up / logs in via Firebase Auth (Email or Google).
2. AuthContext listens for auth state changes and stores `currentUser`.
3. Protected routes ensure only logged-in users can access quiz pages.
4. User profile image is uploaded to Firebase Storage.

---

## 🧩 Quiz Flow

1. **Quiz Data Fetch** — Questions are loaded from Firebase Realtime Database (`/quizzes/<topicId>/questions`).
2. **User Answers** — Local state tracks responses.
3. **Submit** —

   * Calculates score, accuracy, and summary.
   * Stores results in Firebase under `/submissions/<uid>/<submissionKey>`.
   * Sends the full result JSON to AWS API Gateway.
4. **AWS Processing** —

   * API Gateway triggers a Lambda function.
   * Lambda writes the quiz JSON into an S3 bucket (`submissions/<userId>/<timestamp>.json`).
   * S3 acts as a long-term archive.
5. **Result Display** — User sees detailed summary, leaderboard stats, and can download a certificate.

---

## ☁️ AWS Integration Details

| AWS Service         | Role                                                  |
| ------------------- | ----------------------------------------------------- |
| **API Gateway**     | Exposes a secure REST endpoint to receive quiz data   |
| **Lambda Function** | Processes incoming JSON & uploads it to S3            |
| **S3 Bucket**       | Stores all quiz responses as structured `.json` files |
| **IAM Role**        | Grants Lambda permission to `s3:PutObject`            |

> 📁 Each submission in S3 is saved as
> `submissions/<userId>/<timestamp>.json`

AWS provides a **durable, low-cost archival layer** while Firebase handles real-time app data.

---

## 🧾 Firebase Structure

```
topics/
  <topicId>/
    title: "React"
    noq: 10
quizzes/
  <topicId>/
    questions: [ {title, options, correct} ]
submissions/
  <uid>/
    <submissionKey>/
      topicId, score, percentage, date
submissionCount/
  <topicId>: totalSubmissions
```

---

## 📦 Project Setup

### 1️⃣ Clone the repo

```bash
git clone https://github.com/<your-username>/GradeQuizAWS.git
cd GradeQuizAWS
```

### 2️⃣ Install dependencies

For both client & server folders:

```bash
npm install
```

### 3️⃣ Add your `.env` file

Create a `.env` in the `client` directory:

```
# Firebase
VITE_API_KEY=
VITE_AUTH_DOMAIN=
VITE_DATABASE_URL=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=

# EmailJS
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=

# Google Analytics
VITE_GA_TRACKING_ID=
```

### 4️⃣ Run locally

```bash
npm run dev
```

App will start at **[http://localhost:5173](http://localhost:5173)**

---

## 🧠 Learning Highlights (talking points for interviews)

* **Serverless architecture**: integrated Firebase (BaaS) with AWS Lambda + S3 (FaaS + object storage).
* **Real-time + Archival separation**: Firebase for live user data, S3 for durable storage.
* **Authentication flow mastery**: implemented full Firebase Auth context for React.
* **Cloud communication**: securely posting JSON payloads from client → AWS API Gateway.
* **Scalability**: stateless backend with virtually unlimited S3 capacity.
* **Clean UI**: responsive React + Tailwind design with modular components.

---

## 🏅 Possible Enhancements

* Add AWS Cognito for unified AWS-side authentication.
* Add AWS Athena/QuickSight dashboards for quiz analytics on S3 data.
* Add email triggers via AWS SES for quiz summaries.
* Replace Firebase Realtime DB with DynamoDB for a full AWS stack version.

---

## 👨‍💻 Author

**Ansh**
📫 *Built with passion for learning, cloud, and modern web development.*

---

## 🪶 License

This project is open source under the **MIT License**.

---


