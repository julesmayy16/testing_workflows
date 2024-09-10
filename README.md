## Background

As the tech lead at a bank, you need to integrate Alloy’s API to minimize fraudulent applications and reduce manual reviews by the compliance team. This assignment will give you hands-on experience in building such an integration.

## Task

You will create a basic web application consisting of frontend and backend components:

1. **Frontend:** A simple application form for a bank or finance app to collect applicant details.
2. **Backend:** An integration with Alloy's API to submit the collected details, handle the API response, and display the appropriate message to the applicant.

All interactions will be done in Sandbox mode, so no real data will be processed.

## Instructions

1. **Watch the Demo Video:**
   Get acquainted with Alloy's basics by watching the provided demo video. This will give you context on how Alloy works when an API call is submitted.

2. **Build the Application:**
   - Use any framework of your choice for the frontend (e.g., React, Svelte, Vue) and backend (e.g., Express, Flask).
   - Your frontend should be a form that collects the required applicant details. Creativity in UI/UX will be recognized.
   - The backend should handle form submissions, send them to Alloy’s API, and process the response to display the outcome.

3. **Form Details:**
   The form should capture the following details:
   - **First Name**
   - **Last Name**
   - **Address**
     - Line 1
     - Line 2
     - City
     - State (must be a two-letter code, e.g., NY, CA)
     - Zip/Postal Code
     - Country (must be "US" for this assignment)
   - **SSN** (must be 9 digits, no dashes)
   - **Email Address**
   - **Date of Birth** (ISO-8601 format: YYYY-MM-DD)
   - Implement validation rules on the frontend for extra credit.

4. **API Integration:**
   - Use the provided API documentation to integrate with Alloy:
     - Retrieve the exact field format with a GET request to: `https://sandbox.alloy.co/v1/parameters/`
     - Submit application details via a POST request to: `https://sandbox.alloy.co/v1/evaluations/`
   - Use Basic Authentication with the provided `workflow_token` and `workflow_secret`. Make sure to Base64 encode them in the format `workflow_token:workflow_secret`.

5. **Handle Responses:**
   - The Sandbox API will return responses such as `{"summary":{"outcome":"Approved"}}`.
   - Display appropriate messages based on the response:
     - **Approved:** "Success! Your account has been created."
     - **Manual Review:** "Thanks for submitting your application, we’ll be in touch shortly."
     - **Denied:** "Sorry, your application was not successful."

6. **Test the Integration:**
   - Use Sandbox Personas to test different outcomes:
     - Last name "Review" will result in "Manual Review."
     - Last name "Deny" will result in "Deny."
   - Your application should correctly display messages for each scenario.
