# Import packages 
import pandas as pd 
import os
import json
from sqlalchemy import create_engine, text

# Read the JSON file into a DataFrame
df = pd.read_json(os.environ['JSON_FILE'])

# Convert dictionary columns to JSON strings
dict_columns = df.map(lambda x: isinstance(x, dict)).any()
for col in df.columns[dict_columns]:
    df[col] = df[col].apply(lambda x: json.dumps(x) if isinstance(x, dict) else x)
print ('Dictionary columns converted to JSON strings')

# Convert list columns to JSON strings
list_columns = df.map(lambda x: isinstance(x, list)).any()
for col in df.columns[list_columns]:
    df[col] = df[col].apply(lambda x: json.dumps(x) if isinstance(x, list) else x)
print ('List columns converted to JSON strings')

# Create a connection to the PostgreSQL database using SQLAlchemy
engine = create_engine(
    f"postgresql+psycopg2://{os.environ['POSTGRES_USER']}:{os.environ['POSTGRES_PASSWORD']}@{os.environ['POSTGRES_HOST']}/{os.environ['POSTGRES_DB']}"
)

# Convert pandas data types to SQLAlchemy data types
dtype_mapping = {
    'int64': 'INTEGER',
    'float64': 'FLOAT',
    'object': 'TEXT',
    'datetime64[ns]': 'TIMESTAMP',
    'bool': 'BOOLEAN'
}

# Create a table schema string
table_schema = ", ".join(
    f"{col} {dtype_mapping[str(dtype)]}"
    for col, dtype in zip(df.columns, df.dtypes)
)

# Create the table if it doesn't exist
with engine.connect() as conn:
    conn.execute(text(f"CREATE TABLE IF NOT EXISTS cards ({table_schema});"))
print("Table created successfully.")

# Insert data into the table using pandas to_sql
df.to_sql('cards', con=engine, if_exists='replace', index=False)

print("Table created and data inserted successfully.")
