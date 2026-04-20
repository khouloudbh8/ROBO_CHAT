# RoboChat — Association ENSI

Interface de chatbot moderne en React + Vite, avec un design Dark Mode professionnel basé sur les couleurs du logo (noir, or, argent).

---

## 🚀 Installation & Lancement

### 1. Prérequis
Assurez-vous d'avoir **Node.js v18+** installé :
```bash
node -v
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Lancer le serveur de développement
```bash
npm run dev
```
→ Ouvrez votre navigateur sur **http://localhost:5173**

### 4. Build pour la production
```bash
npm run build
```

### 5. Prévisualiser le build
```bash
npm run preview
```

---

## 📁 Structure des fichiers

```
robochat/
├── index.html                    # Point d'entrée HTML
├── vite.config.js                # Config Vite
├── package.json
└── src/
    ├── main.jsx                  # Montage React
    ├── App.jsx                   # Layout principal (Sidebar + ChatBox)
    ├── components/
    │   ├── Sidebar.jsx           # Barre latérale (logo, nav, statut)
    │   ├── ChatBox.jsx           # Zone de chat (header + messages + input)
    │   ├── Message.jsx           # Bulle de message (user / bot)
    │   └── TypingIndicator.jsx   # Animation "bot est en train d'écrire"
    └── styles/
        ├── global.css            # Variables CSS, reset, base
        ├── App.css               # Layout flex principal
        ├── Sidebar.css           # Styles de la sidebar
        ├── ChatBox.css           # Styles du chat (header, messages, input)
        ├── Message.css           # Styles des bulles
        └── TypingIndicator.css   # Animation des points
```

---

## 🎨 Palette de couleurs

| Rôle         | Couleur     | Usage                         |
|--------------|-------------|-------------------------------|
| Fond         | `#000000`   | Arrière-plan général          |
| Or principal | `#D4A017`   | Accents, icônes, bordures     |
| Or lumineux  | `#F0C040`   | Textes d'accentuation, hover  |
| Argent       | `#A0A0A0`   | Textes secondaires, avatars   |
| Carte        | `#0d0d0d`   | Bulles et surfaces            |

---

## 🔧 Prochaines étapes — Intégration IA

Pour connecter un vrai backend IA, remplacez la logique `setTimeout` dans `ChatBox.jsx` par un appel API :

```js
// Dans la fonction sendMessage(), remplacer le setTimeout par :
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: text }),
})
const data = await response.json()
// Utiliser data.reply comme texte du bot
```

---

## 📝 Fonctionnalités

- ✅ Design Dark Mode professionnel (noir + or + argent)
- ✅ Sidebar responsive avec navigation
- ✅ Bulles de chat distinctes (utilisateur / bot)
- ✅ Simulation de réponse du bot avec délai réaliste
- ✅ Indicateur "en train d'écrire" animé
- ✅ Envoi avec Entrée / Maj+Entrée pour saut de ligne
- ✅ Bouton "Nouvelle conversation"
- ✅ Responsive mobile (sidebar en overlay)
- ✅ Animations d'apparition des messages
- ✅ CSS pur sans bibliothèques externes
