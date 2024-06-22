import psycopg2

try:
    # Connect to your postgres DB
    conn = psycopg2.connect("dbname=myapp user=admin password=IBM999ibm host=localhost")

    # Create a cursor object
    cursor = conn.cursor()

    # Execute a DELETE query
    cursor.execute("DELETE FROM users")

    # Commit the transaction
    conn.commit()

    print("All registered users have been deleted.")

except Exception as e:
    print(f"Error: {e}")

finally:
    # Close the cursor and connection
    cursor.close()
    conn.close()
