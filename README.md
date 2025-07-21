# 🎉 Community Coin App – Block Party Pilot

A platform that empowers students, vendors, and community organizers to engage in civic activities and earn real-world rewards using a community-based point system.

---

## 🚀 Overview

**Community Coin** is a gamified app designed for local events like block parties. Attendees earn points by completing community activities, which can be redeemed for vendor discounts. Members (event staff) manage activities, vendors offer promotions, and admins oversee analytics and goal progress.

---

## 👥 User Roles & Stories

### 🎓 Regular Users (Students/Attendees)

- ✅ Sign in with name and email
- 🎯 View a **live goal bar** showing total community progress
- 📷 Scan QR codes after activities to **earn points**
- 🛍 View vendor discounts based on point balance
- 💸 Redeem points for discounts with clear on-screen steps
- 🎟 Enter a raffle when the goal bar is completed

---

### 🧑‍💼 Members (Interns/Event Staff)

- 🔐 Log in with a **special code**
- 🏪 Add vendor stores and define discount offers
- 📝 Create and manage activities + point values
- 📲 Scan QR codes to validate activities and **award points**

---

### 🧾 Vendors

- 🔐 Vendor-specific portal login
- ✅ Business verification (manual or API - future)
- 🎁 Submit and manage **discounts/promotions**
- 👀 View & accept live redemption requests
- 💰 Track **discounts given** and **reimbursement summaries**

---

### 🛠 Admins

- 🔐 Secure admin login with code
- 📊 Access platform-wide analytics:
  - Total users, points earned/spent/remaining
  - Active vendors & discount usage
  - Goal bar status + raffle trigger
  - Participation rates per activity
  - Vendor payout summary

---

## 🧩 Features & Pages

| Page | Description | Time Estimate |
|------|-------------|---------------|
| **Sign In** | Role-based login: User, Member, Vendor, Admin | 2–3 days |
| **Landing Page** | Dynamic **Goal Bar** reflecting point progress | 3 days |
| **Activity Page** | QR generator + scanner to track participation | 4–5 days |
| **Discounts Page** | Grid of rewards, redemption flow, live point tracker | 5–6 days |
| **Members Page** | Add vendors, activities, and scan/award points | 4–5 days |
| **Vendors Page** | Create/edit discounts, approve redemptions, view payout summary | 5–6 days |
| **Admins Page** | Dashboard with global metrics, goal status, payouts | 6–7 days |
| **About Page** | Hestia’s mission, contact link | Due: July 22 |
| **Contact Page** | Form with name, email, and message fields | Due: July 25 |

---

## 🧪 MVP Scope

The **Minimum Viable Product** includes:

- ✅ Multi-role sign-in system (Users, Members, Vendors)
- ✅ QR-based activity tracking + point logging
- ✅ Discount redemption & vendor approval system
- ✅ Vendor dashboard for redemptions + payouts
- ✅ Community goal bar + raffle logic
- ✅ Admin analytics dashboard

---

## 📅 6-Week Development Timeline (2 Engineers)

| Week | Focus |
|------|-------|
| **Week 1** | Setup project structure (React + Express or Firebase), Auth system |
| **Week 2** | Landing Page + Goal Bar, database setup |
| **Week 3** | Activity Page with QR scanning and point logging, Admin backend |
| **Week 4** | Discounts Page + Member tools |
| **Week 5** | Vendor portal + Goal bar raffle trigger |
| **Week 6** | Final testing, bug fixes, admin polish, deployment walkthrough |

---

## 🛠 Tech Stack

**Frontend**:  
- React  
- Tailwind CSS *(optional for speed)*  
- QR Scanner JS Library  

**Backend**:  
- Node.js + Express (or Firebase alternative)

**Database**:  
- PostgreSQL *(preferred)* or Firebase Firestore

**Auth**:  
- Firebase Auth **OR** JWT + bcrypt

**Vendor Verification (Future)**:  
- Manual  
- Optionally: Stripe Connect or Yelp Business API

---

## 👨‍🔧 Engineering Needs

You can build this app with:

- **2 Engineers** over **6 weeks**
- Optional: Part-time UI/UX designer or React dev in Week 5–6 for polish

---

## 📣 About Project Hestia

**Hestia** is a Bronx-based nonprofit founded by Comp Sci High alumni Elijah Hawes and Jalen Watts. We aim to empower low-income communities through local commerce, civic engagement, and student-driven innovation.

---

## 📬 Contact

For questions or collaboration:
- Email: [your_email@example.com]
- Instagram: [@projecthestia]
- Website: [Coming Soon]

---

## License

MIT License

