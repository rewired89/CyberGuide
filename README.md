# CyberGuide

An interactive, browser-based learning platform for cybersecurity education — built to guide learners from networking fundamentals all the way to Security Architect.

## What It Is

CyberGuide teaches cybersecurity concepts through **learning chains**: each concept shows the foundational knowledge it builds on and the advanced topics it unlocks. Instead of memorizing isolated facts, you see how everything connects.

Coverage spans four learning paths:

| Path | Certification Focus |
|------|-------------------|
| Foundations | Networking essentials (OSI, TCP/IP, DNS, DHCP, HTTP/S) |
| Network+ | CompTIA N10-009 |
| Security+ | CompTIA SY0-701 |
| Architect Path | Security architecture, cloud security, IAM, threat modeling |

Every concept includes:
- A step-by-step **learning chain** showing conceptual flow
- A concise **explanation** and in-depth **detail**
- A **memory aid** to make it stick
- An **exam tip** for certification prep
- **Quick-reference facts** as scannable bullet pills

Progress is saved automatically in the browser via `localStorage` — no account needed.

## Getting Started

No build step, no dependencies, no installation.

1. Clone the repo
   ```bash
   git clone https://github.com/rewired89/cyberguide.git
   cd cyberguide
   ```

2. Open `index.html` in any modern browser

That's it. Or serve it with any static file server:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

## Project Structure

```
CyberGuide/
├── index.html   # App shell and layout
├── app.js       # UI logic, routing, search, progress tracking
├── data.js      # All 46+ cybersecurity concepts
└── style.css    # Dark theme, responsive layout
```

## Features

- **Zero dependencies** — pure HTML, CSS, and vanilla JavaScript
- **Offline capable** — works without an internet connection once loaded
- **Progress tracking** — mark concepts as learned; progress persists across sessions
- **Live search** — instant search across all concept titles, descriptions, and facts
- **Responsive** — sidebar collapses on mobile with a hamburger menu
- **Dark theme** — easy on the eyes during long study sessions

## Tech Stack

- Vanilla JavaScript (ES6+)
- CSS Grid + Flexbox, CSS custom properties
- Browser `localStorage` for persistence
- No frameworks, no build tools, no external libraries

## Contributing

Contributions are welcome — new concepts, corrections, better mnemonics, or UI improvements.

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

MIT
