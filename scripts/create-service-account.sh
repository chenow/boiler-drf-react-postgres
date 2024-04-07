#!/bin/bash

# Use this file to create a service account for github actions, and link an IAM policy to it.
# You will then need to go to the IAM permissions tab in the console 
# to give the required permissions to the service account: 
# - Artifact Registry Writer
# - Service Account User
# - Service Account Token Creator

PROJECT_ID=boilder-react-drf-postges
PROJECT_NUMBER=$(gcloud projects describe $PROJECT_ID --format='value(projectNumber)')

gcloud iam service-accounts create githubactions \                                                              
    --description="service acct for github actions" \                     
    --display-name="Github Actions"

gcloud iam service-accounts add-iam-policy-binding githubactions@$PROJECT_ID.iam.gserviceaccount.com \
    --member="serviceAccount:githubactions@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/iam.serviceAccountUser"