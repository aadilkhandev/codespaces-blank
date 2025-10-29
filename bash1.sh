#!/bin/bash

# Load the token from an environment variable for security
TOKEN="" 
USERNAME="aadilkhandev"
NUM_REPOS=50
REPO_BASE_NAME="api-repo-dummy-search0"

if [ -z "$TOKEN" ]; then
    echo "Error: GITHUB_PAT environment variable is not set."
    exit 1
fi

for i in $(seq 1 $NUM_REPOS); do
    REPO_NAME="${REPO_BASE_NAME}-${i}"
    
    # JSON payload for the new repository
    PAYLOAD=$(jq -n \
        --arg name "$REPO_NAME" \
        --arg desc "API created repository $i" \
        '{name: $name, description: $desc, private: true}')

    echo "Attempting to create $REPO_NAME..."

    # API Endpoint for creating a repository for the authenticated user
    curl -s -X POST \
      -H "Accept: application/vnd.github+json" \
      -H "Authorization: Bearer $TOKEN" \
      -H "X-GitHub-Api-Version: 2022-11-28" \
      https://api.github.com/user/repos \
      -d "$PAYLOAD" | jq -r 'if .name then "Successfully created: " + .full_name else "Error creating repo: " + .message end'
done