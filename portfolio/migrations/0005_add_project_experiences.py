from django.db import migrations


NEW_EXPERIENCES = [
    {
        'title': 'CV Optimizer',
        'organization': 'Projet Personnel',
        'exp_type': 'project',
        'start_date': 'Juin 2025',
        'end_date': 'Juin 2025',
        'description': (
            "Conception et développement d'une application web IA de bout en bout. "
            "Analyse sémantique d'un CV face à une offre d'emploi, calcul d'un score ATS, "
            "recommandations ciblées et réécriture automatique du CV par IA générative. "
            "Stack : Python, IA générative, NLP, HTML/CSS/JS."
        ),
        'order': 4,
    },
    {
        'title': "Détection Cancer du Col de l'Utérus",
        'organization': 'Coding Week — École Centrale Casablanca',
        'exp_type': 'project',
        'start_date': 'Avril 2025',
        'end_date': 'Avril 2025',
        'description': (
            "Projet ML réalisé en une semaine dans le cadre d'une Coding Week. "
            "Prétraitement de données médicales réelles, classification avancée, "
            "évaluation avec métriques médicales (sensibilité, spécificité) et "
            "interface de prédiction. Présentation finale devant jury."
        ),
        'order': 5,
    },
    {
        'title': 'Système Énergétique Hybride',
        'organization': 'Learning by Doing — École Centrale Casablanca',
        'exp_type': 'project',
        'start_date': '2025',
        'end_date': '2025',
        'description': (
            "Projet d'équipe combinant énergie solaire et éolienne avec stockage "
            "innovant par briques d'argile. Conception et dimensionnement du système, "
            "développement d'une application de monitoring temps réel et basculement "
            "automatique entre sources selon les conditions météo."
        ),
        'order': 6,
    },
    {
        'title': 'Impact COVID-19 en Afrique Subsaharienne',
        'organization': 'École Centrale Casablanca',
        'exp_type': 'project',
        'start_date': 'Janvier 2026',
        'end_date': 'Janvier 2026',
        'description': (
            "Analyse de données socio-économiques (méthodologie CRISP-DM) sur "
            "2 428 répondants dans 5 pays. Construction d'un dashboard Power BI "
            "interactif avec indicateurs DAX personnalisés. Révèle 72 % de baisse "
            "de revenus et 45 % de vulnérabilité financière extrême. Formulation "
            "de recommandations stratégiques ciblées."
        ),
        'order': 7,
    },
]


def add_experiences(apps, schema_editor):
    Experience = apps.get_model('portfolio', 'Experience')
    for exp in NEW_EXPERIENCES:
        Experience.objects.get_or_create(
            title=exp['title'],
            organization=exp['organization'],
            defaults=exp,
        )


def remove_experiences(apps, schema_editor):
    Experience = apps.get_model('portfolio', 'Experience')
    for exp in NEW_EXPERIENCES:
        Experience.objects.filter(
            title=exp['title'],
            organization=exp['organization'],
        ).delete()


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0004_project_report_pdf'),
    ]

    operations = [
        migrations.RunPython(add_experiences, remove_experiences),
    ]
