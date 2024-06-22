import psycopg2

try:
    # Connect to your postgres DB
    conn = psycopg2.connect("dbname=myapp user=admin password=IBM999ibm host=localhost")

    # Create a cursor object
    cursor = conn.cursor()

    # Execute a query
    cursor.execute("SELECT * FROM users")

    # Retrieve query results
    records = cursor.fetchall()

    for record in records:
        print(record)

except Exception as e:
    print(f"Error: {e}")

finally:
    # Close the cursor and connection
    cursor.close()
    conn.close()
