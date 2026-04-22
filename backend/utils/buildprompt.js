const fs = require('fs')
const path = require('path')

const buildPrompt = () => {
  const raw = fs.readFileSync(
    path.join(__dirname, '../data/association_robotique_ensi.json'), 'utf-8'
  )
  const info = JSON.parse(raw)
  const a = info.association

  // Construire la liste des pôles
  const poles = info.poles.map(p => `- ${p.nom}: ${p.description}`).join('\n')

  // Construire les axes
  const axes = info.axes.map(ax => {
    let content = `\n### ${ax.nom}\n${ax.description}`
    if (ax.technologies) content += `\nTechnologies: ${ax.technologies.join(', ')}`
    if (ax.evenements)   content += `\nÉvénements: ${ax.evenements.map(e => e.nom).join(', ')}`
    return content
  }).join('\n')

  // ⬇️ Colle ici le SYSTEM_PROMPT de ton fichier Python (la grande chaîne)
  //    et ajoute les infos JSON dynamiquement à la fin
  const systemPrompt = `
Tu es RoboBot, l'assistant officiel de l'${a.nom} (${a.ecole}).
Créée en ${a.annee_creation}, basée à ${a.localisation}.
${a.description}

=== INFORMATIONS OFFICIELLES ===
Nom: ${a.nom} (${a.sigle})
Type: ${a.type}
Domaines: ${a.domaines.join(', ')}
Facebook: ${a.reseaux_sociaux.facebook}
Instagram: ${a.reseaux_sociaux.instagram}

=== PÔLES ===
${poles}

=== AXES DE L'ASSOCIATION ===
${axes}

=== CHIFFRES CLÉS ===
Membres: ~${info.chiffres_cles.nombre_adherents_approximatif}
Compétitions: ${info.chiffres_cles.competitions_remportees}

[... ici tu gardes tout le contenu technique du SYSTEM_PROMPT Python ...]

RÈGLE STRICTE: Si la question ne concerne pas la robotique, l'embarqué, 
l'électronique ou l'AR-ENSI, réponds: "Je suis RoboBot, spécialisé en 
robotique pour l'AR-ENSI. Pose-moi une question dans ce domaine ! 🤖"
`
  return systemPrompt
}

module.exports = { buildPrompt }