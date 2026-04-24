# Alu Razić — Demo Landing Page

## Stack: Vanilla HTML + CSS + JS

**Zašto ovaj stack:** Projekat je statički demo pitch koji klijent treba odmah otvoriti bez ikakve instalacije. Vanilla HTML/CSS/JS znači nultu overhead, nula dependencija, direktno otvaranje `index.html` u browseru. Build je instant — nema `npm install`, nema framework-specifičnih grešaka, nema ništa što bi moglo pući između mene i klijenta.

---

## Pokretanje lokalno

```
# Opcija 1 — direktno otvaranje
Dvostruki klik na: site/index.html

# Opcija 2 — lokalni server (preporučeno za video autoplay)
npx serve .
# ili
python -m http.server 8080
# pa otvori http://localhost:8080
```

> **Napomena za video:** Neki browseri blokiraju autoplay video kada se fajl otvori direktno (`file://`). Za ispravan prikaz heroja koristite lokalni server.

---

## Struktura fajlova

```
site/
├── index.html                        # Jedini HTML fajl — sve sekcije
├── assets/
│   ├── css/
│   │   └── style.css                 # Sav CSS, mobile-first
│   ├── js/
│   │   └── main.js                   # Vanilla JS: nav, scroll, lightbox, forma
│   ├── logo/
│   │   └── logo.jpg                  # Logo firme (header + footer inverted)
│   ├── video/
│   │   └── hero.mp4                  # Hero background video (4.9MB)
│   └── img/
│       ├── ponuda/
│       │   ├── pvc-stolarija-lb/     # LB PVC stolarija u bijeloj boji
│       │   ├── ulazna-vrata/         # Ulazna vrata (opća)
│       │   ├── ulazna-vrata-deceuninck/ # Deceuninck ulazna vrata
│       │   ├── garazna-sekciona/     # Sekciona garažna vrata sa BFT motorom
│       │   ├── garazna-rolo/         # Rolo i garažna sekciona vrata
│       │   ├── roletne/              # Aluminijske roletne
│       │   ├── ogradice-antracit/    # Aluminijske ogradice antracit
│       │   └── ogradice-bijele/      # Aluminijske ogradice bijele
│       └── projekti/
│           ├── vikendica-pvc/        # Zavrseni projekat: Vikendica sa LB PVC
│           ├── rolo-vrata-6m/        # Zavrseni projekat: Rolo vrata 6m
│           └── roletne-komarnici-zenica/ # Zavrseni projekat: Zenica montaža
└── README.md
```

---

## Asseti korišteni iz originalnog foldera

| Originalna lokacija | Gdje u sajtu |
|---|---|
| `public/logo/logo.jpg` | `assets/logo/logo.jpg` |
| `public/logo/hero-video.mp4` | `assets/video/hero.mp4` |
| `public/projekti/ponuda/LB pvc stolarija u bijeloj boji/*.jpg` | `assets/img/ponuda/pvc-stolarija-lb/` |
| `public/projekti/ponuda/Ulazna vrata/*.jpg` | `assets/img/ponuda/ulazna-vrata/` |
| `public/projekti/ponuda/Deceuninck ulazna vrata/*.jpg` | `assets/img/ponuda/ulazna-vrata-deceuninck/` |
| `public/projekti/ponuda/Sekciona garazna vrata sa BFT motorm/*.jpg` | `assets/img/ponuda/garazna-sekciona/` |
| `public/projekti/ponuda/Rolo i garazna sekciona vrata/*.jpg` | `assets/img/ponuda/garazna-rolo/` |
| `public/projekti/ponuda/Aluminijske roletne/*.jpg` | `assets/img/ponuda/roletne/` |
| `public/projekti/ponuda/Aluminijske ogradice u antracit boji/*.jpg` | `assets/img/ponuda/ogradice-antracit/` |
| `public/projekti/ponuda/Aluminijske ogradice u bijelij boji/*.jpg` | `assets/img/ponuda/ogradice-bijele/` |
| `public/projekti/zavrseni projekti/Vikendica sa nasom LB pvc stolarijom/*.jpg` | `assets/img/projekti/vikendica-pvc/` |
| `public/projekti/zavrseni projekti/Rolo vrata 6m/*.jpg` | `assets/img/projekti/rolo-vrata-6m/` |
| `public/projekti/zavrseni projekti/Uspjesno zavrsena montaza roletni i komarnika Zenica/*.jpg` | `assets/img/projekti/roletne-komarnici-zenica/` |

**Nije korišteno (logotipi dobavljača, nisu pogodni za sajt klijenta):**
- `BTF LOGO.jpg`, `BTF motor.png`, `LB Profile LOGO.jpg`, `Deceuninck logo.jpg`
- `sadrvana DECEUNINCK PVC stolarija/` — slike nisu korištene jer je kategorija pokriven sa `ulazna-vrata-deceuninck/`

---

## Deploy — Netlify (drag-and-drop, 30 sekundi)

1. Idi na [netlify.com](https://netlify.com) → Log in ili Sign up (besplatno)
2. Na Dashboard-u klikni **"Add new site" → "Deploy manually"**
3. Prevuci cijeli `site/` folder na upload zonu
4. Netlify generira URL tipa `amazing-name-123.netlify.app`
5. Optionalno: u Site settings promijeni ime u `alu-razic` → `alu-razic.netlify.app`

## Deploy — Vercel (drag-and-drop)

1. Idi na [vercel.com](https://vercel.com) → Sign up sa GitHub
2. Klikni **"Add New → Project"** → odaberi **"Browse"** i uploadaj `site/` folder
3. Framework preset: **"Other"** (static HTML)
4. Klikni Deploy — gotovo za ~10 sekundi

---

*Izrađeno za Alu Razić, Zavidovići, BiH — Demo pitch, 2026.*
