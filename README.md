📋 Overview & Project Goal

e-Medical NPA is a modern Electronic Medical Record (EMR) system for the Nigerian Ports Authority, designed to:

Improve operational efficiency in patient handling.
Digitally track patient visits, dependents, medical history, lab tests, and prescriptions.
Integrate pharmacy inventory management, dispensing, and substitutions.
Provide clear, accountable audit trails of all actions.
Support secure access for Records Officers, Nurses, Doctors, Lab Technicians, and Pharmacists.
It covers the full workflow from patient registration to nursing, consultation, laboratory, pharmacy, inventory, and audit trail, ensuring efficient, standardized, and traceable patient care across NPA clinics.

⚙️ Tech Stack

Frontend: Next.js, TypeScript, Tailwind CSS, Shadcn/UI
Backend: Django, Django REST Framework
Database: PostgreSQL
Containerization: Docker
📂 Project Structure

e-medical-npa/
├── backend/ # Django Project
│ ├── npa_emr/ # Django project configs
│ ├── apps/ # Modular apps: records, nursing, consultation, lab, pharmacy, audit
│ ├── manage.py
│ └── requirements.txt
│
├── frontend/ # Next.js Frontend
│ ├── pages/
│ ├── components/
│ ├── public/
│ ├── styles/
│ └── package.json
│
├── docker-compose.yml # (Optional)
├── .env
└── README.md

🗂️ Core Functional Modules

✅ Records Department:

Search patient by personal/oracle number or name
Register new patients & dependents
Create visits and forward to nursing
✅ Nursing:

Queue & waiting area
Take vitals, forward to doctors
Manage consultation room assignments
✅ Consultation Room:

View full patient history
Record diagnosis, prescriptions
Refer to lab or pharmacy
✅ Laboratory:

Manage tests, approve collections, upload results
Handle referrals to partner labs
✅ Pharmacy:

Dispense medications, handle substitutions
Manage stock, requisitions, nurse stock
Record dispensing trail
✅ Audit Trail:

Track all user actions (records, nursing, doctors, lab, pharmacy)
Maintain compliance and accountability