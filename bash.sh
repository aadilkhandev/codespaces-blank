#!/bin/bash

# Define the number of repositories to create
NUM_REPOS=50
# Define the base name for your repositories (e.g., project-repo-1, project-repo-2, ...)
REPO_BASE_NAME="my-automated-repo-rest-testing"
# Define the owner (your username or organization name)
# Omit the owner to create under your authenticated user
OWNER="aadilkhandev" 

for i in $(seq 1 $NUM_REPOS); do
    REPO_NAME="${OWNER}/${REPO_BASE_NAME}-${i}"
    
    # Use gh repo create to make the new empty repository
    # --public, --private, or --internal flag is required for non-interactive creation
    # --description can be added
    
    echo "Creating repository: $REPO_NAME"
    gh repo create "$REPO_NAME" --private --description "Automated Repository number $i"
    
    if [ $? -eq 0 ]; then
        echo "Successfully created $REPO_NAME"
    else
        echo "Failed to create $REPO_NAME"
    fi
done