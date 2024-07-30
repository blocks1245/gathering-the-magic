import pandas as pd
import os
import json
from sqlalchemy import create_engine

# Read the JSON file into a DataFrame
df = pd.read_json(os.environ['JSON_FILE'])

# Function to convert dict and list columns to JSON strings
def convert_to_json(df):
    for col in df.columns:
        if df[col].apply(lambda x: isinstance(x, (dict, list))).any():
            df[col] = df[col].apply(lambda x: json.dumps(x) if isinstance(x, (dict, list)) else x)
    return df

# Convert dictionary and list columns to JSON strings
df = convert_to_json(df)

# Replace NaN values with None
df = df.where(pd.notnull(df), None)

# Create a connection to the PostgreSQL database using SQLAlchemy
engine = create_engine(
    f"postgresql+psycopg2://{os.environ['POSTGRES_USER']}:{os.environ['POSTGRES_PASSWORD']}@{os.environ['POSTGRES_HOST']}/{os.environ['POSTGRES_DB']}"
)

# Insert data into the table using pandas to_sql
df.to_sql('cards', con=engine, if_exists='append', index=False)
print("Table created and data inserted successfully.")
