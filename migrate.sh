#!/bin/bash

# Check if a name is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <name>"
  exit 1
fi

# Step 1: Sanitize the provided name (replace non-alphanumeric characters with underscores)
sanitized_name=$(echo "$1" | sed 's/[^a-zA-Z0-9]/_/g')

# Step 2: Generate a random UUID
uuid=$(uuidgen)

# Step 3: Construct the filename (exact same name for output file and include tag)
filename="db_changelog_${uuid}_${sanitized_name}.sql"

# Step 4: Run Liquibase diff with the generated filename
mvn clean install liquibase:diff \
  -Dliquibase.diffChangeLogFile=src/main/resources/db/changelog/$filename

# Check if Liquibase command succeeded
if [ $? -ne 0 ]; then
  echo "Liquibase diff failed!"
  exit 1
fi

# Step 5: Update db.changelog-master.yaml
master_changelog="src/main/resources/db/changelog/db.changelog-master.yaml"

# Ensure the master changelog file exists
if [ ! -f "$master_changelog" ]; then
  echo "databaseChangeLog:" > "$master_changelog"
fi

# Append the new changelog to the master file (exact same filename as output)
echo " - include:" >> "$master_changelog"
echo "    file: db/changelog/$filename" >> "$master_changelog"

# Success message
echo "Changelog generated: $filename"
echo "Updated $master_changelog"