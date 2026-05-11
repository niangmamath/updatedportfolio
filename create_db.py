import psycopg2, sys
from decouple import config
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent

try:
    conn = psycopg2.connect(
        host=config('DB_HOST'),
        port=config('DB_PORT'),
        user=config('DB_USER'),
        password=config('DB_PASSWORD'),
        dbname='postgres',
        sslmode=config('DB_SSLMODE', default='require'),
        sslrootcert=str(BASE_DIR / config('DB_SSLROOTCERT', default='global-bundle.pem')),
    )
    conn.autocommit = True
    cur = conn.cursor()
    cur.execute("SELECT 1 FROM pg_database WHERE datname = 'portfolio_db'")
    if not cur.fetchone():
        cur.execute('CREATE DATABASE portfolio_db')
        print('OK Base de données portfolio_db créée.')
    else:
        print('OK portfolio_db existe déjà.')
    cur.close()
    conn.close()
except Exception as e:
    print('ERREUR Erreur :', e)
    sys.exit(1)
