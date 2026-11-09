#!/bin/bash
# Script d'analyse automatique pour Pipeline CI/CD

echo "=========================================="
echo "Démarrage de l'analyse SonarQube..."
echo "=========================================="

# Exécution du scanner avec paramètres du serveur
sonar-scanner \
  -Dsonar.host.url=${SONAR_HOST_URL:-"http://localhost:9000"} \
  -Dsonar.token=${SONAR_TOKEN}

if [ $? -eq 0 ]; then
    echo "Analyse terminée avec succès !"
else
    echo "Échec de l'analyse SonarQube !"
    exit 1
fi